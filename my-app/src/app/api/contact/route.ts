import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"
import Contact from "@/models/Contact";

export async function POST(req:any) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      source: "landing-page",
    });

    return NextResponse.json(
      { success: true, message: "Message received", data: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
