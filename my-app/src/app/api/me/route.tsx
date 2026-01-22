import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ loggedIn: false });
    }

    jwt.verify(token, process.env.TOKEN_SECRET!);

    return NextResponse.json({ loggedIn: true });
  } catch (e) {
    return NextResponse.json({ loggedIn: false });
  }
}
