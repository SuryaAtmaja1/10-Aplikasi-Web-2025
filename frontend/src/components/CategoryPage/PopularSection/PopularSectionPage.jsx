import React from "react";
import PopularContainer from "./PopularContainer";
import PopularList from "./PopularList";

export default function PopularSectionPage({
  themeColor,
  trendingList = [],
  loadingTrending = false,
}) {
  return (
    <PopularContainer themeColor={themeColor}>
      <PopularList
        themeColor={themeColor}
        trendingList={trendingList}
        loadingTrending={loadingTrending}
      />
    </PopularContainer>
  );
}
