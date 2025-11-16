import React from "react";
import WhiteBox from "./WhiteBox";

export default function ChoiceList() {
  return (
    <div className="w-full flex flex-col items-center md:flex-row md:justify-center gap-6">
      <div className="md:hidden flex flex-col items-center gap-7">
        <WhiteBox isPhone={true} />
        <div className="flex flex-row justify-center gap-12">
          <WhiteBox isPhone={true} />
          <WhiteBox isPhone={true} />
        </div>
      </div>
      <div className="hidden md:flex flex-row gap-20">
        <WhiteBox isPhone={false} />
        <WhiteBox isPhone={false} />
        <WhiteBox isPhone={false} />
      </div>
    </div>
  );
}
