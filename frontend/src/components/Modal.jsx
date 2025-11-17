"use client";

import React, { useEffect } from "react";

export default function Modal({
  isOpen,
  title,
  children,
  onYes = () => {},
  onNo = () => {},
  onClose = () => {},
  closeOnBackdrop = true,
  ariaLabelledBy = "modal-title",
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby={ariaLabelledBy}
    >
      {/* overlay full-screen with blur */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/28"
        onMouseDown={(e) => {
          // close jika klik di overlay (bukan di modal card)
          if (e.target === e.currentTarget && closeOnBackdrop) onClose();
        }}
        aria-hidden="true"
      />

      {/* container untuk memposisikan modal; buat container ini non-interactive
          sehingga overlay menerima onMouseDown di area kosong. Card sendiri
          akan menerima pointer-events. */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        {/* card — tetap mempertahankan style Anda; beri pointer-events-auto agar interaksi di dalamnya bekerja */}
        <div className="relative z-10 w-full max-w-sm md:max-w-4xl bg-putih bg-opacity-75 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 pointer-events-auto">
          {/* X close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-hitam hover:text-gray-600 text-3xl p-1 rounded-md"
            aria-label="Close"
          >
            {/* simple X svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Title centered */}
          {title && (
            <h2
              id={ariaLabelledBy}
              className="text-3xl md:text-4xl font-jakarta font-extrabold text-hitam text-center mb-6"
            >
              {title}
            </h2>
          )}

          {/* Body: center aligned */}
          <div className="flex flex-col items-center justify-center text-center px-2 md:px-8">
            <div className="prose prose-sm max-w-none text-base md:text-lg">
              {children}
            </div>
          </div>

          {/* Footer: Yes / No — centered, style like login button */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 w-full justify-center">
              {/* Tidak button (secondary) */}
              <button
                type="button"
                onClick={onNo}
                className="min-w-[160px] w-full md:w-auto px-6 py-3 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition transform"
              >
                Tidak
              </button>

              {/* Ya button (primary) — gaya mirip tombol LOGIN */}
              <button
                type="button"
                onClick={onYes}
                className="min-w-[160px] w-full md:w-auto px-6 py-3 rounded-lg bg-hitam text-white font-jakarta font-semibold transform hover:scale-105 transition-transform duration-200"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
