"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import api from "@/utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  /* ARTICLE STATE */
  const [sajak, setSajak] = useState(null);
  const [loadingSajak, setLoadingSajak] = useState(true);

  /* AUTH / OWNER CHECK */
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  /* AUTHOR INFO (pemilik sajak) */
  const [author, setAuthor] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(false);

  /* LIKE STATE (local) */
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  /* COMMENTS */
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [sendingReplyIds, setSendingReplyIds] = useState(new Set());

  /* INPUTS */
  const [comment, setComment] = useState("");
  const [repliesMap, setRepliesMap] = useState({});
  const [activeReplyBox, setActiveReplyBox] = useState(null);

  // helper untuk dapatkan id dari objek user
  function getUserId(u) {
    if (!u) return null;
    return (
      u._id ||
      u.id ||
      (u.userId && (typeof u.userId === "string" ? u.userId : u.userId._id)) ||
      null
    );
  }

  useEffect(() => {
    let mounted = true;

    async function fetchUserAndSajak() {
      try {
        setCheckingAuth(true);
        const userRes = await api.get("/user");
        if (!mounted) return;
        setUser(userRes.data);
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401) {
          setUser(null);
        } else {
          console.error("Tidak bisa ambil user (non-401):", err);
          toast.error("Gagal memeriksa status user.");
          setUser(null);
        }
      } finally {
        if (mounted) setCheckingAuth(false);
      }

      if (!id) {
        toast.error("ID sajak tidak tersedia di URL.");
        setLoadingSajak(false);
        return;
      }

      try {
        setLoadingSajak(true);
        const res = await api.get(`/sajak/${id}`);
        if (!mounted) return;
        setSajak(res.data);

        if (typeof res.data.likes === "number") setLikeCount(res.data.likes);
        else setLikeCount(0);

        const sajakOwnerId =
          res.data.authorId ?? res.data.userId ?? res.data.author ?? null;
        const currentUserId = getUserId(user);
        if (currentUserId && sajakOwnerId) {
          setIsOwner(String(currentUserId) === String(sajakOwnerId));
        } else {
          setIsOwner(false);
        }

        // --- tambahan: fetch data author/pemilik untuk ditampilkan ---
        if (sajakOwnerId) {
          try {
            setLoadingAuthor(true);
            // asumsi endpoint: GET /user/:id
            const authorRes = await api.get(`/user/${sajakOwnerId}`);
            if (!mounted) return;
            // backend mungkin mengembalikan user object di authorRes.data
            setAuthor(authorRes.data);
          } catch (err) {
            console.error("Gagal ambil data author:", err);
            // jangan ganggu UX; beri notifikasi ringan
            // toast.error("Gagal memuat informasi penulis."); // opsional
            setAuthor(null);
          } finally {
            if (mounted) setLoadingAuthor(false);
          }
        } else {
          setAuthor(null);
        }
      } catch (err) {
        console.error("Gagal ambil sajak:", err);
        toast.error("Gagal memuat sajak.");
        setSajak(null);
      } finally {
        if (mounted) setLoadingSajak(false);
      }
    }

    fetchUserAndSajak();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // fetch comments
  const fetchComments = useCallback(async () => {
    if (!id) return;
    try {
      setLoadingComments(true);
      const res = await api.get(`/sajak/${id}/comments`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Gagal ambil komentar:", err);
      toast.error("Gagal memuat komentar.");
    } finally {
      setLoadingComments(false);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => prev + (liked ? -1 : 1));
  };

  const sendComment = async () => {
    if (!comment.trim()) {
      toast.error("Isi komentar tidak boleh kosong.");
      return;
    }
    if (!user) {
      toast.error("Silakan login untuk berkomentar.");
      router.push("/auth/login");
      return;
    }
    try {
      toast.loading("Mengirim komentar...", { id: "send-comment" });
      await api.post(`/sajak/${id}/comments`, { text: comment.trim() });
      setComment("");
      toast.success("Komentar dikirim.", { id: "send-comment" });
      await fetchComments();
    } catch (err) {
      console.error("Gagal kirim komentar:", err);
      toast.error("Gagal mengirim komentar.");
    }
  };

  const sendReply = async (commentId) => {
    const text = (repliesMap[commentId] || "").trim();
    if (!text) {
      toast.error("Isi balasan tidak boleh kosong.");
      return;
    }
    if (!user) {
      toast.error("Silakan login untuk membalas.");
      router.push("/auth/login");
      return;
    }

    if (sendingReplyIds.has(commentId)) return;
    setSendingReplyIds((s) => new Set(s).add(commentId));

    try {
      toast.loading("Mengirim balasan...", { id: `reply-${commentId}` });
      await api.post(`/sajak/${id}/comments/${commentId}`, { text });
      setRepliesMap((prev) => ({ ...prev, [commentId]: "" }));
      setActiveReplyBox(null);
      toast.success("Balasan dikirim.", { id: `reply-${commentId}` });
      await fetchComments();
    } catch (err) {
      console.error("Gagal kirim balasan:", err);
      const msg = err?.response?.data?.message || "Gagal mengirim balasan.";
      toast.error(msg);
    } finally {
      setSendingReplyIds((s) => {
        const copy = new Set(s);
        copy.delete(commentId);
        return copy;
      });
    }
  };

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  }

  // recursive CommentItem
  function CommentItem({ comment, level = 0 }) {
    const indentClass = level > 0 ? `ml-8` : ``;
    const replies = Array.isArray(comment.replies) ? comment.replies : [];

    return (
      <div className={`${indentClass}`} key={comment._id}>
        <div className="border-b pb-6">
          <div
            className="flex items-center gap-2 text-sm mb-1 cursor-pointer"
            onClick={() =>
              router.push(
                `/profil/${comment.authorId?._id ?? comment.authorId}`
              )
            }
          >
            <DefaultProfile size={22} />
            <p>{comment.authorId?.username ?? "Pengguna"}</p>
            <span className="text-xs text-gray-500">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          <p className="mb-2">{comment.text}</p>

          <div className="flex gap-4 items-center">
            <button
              className="text-xs underline"
              onClick={() => {
                setActiveReplyBox(comment._id);
                setRepliesMap((prev) => ({
                  ...prev,
                  [comment._id]: prev[comment._id] ?? "",
                }));
              }}
            >
              Reply
            </button>

            <span className="text-xs text-gray-500">
              {replies.length ? replies.length : comment.repliesCount ?? 0}{" "}
              replies
            </span>
          </div>

          {activeReplyBox === comment._id && (
            <div className="mt-4 ml-0">
              <div className="flex items-center gap-2 mb-3 text-sm">
                <DefaultProfile size={22} />
                <p>{user ? user.username || "Anda" : "Tamu"}</p>
              </div>

              <textarea
                value={repliesMap[comment._1d] ?? repliesMap[comment._id] ?? ""}
                onChange={(e) =>
                  setRepliesMap((prev) => ({
                    ...prev,
                    [comment._id]: e.target.value,
                  }))
                }
                placeholder="Tuliskan balasan anda..."
                className="w-full bg-gray-100 p-3 rounded-md text-sm outline-none"
                rows={3}
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  className="text-sm px-4 py-1 rounded-md bg-gray-200"
                  onClick={() => {
                    setActiveReplyBox(null);
                    setRepliesMap((prev) => ({ ...prev, [comment._id]: "" }));
                  }}
                >
                  Batalkan
                </button>
                <button
                  className="text-sm px-4 py-1 rounded-md bg-gray-300"
                  onClick={() => sendReply(comment._id)}
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>

        {replies.length > 0 && (
          <div className="mt-4 space-y-6">
            {replies.map((r) => (
              <CommentItem key={r._id} comment={r} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (loadingSajak) {
    return (
      <main className="w-full min-h-screen px-4 md:px-8 lg:px-24 py-10 bg-background text-foreground flex items-center justify-center">
        <p>Memuat sajak...</p>
        <Toaster position="top-right" />
      </main>
    );
  }

  if (!sajak) {
    return (
      <main className="w-full min-h-screen px-4 md:px-8 lg:px-24 py-10 bg-background text-foreground">
        <Toaster position="top-right" />
        <p>Sajak tidak ditemukan.</p>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen px-4 md:px-8 lg:px-24 py-10 bg-background text-foreground">
      <Toaster position="top-right" />

      <p
        className="text-xs tracking-wide text-hitam uppercase mb-4 cursor-pointer"
        onClick={() => router.push(`/kategori/${params?.category ?? "alam"}`)}
      >
        LOKAL |{" "}
        {(sajak.hashtags && sajak.hashtags.join(", ").toUpperCase()) || "ALAM"}
      </p>

      <h1 className="font-playfair text-3xl md:text-4xl font-semibold leading-tight mb-4">
        {sajak.title}
      </h1>

      <div className="flex items-center gap-2 text-sm mb-6">
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/profil/${sajak.authorId}`)}
        >
          <DefaultProfile size={22} />
        </div>

        {/* ----------------- tampilkan info author di sini -----------------
            Jika data author tersedia, tampilkan nama / username / bio singkat.
            Jika tidak, fallback ke authorId saja (link ke profil).
        */}
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/profil/${sajak.authorId}`)}
        >
          {author ? (
            // author object tampilkan nama/username — jangan ubah styling
            <div>
              <p>
                {author.name ?? author.username ?? author.fullname ?? "Penulis"}
              </p>
              {/* optional: tampilkan username kecil di bawah jika ada */}
              {author.username && (
                <p className="text-xs text-gray-500">{`@${author.username}`}</p>
              )}
            </div>
          ) : (
            // fallback (sebelum author dimuat): tampilkan 'Penulis • tanggal'
            <p>{`Penulis • ${formatDate(sajak.createdAt)}`}</p>
          )}
        </div>

        {isOwner && (
          <button
            className="ml-4 text-sm px-3 py-1 rounded bg-oren text-black"
            onClick={() =>
              router.push(`/sajak/${params?.category ?? "alam"}/${id}/edit`)
            }
          >
            Edit
          </button>
        )}
      </div>

      <div className="relative w-full aspect-[1746/605] mb-10">
        <Image
          src={sajak.image ?? "/assets/category-sajak/SajakDefaultPicture.jpg"}
          alt="thumbnail"
          fill
          className="object-cover"
        />
      </div>

      {/* ... sisa tampilan tetap sama (artikel, likes, komentar, dll.) ... */}

      <section className="hidden lg:grid grid-cols-4 gap-10">
        <div className="col-span-3 space-y-6 leading-relaxed text-[15px]">
          {sajak.content.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        <aside className="col-span-1">
          <SidebarPopular />
        </aside>
      </section>

      <section className="lg:hidden space-y-6 leading-relaxed text-[15px] mb-10">
        {sajak.content.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </section>

      <div className="flex items-center gap-6 my-10 text-sm">
        <button onClick={toggleLike} className="flex items-center gap-1">
          {liked ? (
            <PiHeartFill className="text-oren w-[22px] h-[22px]" />
          ) : (
            <PiHeart className="text-oren w-[22px] h-[22px]" />
          )}
          <span>{likeCount}</span>
        </button>

        <div className="flex items-center gap-1 cursor-pointer">
          <FaRegComment className="text-oren w-[22px] h-[22px]" />
          <span>{comments.length}</span>
        </div>

        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            toast.success("Link artikel disalin ke clipboard.");
          }}
        >
          <RiShareForwardLine className="text-oren w-[22px] h-[22px]" />
        </div>
      </div>

      <section className="max-w-3xl">
        <h2 className="font-playfair text-lg mb-4">
          Komentar ({comments.length})
        </h2>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 text-sm">
            <DefaultProfile size={22} />
            <p>{user ? user.username || user.name || "Anda" : "Tamu"}</p>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Berikan komentar anda..."
            className="w-full bg-gray-100 p-3 rounded-md text-sm outline-none"
            rows={4}
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

        {/* COMMENT LIST (recursive) */}
        <div className="space-y-10">
          {loadingComments ? (
            <p>Memuat komentar...</p>
          ) : comments.length === 0 ? (
            <p>Belum ada komentar. Jadilah yang pertama!</p>
          ) : (
            comments.map((c) => (
              <CommentItem key={c._id} comment={c} level={0} />
            ))
          )}
        </div>
      </section>

      <div className="mt-12 lg:hidden">
        <SidebarPopular />
      </div>
    </main>
  );
}

/* SidebarPopular & DefaultProfile sama seperti sebelumnya */
function SidebarPopular() {
  const router = useRouter();
  return (
    <>
      <h3 className="font-playfair text-xs tracking-wider mb-4">
        SAJAK TERPOPULER
      </h3>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex gap-3 border-b pb-3 cursor-pointer"
            onClick={() => router.push(`/sajak/popular-${i}`)}
          >
            <div className="relative w-20 aspect-[1746/605]">
              <Image
                src="/assets/category-sajak/SajakDefaultPicture.jpg"
                alt="popular"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p
                className="text-[11px] uppercase mb-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/kategori/tag-${i}`);
                }}
              >
                TAG NYA
              </p>
              <p className="text-sm leading-snug">
                Lorem ipsum dolor sit amet...
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

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
