import { NextResponse } from "next/server";

export const revalidate = 300; // Revalidate every 5 minutes

interface LeaderboardEntry {
  employee_name: string;
  team: string;
  referrals_submitted: number;
  at_ips: number;
  at_hms: number;
  at_final: number;
  hires: number;
}

// Mock data — replace with Google Sheets API integration
const MOCK_DATA: LeaderboardEntry[] = [];

export async function GET() {
  // TODO: Replace with Google Sheets API v4 fetch
  // const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  // const sheetId = process.env.GOOGLE_SHEET_ID;
  // const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

  const data = MOCK_DATA;

  return NextResponse.json({
    entries: data,
    updated_at: new Date().toISOString(),
    is_empty: data.length === 0,
  });
}
