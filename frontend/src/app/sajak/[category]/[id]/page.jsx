"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
// import { useEffect, useState, useCallback } from "react";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import api from "@/utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import GDriveImage from "@/components/GDriveImage";
import extractDriveId from "@/components/extractDriverId";

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

  /* AUTHOR INFO */
  const [author, setAuthor] = useState(null);
  const [loadingAuthor, setLoadingAuthor] = useState(false);

  /* LIKE STATE */
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

  function getUserId(u) {
    if (!u) return null;
    return (
      u._id ||
      u.id ||
      (u.userId && (typeof u.userId === "string" ? u.userId : u.userId._id)) ||
      null
    );
  }

  // --- FETCH ARTICLE & USER ---
  useEffect(() => {
    let mounted = true;

    async function fetchUserAndSajak() {
      let userRes = null;
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
        console.log(res.data);
        if (typeof res.data.likes === "number") setLikeCount(res.data.likes);
        else setLikeCount(0);


        if (userRes?.data?._id && res.data?.likedBy) {
          const alreadyLiked = res.data.likedBy.some(
            uid => String(uid) === String(userRes.data._id)
          );
          setLiked(alreadyLiked);
        }

        const sajakOwnerId = res.data.authorId ?? res.data.userId ?? res.data.author ?? null;
        const currentUserId = getUserId(user);
        if (currentUserId && sajakOwnerId) {
          setIsOwner(String(currentUserId) === String(sajakOwnerId));
        } else {
          setIsOwner(false);
        }

        if (sajakOwnerId) {
          try {
            setLoadingAuthor(true);
            const authorRes = await api.get(`/user/${sajakOwnerId}`);
            if (!mounted) return;
            setAuthor(authorRes.data);
          } catch (err) {
            console.error("Gagal ambil data author:", err);
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
    return () => { mounted = false; };
  }, [id]);

  // --- FETCH COMMENTS ---
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

  // --- LIKE STATE & HANDLER ---
  const toggleLike = async () => {
    console.log("Tombol Like diklik");
    if (!user) {
      toast.error("Silakan login untuk memberi like.");
      router.push("/auth/login");
      return;
    }
    if (!id) return;

    const prevLiked = liked;
    const prevCount = likeCount;

    // Optimistic UI
    setLiked(!prevLiked);
    setLikeCount(prevCount + (prevLiked ? -1 : 1));

    try {
      const res = await api.patch(`/sajak/${id}/like`, { like: !prevLiked });
      // update UI berdasarkan response backend
      if (res.data?.sajak?.likes !== undefined) {
        setLikeCount(res.data.sajak.likes);
        setLiked(res.data.sajak.likedBy?.includes(user._id));
      }
      toast.success(prevLiked ? "Berhasil batal like." : "Berhasil like!");
    } catch (err) {
      console.error("Gagal like/unlike:", err);
      // rollback UI
      setLiked(prevLiked);
      setLikeCount(prevCount);
      toast.error(err?.response?.data?.message || "Gagal memproses like.");
    }
  };



  const sendComment = async () => {
    if (!comment.trim()) return toast.error("Isi komentar tidak boleh kosong.");
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
    if (!text) return toast.error("Isi balasan tidak boleh kosong.");
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
      return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    } catch { return iso; }
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

  const fileId = sajak.image ? extractDriveId(sajak.image) : null;

  return (
    <main className="w-full min-h-screen px-4 md:px-8 lg:px-24 py-10 bg-background text-foreground">
      <Toaster position="top-right" />

      <p
        className="text-xs tracking-wide text-hitam uppercase mb-4 cursor-pointer"
        onClick={() => router.push("/sajak/alam")}
      >
        LOKAL | {(sajak.hashtags && sajak.hashtags.join(", ").toUpperCase()) || "ALAM"}
      </p>

      <h1 className="font-playfair text-3xl md:text-4xl font-semibold leading-tight mb-4">{sajak.title}</h1>

      <div className="flex items-center gap-2 text-sm mb-6">
        <div className="cursor-pointer" onClick={() => router.push(`/profil/${sajak.authorId}`)}>
          <DefaultProfile size={22} />
        </div>
        <div className="cursor-pointer" onClick={() => router.push(`/profil/${sajak.authorId}`)}>
          {author ? (
            <div>
              <p>{author.name ?? author.username ?? author.fullname ?? "Penulis"}</p>
              {author.username && <p className="text-xs text-gray-500">{`@${author.username}`}</p>}
            </div>
          ) : (
            <p>{`Penulis • ${formatDate(sajak.createdAt)}`}</p>
          )}
        </div>

        {isOwner && (
          <button className="ml-4 text-sm px-3 py-1 rounded bg-oren text-black" onClick={() => router.push(`/sajak/${params?.category ?? "alam"}/${id}/edit`)}>
            Edit
          </button>
        )}
      </div>

      <div className="relative w-full aspect-[1746/605] mb-10">
        {fileId ? (
          <GDriveImage fileId={fileId} alt="thumbnail" fill className="object-cover" />
        ) : (
          <Image src="/assets/category-sajak/SajakDefaultPicture.jpg" alt="default" fill className="object-cover" />
        )}
      </div>

      {/* Content */}
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

      {/* Likes & Share */}
      <div className="flex items-center gap-6 my-10 text-sm relative z-10">
        <button
          onClick={toggleLike}
          className="flex items-center gap-1 cursor-pointer"
        >
          {liked ? (
            <PiHeartFill className="text-oren w-[22px] h-[22px]" />
          ) : (
            <PiHeart className="text-oren w-[22px] h-[22px]" />
          )}
          <span>{likeCount}</span>
        </button>

        <div className="flex items-center gap-1 cursor-pointer">
          <FaRegComment className="text-oren w-[22px] h-[22px]" />
          <span>{countAllComments(comments)}</span>
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

      {/* Comment Section */}
      <section className="max-w-3xl mt-10">
        <h2 className="font-playfair text-lg mb-4">Komentar ({countAllComments(comments)})</h2>

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
          /><div className="flex justify-end gap-3 mt-2">
            <button className="text-sm px-4 py-1 rounded-md bg-gray-200" onClick={() => setComment("")}>Batalkan</button>
            <button className="text-sm px-4 py-1 rounded-md bg-gray-300" onClick={sendComment}>Kirim</button>
          </div>
        </div>

        <div className="space-y-10">
          {loadingComments ? (
            <p>Memuat komentar...</p>
          ) : comments.length === 0 ? (
            <p>Belum ada komentar. Jadilah yang pertama!</p>
          ) : (
            comments.map((c) => (
              <CommentItem
                key={c._id}
                comment={c}
                level={0}
                activeReplyBox={activeReplyBox}
                setActiveReplyBox={setActiveReplyBox}
                repliesMap={repliesMap}
                setRepliesMap={setRepliesMap}
                sendReply={sendReply}
              />
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

function SidebarPopular() {
  const router = useRouter();
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchTrending() {
      try {
        setLoading(true);
        const res = await api.get("/sajak/trending");
        if (!mounted) return;
        setTrending((res.data.data || []).slice(0, 4)); // batasi 4 sajak
      } catch (err) {
        console.error("Gagal fetch trending:", err);
        toast.error("Gagal memuat sajak terpopuler.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchTrending();
    return () => { mounted = false; };
  }, []);

  if (loading) return <p>Memuat sajak terpopuler...</p>;
  if (trending.length === 0) return <p>Tidak ada sajak terpopuler.</p>;

  return (
    <>
      <h3 className="font-playfair text-xs tracking-wider mb-4">SAJAK TERPOPULER</h3>
      <div className="space-y-6">
        {trending.map((sajak) => {
          const fileId = sajak.image ? extractDriveId(sajak.image) : null;
          return (
            <div
              key={sajak._id}
              className="flex gap-3 border-b pb-3 cursor-pointer"
              onClick={() => router.push(`/sajak/${sajak.hashtags[0]}/${sajak._id}`)}
            >
              {/* <div className="w-20 aspect-square overflow-hidden rounded-md relative">
              {fileId ? (
                <GDriveImage
                  fileId={fileId}
                  alt={sajak.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/assets/category-sajak/SajakDefaultPicture.jpg"
                  alt="default"
                  fill
                  className="object-cover"
                />
              )}
            </div> */}


              <div className="flex flex-col justify-between">
                <p
                  className="text-[11px] uppercase mb-1 cursor-pointer text-gray-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(sajak.hashtags?.[0] || "TAG").toUpperCase()}
                </p>
                <p className="text-sm leading-snug line-clamp-2">{sajak.title}</p>
              </div>
            </div>
          );
        })}
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


// -------------------

// Memoized CommentItem

// -------------------
const CommentItem = React.memo(function CommentItem({
  comment,
  level = 0,
  activeReplyBox,
  setActiveReplyBox,
  repliesMap,
  setRepliesMap,
  sendReply
}) {
  const router = useRouter();
  const replies = Array.isArray(comment.replies) ? comment.replies : [];

  const indent = level * 24; // lebih jelas jarak indent

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return iso;
    }
  }

  return (
    <div className="mb-4 relative">
      {/* vertical line for child comments */}
      {level > 0 && (
        <div
          className="absolute top-0 left-2 h-full border-gray-300"
          style={{ marginLeft: indent - 16 }}
        />
      )}

      <div className="flex items-start gap-3">
        <DefaultProfile size={28} />
        <div className="flex-1">
          <div
            className="flex items-center gap-2 text-sm mb-1 cursor-pointer"
            onClick={() => router.push(`/profil/${comment.authorId?._id ?? comment.authorId}`)}
          >
            <p className="font-semibold">{comment.authorId?.username ?? "Pengguna"}</p>
            <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
          </div>

          <div
            className={`p-3 rounded-lg ${level > 0 ? "bg-gray-50" : "bg-gray-100"}`}
            style={{ marginLeft: level > 0 ? 0 : 0 }}
          >
            <p className="mb-2">{comment.text}</p>
            <div className="flex gap-4 items-center text-xs text-gray-500">
              <button
                className="underline"
                onClick={() => {
                  setActiveReplyBox(comment._id);
                  setRepliesMap((prev) => ({ ...prev, [comment._id]: prev[comment._id] ?? "" }));
                }}
              >
                Reply
              </button>
              <span>{replies.length} replies</span>
            </div>
          </div>

          {activeReplyBox === comment._id && (
            <div className="mt-3 flex gap-2">
              <DefaultProfile size={24} />
              <div className="flex-1">
                <textarea
                  value={repliesMap[comment._id] ?? ""}
                  onChange={(e) =>
                    setRepliesMap((prev) => ({ ...prev, [comment._id]: e.target.value }))
                  }
                  placeholder="Tuliskan balasan anda..."
                  className="w-full bg-gray-100 p-2 rounded-md text-sm outline-none"
                  rows={3}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    className="text-sm px-3 py-1 rounded-md bg-gray-200"
                    onClick={() => {
                      setActiveReplyBox(null);
                      setRepliesMap((prev) => ({ ...prev, [comment._id]: "" }));
                    }}
                  >
                    Batalkan
                  </button>
                  <button
                    className="text-sm px-3 py-1 rounded-md bg-gray-300"
                    onClick={() => sendReply(comment._id)}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Render replies recursively */}
          {replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {replies.map((r) => (
                <CommentItem
                  key={r._id}
                  comment={r}
                  level={level + 1}
                  activeReplyBox={activeReplyBox}
                  setActiveReplyBox={setActiveReplyBox}
                  repliesMap={repliesMap}
                  setRepliesMap={setRepliesMap}
                  sendReply={sendReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

function countAllComments(comments) {
  let count = 0;

  function countRecursive(commentList) {
    for (const c of commentList) {
      count += 1; // hitung comment itu sendiri
      if (c.replies && c.replies.length > 0) {
        countRecursive(c.replies); // hitung replies
      }
    }
  }

  countRecursive(comments);
  return count;
}