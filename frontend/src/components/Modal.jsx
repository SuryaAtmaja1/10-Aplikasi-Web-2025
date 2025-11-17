"use client";

import React, { useEffect } from "react";

export default function Modal({ isOpen, title, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 shadow-2xl w-full max-w-sm">
        <h2 className="text-xl font-jakarta font-bold text-black mb-4">
          {title}
        </h2>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-2 text-cerise border border-cerise font-jakarta font-semibold rounded-lg hover:bg-gray-100 transition duration-150"
          >
            Tidak
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-2 bg-hijau text-white font-jakarta font-semibold rounded-lg hover:bg-[#076B3D] transition duration-150"
          >
            Iya
          </button>
        </div>
      </div>
    </div>
  );
}
