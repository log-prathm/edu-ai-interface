import { useLayoutEffect, useRef, useState } from "react";
import { Paperclip, Send, X } from "lucide-react";
import User, { type ChatAttachment } from "../components/User";

type ChatMessage = {
  text: string;
  attachments: ChatAttachment[];
};

async function uploadToCloudinary(file: File): Promise<ChatAttachment> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

  if (!cloudName || !uploadPreset) {
    throw new Error("Missing Cloudinary env vars");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "Cloudinary upload failed");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type,
    originalName: file.name,
  };
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [uploading, setUploading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    const el = textAreaRef.current;
    if (!el) return;

    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [message]);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploading(true);
    try {
      const uploaded = await Promise.all(files.map(uploadToCloudinary));
      setAttachments((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "File upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed && attachments.length === 0) return;

    setMessages((prev) => [
      ...prev,
      {
        text: trimmed,
        attachments,
      },
    ]);

    setMessage("");
    setAttachments([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
        <div
            className="fixed inset-0 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('/beautiful-book-club-pattern.avif')" }}
        />
        <div className="fixed inset-0 bg-black/50" />

            <div className="relative z-10 flex min-h-screen justify-end">
                <div className="flex h-screen w-full flex-col">
                    <div className="flex-1 overflow-y-auto px-3 pb-44 pt-4 sm:px-4 lg:px-6">
                        <div className="ml-auto flex w-full max-w-5xl flex-col gap-3">
                            {messages.map((msg, index) => (
                                <User key={index} text={msg.text} attachments={msg.attachments} />
                            ))}
                        <div ref={bottomRef} />
                    </div>
                </div>

                <div className="fixed bottom-4 left-3 right-3 z-20 lg:left-auto lg:right-6 lg:w-[calc(100vw-3rem)] lg:max-w-[80rem]">
                        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-3 shadow-2xl backdrop-blur-xl">
                            {attachments.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-2">
                                {attachments.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-sm text-white"
                                    >
                                        <span className="max-w-52 truncate">{file.originalName}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeAttachment(index)}
                                            className="rounded-full p-1 hover:bg-white/10"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                            <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-2 py-2">
                                <label className="cursor-pointer rounded-2xl p-2 transition hover:bg-white/10">
                                <Paperclip className="flex items-center h-5 w-5 text-white/90" />
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    accept="image/*,.pdf,.doc,.docx,.txt"
                                    onChange={handleFiles}
                                />
                                </label>

                                <textarea
                                ref={textAreaRef}
                                className="min-h-12 max-h-44 flex-1 resize-none overflow-y-auto bg-transparent px-2 py-2 text-white outline-none placeholder:text-white/45 leading-6"
                                placeholder={uploading ? "Uploading files..." : "Message"}
                                value={message}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                rows={1}
                                />

                                <button
                                onClick={handleSend}
                                disabled={uploading || (!message.trim() && attachments.length === 0)}
                                className="rounded-2xl p-2 text-blue-400 transition hover:bg-white/10 disabled:opacity-40"
                                >
                                <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  );
}