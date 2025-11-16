import React from "react";
import ChoiceContainer from "./ChoiceContainer";
import ChoiceList from "./ChoiceList";

export default function ChoiceSection({
  themeColor,
  alterColor,
  backgroundImage,
}) {
  return (
    <ChoiceContainer
      themeColor={themeColor}
      alterColor={alterColor}
      backgroundImage={backgroundImage}
    >
      <ChoiceList />
    </ChoiceContainer>
  );
}
