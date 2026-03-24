import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const sitePassword = process.env.SITE_PASSWORD;

  if (password === sitePassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("mm_auth", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ success: false, error: "Wrong code. Try again." }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get("mm_auth");
  if (cookie?.value === "true") {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
