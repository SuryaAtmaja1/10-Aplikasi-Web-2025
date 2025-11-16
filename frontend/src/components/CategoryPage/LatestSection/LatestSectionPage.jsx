import React from "react";
import { LatestContainer } from "./LatestContainer";
import LatestList from "./LatestList";

export default function LatestSectionPage({ themeColor, alterColor }) {
  return (
    <LatestContainer themeColor={themeColor} alterColor={alterColor}>
      <LatestList />
    </LatestContainer>
  );
}
