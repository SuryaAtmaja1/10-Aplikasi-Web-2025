"use client";

import React from "react";
import Link from "next/link";
import GDriveImage from "@/components/GDriveImage";
import extractDriveId from "@/components/extractDriverId";
import { FiMapPin } from "react-icons/fi";

export default function ProfileHeader({ user, formatJoinDate }) {

  if (!user) return null;

  return (
    <div className="border flex justify-center p-8 border-hitam rounded-xl m-6 mt-12">
      <div className="w-full flex items-center justify-between flex-col md:flex-row gap-4">
        <div className="flex flex-1 gap-4">
          <div className="flex flex-row md:flex-col gap-4 md:gap-0 items-center md:items-start shrink-0">
            {user.profilePhoto ? (
              <GDriveImage
                fileId={extractDriveId(user.profilePhoto)}
                alt={user.username}
                className="w-16 h-16 md:w-32 md:h-32 rounded-full object-cover bg-[#363231]"
              />
            ) : (
              <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-[#363231] flex items-center justify-center">
                <svg
                  className="w-10 h-10 md:w-16 md:h-16 text-[#FFF9F4]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0A7 7 0 013 16z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            <div className="md:hidden flex flex-col justify-evenly flex-1">
              <h2 className=" text-[16px]  font-bold text-[#363231] mb-1">
                {user.name || user.username}
              </h2>
              <p className="text-[14px] text-[#363231] mb-2">
                {user.email}
              </p>
              <div className="flex items-center gap-2 text-[#363231] text-[14px]">
                <FiMapPin className="w-4 h-4" />
                <span>{user.address || "Alamat belum diatur"}</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#363231] mb-2">
              {user.name || user.username}
            </h2>
            <p className="text-lg text-[#363231] mb-3">{user.email}</p>
            <div className="flex items-center gap-2 text-[#363231] mb-6">
              <FiMapPin className="w-5 h-5" />
              <span>{user.address || "Alamat belum diatur"}</span>
            </div>
          </div>
        </div>

        <div className="h-full hidden md:block w-px bg-hitam"></div>

        <div className="h-44 flex-1 flex flex-col gap-3 justify-between py-4">
          <div className="flex-1">
            <p className="text-[#363231] text-[14px] md:text-base  font-jakarta">
              {user.bio || "Bio belum diatur"}
            </p>
            <p className="text-[#363231] text-[14px] md:text-base font-jakarta">
              Bergabung: {formatJoinDate(user.createdAt)}
            </p>
          </div>
          <Link href="/profile/edit">
            <button className="bg-oren flex-none hover:bg-[#E86A1A] text-white font-bold py-2.5 px-5 rounded-lg transition-colors font-jakarta text-base w-full md:w-auto">
              Edit Profil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
