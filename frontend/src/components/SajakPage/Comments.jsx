"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { DefaultProfile } from "./DefaultProfile";

export default function Comments({ initialCount = 70 }) {
  const router = useRouter();

  /* LIKE STATE */
  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const sendComment = () => {
    if (!comment.trim()) return;
    console.log("SEND COMMENT:", comment);
    setComment("");
  };

  const handleReply = (id) => {
    setReplyingTo(id);
    setReplyText("");
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const sendReply = (id) => {
    if (!replyText.trim()) return;
    console.log("SEND REPLY TO:", id, "TEXT:", replyText);
    setReplyText("");
    setReplyingTo(null);
  };

  function DefaultProfile({ size = 24 }) {
  return (
        <div
        className="rounded-full bg-[#363231] flex items-center justify-center"
        style={{ width: size, height: size }}
        >
        <svg
            className="text-[#FFF9F4]"
            fill="currentColor"
            viewBox="0 0 20 20"
            width={size * 0.6}
            height={size * 0.6}
        >
            <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0A7 7 0 013 16z"
            clipRule="evenodd"
            />
        </svg>
        </div>
    );
    }
  return (
    <section id="comments" className="max-w-3xl mt-10">
      <h2 className="font-playfair text-lg mb-4">Komentar ({initialCount})</h2>

      {/* ADD COMMENT */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3 text-sm">
          <DefaultProfile size={22} />
          <p>Nama user</p>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Berikan komentar anda..."
          className="w-full bg-gray-100 p-3 rounded-md text-sm outline-none"
        />
        <div className="flex justify-end gap-3 mt-2">
          <button
            className="text-sm px-4 py-1 rounded-md bg-gray-200"
            onClick={() => setComment("")}
          >
            Batalkan
          </button>

          <button
            className="text-sm px-4 py-1 rounded-md bg-gray-300"
            onClick={sendComment}
          >
            Kirim
          </button>
        </div>
      </div>

      {/* COMMENT LIST */}
      <div className="space-y-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="border-b pb-6">
              <div
                className="flex items-center gap-2 text-sm mb-1 cursor-pointer"
                onClick={() => router.push(`/profil/orang-${i}`)}
              >
                <DefaultProfile size={22} />
                <p>Orang {i}</p>
                <span className="text-xs text-gray-500">Oct {i}</span>
              </div>

              <p className="mb-2">Komentar nya AHAHAHAHAHAHA</p>

              <button
                className="text-xs underline"
                onClick={() => handleReply(`comment-${i}`)}
              >
                Reply
              </button>

              {replyingTo === `comment-${i}` && (
                <div className="mt-4 ml-8">
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <DefaultProfile size={22} />
                    <p>Nama user</p>
                  </div>

                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Tuliskan balasan anda..."
                    className="w-full bg-gray-100 p-3 rounded-md text-sm outline-none"
                    rows={3}
                  />
                  <div className="flex justify-end gap-3 mt-2">
                    <button
                      className="text-sm px-4 py-1 rounded-md bg-gray-200"
                      onClick={cancelReply}
                    >
                      Batalkan
                    </button>

                    <button
                      className="text-sm px-4 py-1 rounded-md bg-gray-300"
                      onClick={() => sendReply(`comment-${i}`)}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
