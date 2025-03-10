export async function POST(req: Request) {
    const encoder = new TextEncoder();

    const streamResponse = new ReadableStream({
        async start(controller) {
            const messages = [
                "Lade Testdaten...",
                "Dies ist eine simulierte Antwort.",
                "Das Streaming funktioniert korrekt.",
                "Dieser Text wird schrittweise über 10 Sekunden gesendet.",
                "Am Ende sollte dein UI perfekt streamen!",
            ];

            for (const msg of messages) {
                controller.enqueue(encoder.encode(msg + "\n"));
                await new Promise((res) => setTimeout(res, 500)); // 2 Sekunden Verzögerung
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
}
