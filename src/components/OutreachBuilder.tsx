"use client";

import { useState, useCallback, useMemo } from "react";
import { X, Copy, Check, EnvelopeSimple, LinkedinLogo, ChatCircleText } from "@phosphor-icons/react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Channel = "text" | "linkedin" | "email";

interface Inputs {
  senderName: string;
  candidateName: string;
  candidateCompany: string;
  roleTitle: string;
  relevantSkill: string;
}

// ─── Template helpers ─────────────────────────────────────────────────────────

const PLACEHOLDERS: Record<string, string> = {
  senderName: "[your name]",
  candidateName: "[candidate name]",
  candidateCompany: "[their company]",
  roleTitle: "[role title]",
  relevantSkill: "[relevant skill area]",
};

function fill(template: string, inputs: Inputs): string {
  const { senderName, candidateName, candidateCompany, roleTitle, relevantSkill } = inputs;
  return template
    .replace(/\{\{senderName\}\}/g, senderName || PLACEHOLDERS.senderName)
    .replace(/\{\{candidateName\}\}/g, candidateName || PLACEHOLDERS.candidateName)
    .replace(/\{\{candidateCompany\}\}/g, candidateCompany || PLACEHOLDERS.candidateCompany)
    .replace(/\{\{roleTitle\}\}/g, roleTitle || PLACEHOLDERS.roleTitle)
    .replace(/\{\{relevantSkill\}\}/g, relevantSkill || PLACEHOLDERS.relevantSkill);
}

// Renders text with unfilled placeholders highlighted
function HighlightedText({ text }: { text: string }) {
  const placeholderValues = Object.values(PLACEHOLDERS);
  const pattern = placeholderValues.map((p) => p.replace(/[[\]]/g, "\\$&")).join("|");
  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        placeholderValues.includes(part) ? (
          <span
            key={i}
            className="bg-neon-orange/20 text-neon-orange border border-neon-orange/30 rounded px-1 py-0.5 text-xs font-medium"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ─── Copy blocks ──────────────────────────────────────────────────────────────

const SUBJECT_LINES = {
  a: "{{candidateName}} — {{roleTitle}} @ January",
  b: "{{roleTitle}} @ January",
};

const OPENERS = {
  a: "Hey {{candidateName}} — I work at a fintech called January and we're hiring a {{roleTitle}}. Given your {{relevantSkill}} at {{candidateCompany}}, I think you'd be a really strong fit.",
  b: "Hey {{candidateName}} — I work at January, and we're hiring a {{roleTitle}} that I think you'd be perfect for. We're building modern, user-first systems that help millions of people get out of financial distress.",
};

const COMPANY_PITCH = {
  a: "We're a fast-growing fintech fixing what's broken in consumer finance. From a strong foundation, we're expanding into a platform that helps both borrowers and lenders succeed.",
  b: "Our flagship product has serviced 15M+ Americans and nearly $20B in debt. We're profitable, with tens of millions in annual revenue.",
};

const CTAS = {
  a: "Would you be open to a quick chat?",
  b: "Sound interesting?",
};

const TEXT_TEMPLATES = {
  a: "Hey {{candidateName}} — it's {{senderName}}. I work at a fintech called January and we're looking for a {{roleTitle}}. Your work at {{candidateCompany}} immediately came to mind — think you'd be a great fit. Are you open to a chat?",
  b: "Hey {{candidateName}}, it's {{senderName}}. Quick one — my company January is hiring a {{roleTitle}} and I keep thinking you'd be perfect for it. Are you open to a chat?",
  c: "Hey {{candidateName}} — have you ever heard of January? I work there — we've serviced 15M+ Americans and nearly $20B in debt, and we're just getting started. There's a {{roleTitle}} role that has your name on it. Lmk if you want me to put you in touch with the team.",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function InputField({ label, value, onChange, placeholder, subtext }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; subtext?: string;
}) {
  return (
    <div>
      <label className="block text-white/70 text-xs font-medium mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-arcade-dark border border-january-blue/25 rounded-lg text-white text-sm focus:outline-none focus:border-january-blue/60 placeholder:text-white/20"
      />
      {subtext && <p className="text-white/30 text-[11px] mt-1">{subtext}</p>}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 text-xs transition-colors ${checked ? "text-white" : "text-white/30"}`}
    >
      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
        checked ? "bg-january-blue border-january-blue" : "border-white/20 bg-transparent"
      }`}>
        {checked && <Check size={10} weight="bold" className="text-white" />}
      </div>
      {label}
    </button>
  );
}

function Dropdown({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-[11px] bg-arcade-dark border border-january-blue/20 text-white/70 rounded px-2 py-1 focus:outline-none focus:border-january-blue/50"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function BlockRow({ label, enabled, onToggle, dropdownValue, onDropdownChange, options }: {
  label: string; enabled: boolean; onToggle: (v: boolean) => void;
  dropdownValue: string; onDropdownChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
      <Toggle label={label} checked={enabled} onChange={onToggle} />
      {enabled && <Dropdown value={dropdownValue} onChange={onDropdownChange} options={options} />}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-january-blue hover:bg-january-blue-light text-white text-xs font-medium transition-colors"
    >
      {copied ? <><Check size={14} weight="bold" /> Copied!</> : <><Copy size={14} weight="bold" /> Copy</>}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function OutreachBuilder({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [channel, setChannel] = useState<Channel>("email");
  const [inputs, setInputs] = useState<Inputs>({
    senderName: "",
    candidateName: "",
    candidateCompany: "",
    roleTitle: "",
    relevantSkill: "",
  });

  // Block toggles
  const [subjectOn, setSubjectOn] = useState(true);
  const [openerOn, setOpenerOn] = useState(true);
  const [pitchOn, setPitchOn] = useState(false); // defaults OFF
  const [ctaOn, setCtaOn] = useState(true);

  // Block variants
  const [subjectVar, setSubjectVar] = useState<"a" | "b">("a");
  const [openerVar, setOpenerVar] = useState<"a" | "b">("a");
  const [pitchVar, setPitchVar] = useState<"a" | "b">("a");
  const [ctaVar, setCtaVar] = useState<"a" | "b">("a");

  // Text template
  const [textVar, setTextVar] = useState<"a" | "b" | "c">("a");

  // LinkedIn subject line
  const [linkedinSubjectOn, setLinkedinSubjectOn] = useState(true);
  const [linkedinSubjectVar, setLinkedinSubjectVar] = useState<"a" | "b">("a");

  const updateInput = useCallback((key: keyof Inputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Compose the message
  const composed = useMemo(() => {
    if (channel === "text") {
      return fill(TEXT_TEMPLATES[textVar], inputs);
    }

    const parts: string[] = [];
    if (openerOn) parts.push(fill(OPENERS[openerVar], inputs));
    if (pitchOn) parts.push(fill(COMPANY_PITCH[pitchVar], inputs));
    if (ctaOn) parts.push(fill(CTAS[ctaVar], inputs));

    // Sign off
    const name = inputs.senderName || PLACEHOLDERS.senderName;
    parts.push(name);

    return parts.join("\n\n");
  }, [channel, inputs, openerOn, openerVar, pitchOn, pitchVar, ctaOn, ctaVar, textVar]);

  const subjectLine = useMemo(() => {
    if (channel === "email" && subjectOn) {
      return fill(SUBJECT_LINES[subjectVar], inputs);
    }
    if (channel === "linkedin" && linkedinSubjectOn) {
      return fill(SUBJECT_LINES[linkedinSubjectVar], inputs);
    }
    return null;
  }, [channel, subjectOn, subjectVar, linkedinSubjectOn, linkedinSubjectVar, inputs]);

  if (!open) return null;

  const showSubjectBlock = channel === "email" || channel === "linkedin";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-arcade-card border border-january-blue/25 rounded-2xl overflow-hidden flex flex-col" style={{ boxShadow: "0 0 60px rgba(0,26,161,0.2)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-january-blue/15">
          <h2 className="pixel-heading text-sm text-white glow-blue">OUTREACH BUILDER</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Mobile notice */}
        <div className="sm:hidden px-6 py-3 bg-january-blue/10 border-b border-january-blue/15">
          <p className="text-white/50 text-xs text-center">For the best experience, use the outreach builder on desktop.</p>
        </div>

        {/* Channel tabs */}
        <div className="flex border-b border-january-blue/15">
          {([
            { id: "email" as Channel, label: "Email", icon: <EnvelopeSimple size={16} weight="duotone" /> },
            { id: "linkedin" as Channel, label: "LinkedIn", icon: <LinkedinLogo size={16} weight="duotone" /> },
            { id: "text" as Channel, label: "Text", icon: <ChatCircleText size={16} weight="duotone" /> },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setChannel(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-medium transition-colors border-b-2 ${
                channel === tab.id
                  ? "text-white border-january-blue"
                  : "text-white/40 border-transparent hover:text-white/60"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Body — two columns */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-january-blue/10 min-h-[400px]">
            {/* Left: Inputs + Blocks */}
            <div className="p-5 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Your First Name"
                  value={inputs.senderName}
                  onChange={(v) => updateInput("senderName", v)}
                  placeholder="e.g. Austin"
                />
                <InputField
                  label="Candidate's First Name"
                  value={inputs.candidateName}
                  onChange={(v) => updateInput("candidateName", v)}
                  placeholder="e.g. Jordan"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="Candidate's Company"
                  value={inputs.candidateCompany}
                  onChange={(v) => updateInput("candidateCompany", v)}
                  placeholder="e.g. Stripe"
                />
                <InputField
                  label="Role Title"
                  value={inputs.roleTitle}
                  onChange={(v) => updateInput("roleTitle", v)}
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
              <InputField
                label="Relevant Skill Area"
                value={inputs.relevantSkill}
                onChange={(v) => updateInput("relevantSkill", v)}
                placeholder="e.g. payment infrastructure"
                subtext="What's one thing that impressed you about this person?"
              />

              {/* Modular blocks — only for email and linkedin */}
              {channel !== "text" ? (
                <div className="pt-3 border-t border-white/5">
                  <p className="pixel-heading text-[9px] text-neon-orange/70 mb-3 tracking-wider">MESSAGE BLOCKS</p>

                  {showSubjectBlock && (
                    <BlockRow
                      label="Subject Line"
                      enabled={channel === "email" ? subjectOn : linkedinSubjectOn}
                      onToggle={channel === "email" ? setSubjectOn : setLinkedinSubjectOn}
                      dropdownValue={channel === "email" ? subjectVar : linkedinSubjectVar}
                      onDropdownChange={(v) => {
                        if (channel === "email") setSubjectVar(v as "a" | "b");
                        else setLinkedinSubjectVar(v as "a" | "b");
                      }}
                      options={[
                        { value: "a", label: "Name — Role @ January" },
                        { value: "b", label: "Role @ January" },
                      ]}
                    />
                  )}

                  <BlockRow
                    label="Opener"
                    enabled={openerOn}
                    onToggle={setOpenerOn}
                    dropdownValue={openerVar}
                    onDropdownChange={(v) => setOpenerVar(v as "a" | "b")}
                    options={[
                      { value: "a", label: "Personalized" },
                      { value: "b", label: "Mission-Led" },
                    ]}
                  />

                  <BlockRow
                    label="Company Pitch"
                    enabled={pitchOn}
                    onToggle={setPitchOn}
                    dropdownValue={pitchVar}
                    onDropdownChange={(v) => setPitchVar(v as "a" | "b")}
                    options={[
                      { value: "a", label: "Mission + Problem" },
                      { value: "b", label: "Traction-Led" },
                    ]}
                  />

                  <BlockRow
                    label="Call to Action"
                    enabled={ctaOn}
                    onToggle={setCtaOn}
                    dropdownValue={ctaVar}
                    onDropdownChange={(v) => setCtaVar(v as "a" | "b")}
                    options={[
                      { value: "a", label: "Open to a chat?" },
                      { value: "b", label: "Sound interesting?" },
                    ]}
                  />
                </div>
              ) : (
                <div className="pt-3 border-t border-white/5">
                  <p className="pixel-heading text-[9px] text-neon-orange/70 mb-3 tracking-wider">TEMPLATE</p>
                  <div className="space-y-2">
                    {([
                      { id: "a" as const, label: "Personal + Role", desc: "Mentions their company and the specific role" },
                      { id: "b" as const, label: "Casual Ping", desc: "Short and low-detail, just opens the door" },
                      { id: "c" as const, label: "Warm Referral", desc: "Offers to connect them with the team" },
                    ]).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTextVar(t.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all ${
                          textVar === t.id
                            ? "border-january-blue/50 bg-january-blue/10"
                            : "border-white/5 bg-transparent hover:border-white/15"
                        }`}
                      >
                        <span className={`text-xs font-medium ${textVar === t.id ? "text-white" : "text-white/60"}`}>{t.label}</span>
                        <span className="block text-[11px] text-white/30 mt-0.5">{t.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Preview */}
            <div className="p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <p className="pixel-heading text-[9px] text-neon-orange/70 tracking-wider">PREVIEW</p>
                <div className="flex items-center gap-3">
                  {channel === "linkedin" && (
                    <span className={`text-[11px] font-mono ${composed.length > 1900 ? "text-fire-orange" : "text-white/30"}`}>
                      {composed.length} / 1,900
                    </span>
                  )}
                  <CopyButton text={subjectLine ? `Subject: ${subjectLine}\n\n${composed}` : composed} />
                </div>
              </div>

              {/* Subject line for email and linkedin */}
              {subjectLine && (
                <div className="mb-3 pb-3 border-b border-white/5">
                  <span className="text-white/30 text-[11px] font-medium">Subject:</span>
                  <p className="text-white text-sm mt-0.5"><HighlightedText text={subjectLine} /></p>
                </div>
              )}

              {/* Message body */}
              <div className="flex-1 bg-arcade-dark/50 rounded-xl border border-january-blue/10 p-4 overflow-y-auto">
                {composed.split("\n\n").map((para, i) => (
                  <p key={i} className="text-white/80 text-sm leading-relaxed mb-3 last:mb-0 whitespace-pre-wrap">
                    <HighlightedText text={para} />
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
