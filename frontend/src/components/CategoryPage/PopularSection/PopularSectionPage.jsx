import React from "react";
import PopularContainer from "./PopularContainer";
import PopularList from "./PopularList";

export default function PopularSectionPage({ themeColor }) {
  return (
    <PopularContainer themeColor={themeColor}>
      <PopularList themeColor={themeColor}/>
    </PopularContainer>
  );
}
