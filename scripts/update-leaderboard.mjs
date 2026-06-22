#!/usr/bin/env node
// Usage: node scripts/update-leaderboard.mjs ~/Downloads/ashby_export.csv

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../src/data/leaderboard.json");

const csvPath = process.argv[2];
if (!csvPath) {
  console.error("Usage: node scripts/update-leaderboard.mjs <path-to-csv>");
  process.exit(1);
}

// --- CSV parsing ---
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') { inQuotes = !inQuotes; }
    else if (ch === "," && !inQuotes) { result.push(current.trim()); current = ""; }
    else { current += ch; }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(content) {
  const lines = content.trim().split("\n");
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1)
    .filter(l => l.trim())
    .map(line => {
      const vals = parseCSVLine(line);
      return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? ""]));
    });
}

// --- Stage mapping ---
// Ashby "Furthest Stage Group Reached" → leaderboard pipeline order
const STAGE_ORDER = {
  "Hiring Manager Screen": 1,
  "Initial Screen": 1,
  "Skills Assessment": 2,
  "Take Home": 2,
  "Onsite": 3,
  "Offer": 4,
  "Hired": 5,
};

function stageToFields(stage, outcome) {
  const order = STAGE_ORDER[stage?.trim()] ?? 0;
  const isHired = outcome?.trim() === "Hired" || order === 5;
  return {
    at_ips:   order >= 1 ? 1 : 0,
    at_hms:   order >= 2 ? 1 : 0,
    at_panel: 0,
    at_final: order >= 3 ? 1 : 0,
    at_offer: order >= 4 ? 1 : 0,
    hires:    isHired ? 1 : 0,
  };
}

// --- Main ---
const csv = readFileSync(resolve(csvPath), "utf8");
const rows = parseCSV(csv);

const CANDIDATE_COL   = "Job Consideration's Candidate";
const JOB_COL         = "Job Consideration's Job";
const CREDITED_COL    = "Job Consideration's Credited To";
const OUTCOME_COL     = "Job Consideration's Outcome";
const STAGE_COL       = "Job Consideration's Furthest Stage Group Reached";

// Group by employee, skip Unassigned
const byEmployee = {};
for (const row of rows) {
  const employee = row[CREDITED_COL]?.trim();
  if (!employee || employee === "Unassigned") continue;
  if (!byEmployee[employee]) byEmployee[employee] = [];
  byEmployee[employee].push(row);
}

// Build entries
const entries = Object.entries(byEmployee).map(([name, referrals]) => {
  const totals = { at_ips: 0, at_hms: 0, at_panel: 0, at_final: 0, at_offer: 0, hires: 0 };
  for (const r of referrals) {
    const fields = stageToFields(r[STAGE_COL], r[OUTCOME_COL]);
    for (const k of Object.keys(totals)) totals[k] += fields[k];
  }
  return {
    employee_name: name,
    total_referrals: referrals.length,
    counted_referrals: referrals.length,
    ...totals,
    scoring: 0,
    all_star: false,
    champion: false,
  };
});

// Sort: hires → offer → onsite → skills → ips → referrals
entries.sort((a, b) => {
  for (const k of ["hires", "at_offer", "at_final", "at_hms", "at_ips", "counted_referrals"]) {
    if (b[k] !== a[k]) return b[k] - a[k];
  }
  return a.employee_name.localeCompare(b.employee_name);
});

const output = {
  updated_at: new Date().toISOString(),
  entries,
};

writeFileSync(OUT_PATH, JSON.stringify(output, null, 2) + "\n");
console.log(`✓ Updated leaderboard with ${entries.length} employees from ${rows.length} referrals`);
console.log(`  Saved to ${OUT_PATH}`);

// Print a quick summary
for (const e of entries.slice(0, 5)) {
  const flags = [
    e.hires      ? `${e.hires} hired`    : null,
    e.at_offer   ? `${e.at_offer} offer`  : null,
    e.at_final   ? `${e.at_final} onsite` : null,
    e.at_hms     ? `${e.at_hms} skills`   : null,
    e.at_ips     ? `${e.at_ips} initial`  : null,
  ].filter(Boolean).join(", ");
  console.log(`  ${e.employee_name}: ${e.counted_referrals} refs (${flags || "pipeline pending"})`);
}
if (entries.length > 5) console.log(`  ... and ${entries.length - 5} more`);
