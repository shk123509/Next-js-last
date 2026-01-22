import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  return NextResponse.json({ isLoggedIn: true });
}
