import React from "react";
import { LatestContainer } from "./LatestContainer";
import LatestList from "./LatestList";

export default function LatestSectionPage({
  themeColor,
  alterColor,
  sajakList,
}) {
  return (
    <LatestContainer
      themeColor={themeColor}
      alterColor={alterColor}
      sajakList={sajakList}
    >
      <LatestList sajakList={sajakList} />
    </LatestContainer>
  );
}
