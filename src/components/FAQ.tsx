"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const faqs: { q: string; a: string }[] = [
  {
    q: "Who is eligible to participate?",
    a: "All January employees except VPs and above, Talent team members, and hiring managers referring into their own roles can participate. Internal candidates are also not bonus-eligible.",
  },
  {
    q: "How do I submit a referral?",
    a: "Head to your Ashby home page and click \"+ Referral\" on the right hand side to add a direct referral. Your referral must be in Ashby to count toward the contest.",
  },
  {
    q: "What should I say in my message when I reach out?",
    a: "Use the outreach builder to create a ready-to-send message in minutes.",
  },
  {
    q: "When does the contest end?",
    a: "April 10, 2026. All referrals must be entered into Ashby by 11:59 PM ET on that date to qualify for 2x bonuses and milestone prizes.",
  },
  {
    q: "What if I have a great person in mind but I'm not sure which role fits?",
    a: "Refer them anyway. Submit to the \"Future Opportunities\" role in Ashby and we'll route them to the right pipeline. Don't let a role match question stop you from making the intro.",
  },
  {
    q: "What if my referral was submitted before the contest started?",
    a: "Only referrals submitted during the March Madness window (through April 10) qualify for 2x bonuses and milestone prizes. Prior referrals follow the standard program.",
  },
  {
    q: "Can I refer someone who already applied or is already in the pipeline?",
    a: "No — referral credit applies to new candidates only. If someone has already applied or is active in a pipeline, they aren't eligible for referral attribution.",
  },
  {
    q: "How are referrals tracked?",
    a: "Ashby is the source of truth for all referral attribution, leaderboard standings, and prize eligibility. You can also track the status of your individual referrals directly in Ashby.",
  },
  {
    q: "When are prizes and bonuses paid out?",
    a: "Milestone prizes are awarded as they are attained, within 30 days. Referral bonuses are paid in the first pay cycle after your referral is hired and completes their first 30 days. Since hiring timelines vary, bonus payouts may come well after the contest ends. The 2x multiplier applies to any referral submitted by April 10, regardless of when the hire closes.",
  },
  {
    q: "Do standard referral program rules still apply?",
    a: "Yes. March Madness adds 2x bonuses and milestone prizes on top of the existing program. All standard eligibility rules, payout terms, and policies remain in effect.",
  },
  {
    q: "What's the difference between RACE and ANYONE prizes?",
    a: "RACE prizes go to the first person to hit the milestone — first come, first served. ANYONE prizes are awarded to everyone who reaches that threshold.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/5"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-white text-sm font-medium pr-4 group-hover:text-january-blue-light transition-colors">
          {q}
        </span>
        <span className={`text-white/40 text-lg transition-transform ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-64 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-white/70 text-sm leading-relaxed">{a}</p>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="py-16 sm:py-24 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="pixel-heading text-xl sm:text-2xl text-white glow-blue mb-3">
            FAQ
          </h2>
          <p className="text-white/70 text-sm">Everything you need to know.</p>
        </motion.div>

        <div className="bg-arcade-card border border-january-blue/15 rounded-xl px-5 sm:px-6">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
