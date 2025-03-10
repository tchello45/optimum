import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY, // API Key aus .env
  baseURL: "https://api.deepseek.com/v1", // DeepSeek API Base URL
});

export async function POST(req: Request) {
  try {
    let { prompt } = await req.json();

    // OpenAI SDK für Streaming verwenden
    const stream = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      stream: true, // Aktiviere Streaming
      max_tokens: 200,
    });

    // **Stream in einen ReadableStream umwandeln**
    const encoder = new TextEncoder();
    const streamResponse = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(
            encoder.encode(chunk.choices[0]?.delta?.content || "")
          );
        }
        controller.close();
      },
    });

    return new Response(streamResponse, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
