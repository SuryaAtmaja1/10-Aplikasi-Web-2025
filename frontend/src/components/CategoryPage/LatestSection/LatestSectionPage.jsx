import React from "react";
import { LatestContainer } from "./LatestContainer";
import LatestList from "./LatestList";

export default function LatestSectionPage({ themeColor }) {
  return (
    <LatestContainer themeColor={themeColor}>
      <LatestList />
    </LatestContainer>
  );
}
