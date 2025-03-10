"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import Markdown from "react-markdown";

async function fetchStream(
  url: string,
  body: object,
  onChunk: (chunk: string) => void
) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.body) return;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    onChunk(chunk);
  }
}

export default function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    let aiMessage = { role: "ai", content: "" };
    setMessages((prev) => [...prev, aiMessage]);

    await fetchStream("/api/ai", { prompt: input }, (chunk) => {
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { ...msg, content: msg.content + chunk } : msg
        )
      );
    });

    setLoading(false);
  };

  const generateLessonPlan = async () => {
    if (!topic.trim() || !description.trim()) return;
    setLoading(true);

    let lessonPlan = {
      role: "ai",
      content: `📚 **Lesson Plan for ${topic}**\n\n`,
    };
    setMessages((prev) => [...prev, lessonPlan]);

    await fetchStream("/api/ai/lesson", { topic, description }, (chunk) => {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { ...lessonPlan, content: lessonPlan.content + chunk },
      ]);
    });

    setLoading(false);
    setShowDialog(false);
    setTopic("");
    setDescription("");
  };

  const generateTestMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "ai", content: "Loading test data...\n" },
    ]);

    await fetchStream("/api/ai/test", {}, (chunk) => {
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { ...msg, content: msg.content + chunk } : msg
        )
      );
    });

    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center justify-center p-1 md:p-6">
          <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
            <CardContent className="p-2 md:p-6">
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 text-center mb-1 md:mb-4">
                Optimum Advanced AI
              </p>

              <ScrollArea className="h-[500px] max-h-full overflow-y-auto border-b pb-4">
                {messages.length === 0 && (
                  <p className="text-muted-foreground text-center">
                    Start a conversation...
                  </p>
                )}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground self-end ml-auto"
                        : "bg-muted text-muted-foreground self-start mr-auto"
                    }`}
                  >
                    <Markdown className="prose max-w-full">
                      {msg.content}
                    </Markdown>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Loader2 className="animate-spin" size={20} />
                    <span>Optimum Advanced AI is thinking...</span>
                  </div>
                )}
              </ScrollArea>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  generateTestMessage();
                }}
                className="mt-4 flex space-x-2 flex-col md:flex-row"        
              >
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me something..."
                  className="flex-grow"
                />
                <div className="flex space-x-2 justify-between mt-2 md:mt-0">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer flex-1"
                  >
                    Send
                  </Button>
                  <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="cursor-pointer flex-1">
                        Lesson Plan
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Generate Lesson Plan</DialogTitle>
                        <DialogDescription>
                          Generate a lesson plan for your topic.
                        </DialogDescription>
                      </DialogHeader>
                      <Input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Topic"
                      />
                      <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={generateTestMessage}
                            disabled={loading}
                            className="cursor-pointer"
                          >
                            Generate
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
