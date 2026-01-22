import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST() {
    try {
        const prompt =
            "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const model = genAI.getGenerativeModel({
                        model: "gemini-flash-latest",
                    });

                    const result = await model.generateContentStream(prompt);

                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        controller.enqueue(encoder.encode(text));
                    }

                    controller.close();
                } catch (err: any) {
                    controller.enqueue(
                        encoder.encode(`\n❌ Error: ${err.message}`)
                    );
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache",
            },
        });

    } catch (error: any) {
        return new Response(
            JSON.stringify({
                name: error.name,
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
