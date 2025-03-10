import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY, 
    baseURL: "https://api.deepseek.com/v1",
});

export async function POST(req: Request) {
    try {
        console.log("POST /api/ai/lesson");
        const { topic, description } = await req.json();
        console.log("Topic:", topic);
        console.log("Description:", description);


        // Prompt für Lehrplan-Generierung
        const prompt = `
            Erstelle einen detaillierten Lehrplan für folgendes Thema:
            Thema: ${topic}
            Beschreibung: ${description}
            Der Lehrplan sollte in sinnvolle Abschnitte unterteilt sein und eine klare Lernstruktur haben.
        `;

        // OpenAI Streaming-Request
        const stream = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: [{ role: "user", content: prompt }],
            stream: true,
        });

        // **Stream weiterleiten**
        const encoder = new TextEncoder();
        const streamResponse = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    controller.enqueue(encoder.encode(chunk.choices[0]?.delta?.content || ""));
                }
                controller.close();
            },
        });

        return new Response(streamResponse, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
