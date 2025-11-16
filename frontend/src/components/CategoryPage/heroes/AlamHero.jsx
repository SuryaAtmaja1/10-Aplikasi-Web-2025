import React from "react";
import Image from "next/image";
import BgAlam from "../../../../public/assets/category-sajak/bg-alam-colored.png"
import BungaLamp from "../../../../public/assets/category-sajak/bunga_lamp.png"
import Muncak from "../../../../public/assets/category-sajak/muncak.png"
import IkanBiru from "../../../../public/assets/category-sajak/ikan_biru.png"

export const AlamHero = () => {
  return <div className="relative w-full h-[400px] md:h-[89vh] overflow-hidden bg-amber-100 border-b">
    {/* gambar" */}
    <div className="absolute bottom-0 ml-[30vw] mb-9 md:mb-10 flex flex-row gap-2.5 md:gap-7">
      <Image
        src={BgAlam}
        className="w-[44.583vw]"
        width={856}
        height={571}
        alt="BgAlam"
      />
      <Image
        src={Muncak}
        className="absolute w-[17.808vw] ml-[21.3vw] -translate-y-[77%]"
        width={342}
        height={257}
        alt="Muncak"
      />
      <p className="font-playfair text-sm origin-top-left scale-25 md:scale-50 lg:scale-75 xl:scale-100">words [eb] dtrytfuygihoijhuvyi <br/>these arw words<br/>blablablablablabla<br/>gaboleh kata kasar ya kawan</p>
    </div>
    <div className="absolute bottom-0 -translate-y-[67%] ml-[22.5vw] mb-10 flex flex-row gap-2.5 md:gap-7">
      <Image
        src={BungaLamp}
        className="w-[14.843vw]"
        width={285}
        height={516}
        alt="BungaLamp"
      />
      <p className="font-playfair text-sm text-hijau origin-top-left scale-25 md:scale-50 lg:scale-75 xl:scale-100">words [eb] dtrytfuygihoijhuvyi <br/>these arw words<br/>blablablablablabla<br/>gaboleh kata kasar ya kawan</p>
    </div>
    <Image
      src={IkanBiru}
      className="absolute w-[64vw] -translate-x-[67.45%] lg:-translate-y-11 transform transition duration-500 origin-top-right hover:-rotate-3 active:-rotate-60"
      width={1241}
      height={386}
      alt="IkanBiruL"
    />
    <div className="group">
      <Image
        src={IkanBiru}
        className="absolute w-[64vw] bottom-0 right-0 lg:mb-20 translate-x-[72.58%] transform transition duration-500 group-hover:translate-x-[70%] group-active:translate-x-[110%]"
        width={1241}
        height={386}
        alt="IkanBiruL"
      />
      <Image
        src={IkanBiru}
        className="absolute w-[64vw] bottom-0 right-0 lg:mb-20 translate-x-[200%] -scale-x-100 transform transition duration-700 ease-in-out group-active:translate-x-[80%]"
        width={1241}
        height={386}
        alt="IkanBiruLs"
      />
    </div>
    {/* teks */}
    <h2 className="absolute bottom-0 mb-3 md:mb-20 ml-5 md:ml-20 font-jakarta text-hijau text-[0.8rem] md:text-xl lg:text-4xl">xxxx SAJAK<br/>xxx PENULIS</h2>
    <h1 className="absolute right-0 mt-7 mr-5 md:mr-20 font-instrument text-hijau text-9xl">alam.</h1>
  </div>;
};
