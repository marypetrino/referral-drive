import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

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
  const enabled = process.env.NEXT_PUBLIC_LEADERBOARD_ENABLED === "true";

  if (!enabled) {
    return NextResponse.json({
      entries: [],
      updated_at: new Date().toISOString(),
      is_empty: true,
    });
  }

  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!apiKey || !sheetId || apiKey === "placeholder" || sheetId === "placeholder") {
    console.error("Leaderboard enabled but Google Sheets credentials are missing");
    return NextResponse.json(
      { entries: [], updated_at: new Date().toISOString(), is_empty: true, error: "Configuration missing" },
      { status: 500 }
    );
  }

  // Fetch B3:M from the LeaderboardOutput tab (headers on row 3, data from row 4+)
  const range = encodeURIComponent("LeaderboardOutput!B3:M");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      const errBody = await res.text();
      console.error(`Google Sheets API error: ${res.status} ${res.statusText}`, errBody);
      return NextResponse.json(
        { entries: [], updated_at: new Date().toISOString(), is_empty: true, error: "Failed to fetch leaderboard" },
        { status: 502 }
      );
    }

    const json = await res.json();
    const rows: string[][] = json.values || [];

    // Row 0 is headers (row 3 in sheet), data starts at row 1+
    // Cols: B=Name, C=Total Referrals, D=Counted Referrals, E=IPS, F=HMS, G=Panel, H=Final, I=Offer, J=Hired, K=Scoring, L=All-star?, M=Champion?
    const entries: LeaderboardEntry[] = rows
      .slice(1)
      .filter((row) => row[0]?.trim()) // skip empty rows
      .map((row) => ({
        employee_name: row[0] || "",
        total_referrals: parseInt(row[1], 10) || 0,
        counted_referrals: parseInt(row[2], 10) || 0,
        at_ips: parseInt(row[3], 10) || 0,
        at_hms: parseInt(row[4], 10) || 0,
        at_panel: parseInt(row[5], 10) || 0,
        at_final: parseInt(row[6], 10) || 0,
        at_offer: parseInt(row[7], 10) || 0,
        hires: parseInt(row[8], 10) || 0,
        scoring: parseInt(row[9], 10) || 0,
        all_star: row[10]?.toLowerCase() === "yes",
        champion: row[11]?.toLowerCase() === "yes",
      }));

    // Sort by most advanced visible stage first: Hires → Final → HMS → IPS → Referrals
    entries.sort((a, b) => {
      if (b.hires !== a.hires) return b.hires - a.hires;
      if (b.at_final !== a.at_final) return b.at_final - a.at_final;
      if (b.at_hms !== a.at_hms) return b.at_hms - a.at_hms;
      if (b.at_ips !== a.at_ips) return b.at_ips - a.at_ips;
      return b.counted_referrals - a.counted_referrals;
    });

    return NextResponse.json({
      entries,
      updated_at: new Date().toISOString(),
      is_empty: entries.length === 0,
    });
  } catch (err) {
    console.error("Leaderboard fetch failed:", err);
    return NextResponse.json(
      { entries: [], updated_at: new Date().toISOString(), is_empty: true, error: "Fetch failed" },
      { status: 502 }
    );
  }
}
