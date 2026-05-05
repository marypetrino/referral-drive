import { NextResponse } from "next/server";
import data from "../../../data/leaderboard.json";

export const revalidate = 3600;

export interface LeaderboardEntry {
  employee_name: string;
  total_referrals: number;
  counted_referrals: number;
  at_ips: number;
  at_hms: number;
  at_panel: number;
  at_final: number;
  at_offer: number;
  hires: number;
  scoring: number;
  all_star: boolean;
  champion: boolean;
}

export async function GET() {
  const entries: LeaderboardEntry[] = [...data.entries];

  entries.sort((a, b) => {
    if (b.hires !== a.hires) return b.hires - a.hires;
    if (b.at_offer !== a.at_offer) return b.at_offer - a.at_offer;
    if (b.at_final !== a.at_final) return b.at_final - a.at_final;
    if (b.at_panel !== a.at_panel) return b.at_panel - a.at_panel;
    if (b.at_hms !== a.at_hms) return b.at_hms - a.at_hms;
    if (b.at_ips !== a.at_ips) return b.at_ips - a.at_ips;
    return b.counted_referrals - a.counted_referrals;
  });

  return NextResponse.json({
    entries,
    updated_at: data.updated_at,
    is_empty: entries.length === 0,
  });
}
