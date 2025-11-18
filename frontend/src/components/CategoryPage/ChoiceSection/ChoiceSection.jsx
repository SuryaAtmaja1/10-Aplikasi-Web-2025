// file: components/CategoryPage/ChoiceSection/ChoiceSection.jsx
import React from "react";
import ChoiceContainer from "./ChoiceContainer";
import ChoiceList from "./ChoiceList";

export default function ChoiceSection({
  themeColor,
  alterColor,
  backgroundImage,
  trendingList,
  category,
}) {
  return (
    <ChoiceContainer
      themeColor={themeColor}
      alterColor={alterColor}
      backgroundImage={backgroundImage}
    >
      <ChoiceList trendingList={trendingList} category={category} />
    </ChoiceContainer>
  );
}
