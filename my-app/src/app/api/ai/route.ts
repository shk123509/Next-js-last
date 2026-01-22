import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// .env.local se key uthayega
const API_KEY = process.env.GOOGLE_GEN_AI_KEY || ""; 
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) return NextResponse.json({ summary: "Link kidhar hai bhai?" }, { status: 400 });

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Aap ek expert YouTube analyst hain. Is video link (${url}) ko analyze karein. 
    Ek short aur mazedaar Only english not use hindi ok vvi only english ok summary likhein (2-3 lines). 
    Direct summary se shuru karein, koi faltu disclaimer mat dena. 
    Video ID aur keywords se content ka pata lagayein.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ summary: text });

  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ summary: "AI thoda thak gaya hai, dubara try karein!" }, { status: 500 });
  }
}