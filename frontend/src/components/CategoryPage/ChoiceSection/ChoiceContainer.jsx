import React from "react";
import CategoryButton from "../CategoryButton";

export default function ChoiceContainer({
  children,
  themeColor = "#001F3D",
  alterColor,
  backgroundImage,
}) {
  return (
    <section
      style={{
        "--themeColor": themeColor,
        backgroundImage: backgroundImage
          ? `url(/assets/category-sajak/${backgroundImage})`
          : undefined,
      }}
      className={`
        relative overflow-hidden
        bg-(--themeColor) 
        bg-center bg-repeat md:bg-cover md:bg-no-repeat
        p-7 NaroHasBeenHere gap-8 md:gap-14 lg:gap-24
      `}
    >
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-1/3"
        style={{ backgroundColor: "var(--themeColor)" }}
      />
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-1/3"
        style={{ backgroundColor: "var(--themeColor)" }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-col gap-8 md:gap-14 lg:gap-24">
          <h1 className="text-putih text-4xl md:text-6xl lg:text-8xl font-medium">
            Pilihan <span className="font-instrument">Kami</span>
          </h1>

          <div>{children}</div>

          <CategoryButton isResponsive={false} alterColor={alterColor} />
        </div>
      </div>
    </section>
  );
}
