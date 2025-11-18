import React from "react";
import WhiteBox from "./WhiteBox";

export default function ChoiceList({ trendingList = [], category }) {
  const itemsForMobile = trendingList.slice(0, 3);
  const itemsForDesktop = trendingList.slice(0, 3);

  return (
    <div className="w-full flex flex-col items-center md:flex-row md:justify-center gap-6">
      {/* MOBILE */}
      <div className="md:hidden flex flex-col items-center gap-7">
        {itemsForMobile[0] ? (
          <WhiteBox
            isPhone={true}
            title={itemsForMobile[0].title}
            author={itemsForMobile[0].authorName}
            href={`/sajak/${category}/${itemsForMobile[0]._id}`}
          />
        ) : (
          <WhiteBox isPhone={true} title="—" author="—" />
        )}

        <div className="flex flex-row justify-center gap-12">
          {[1, 2].map((i) => {
            const it = itemsForMobile[i];
            return it ? (
              <WhiteBox
                key={it._id}
                isPhone={true}
                title={it.title}
                author={it.authorName}
                href={`/sajak/${category}/${it._id}`}
              />
            ) : (
              <WhiteBox key={`ph-${i}`} isPhone={true} title="—" author="—" />
            );
          })}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex flex-row gap-20">
        {Array.from({ length: 3 }).map((_, idx) => {
          const it = itemsForDesktop[idx];
          return it ? (
            <WhiteBox
              key={it._id}
              isPhone={false}
              title={it.title}
              author={it.authorName}
              href={`/sajak/${category}/${it._id}`}
            />
          ) : (
            <WhiteBox key={`ph-${idx}`} isPhone={false} title="—" author="—" />
          );
        })}
      </div>
    </div>
  );
}
