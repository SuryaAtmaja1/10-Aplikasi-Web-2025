import React from "react";
import Image from "next/image";
import BoxSajak from "@/components/CategoryPage/BoxSajak"; 

// data dummy
const Sajak = [
  {
    id: 1,
    title: "AKu raja koe rimba",
    author: "NIno Cici EXPLAne",
    createdAt: "2025-09-24T06:34:51.911+00:00",
    content:
      "Dunia di ambang resesi. Sejumlah pengamat ekonomi, Bank Dunia, maupun Dana Moneter Internasional (IMF) telah melihat potensi ke arah itu. Indikatornya, kata mereka, antara lain semakin melambatnya perekonomian di sejumlah negara maju, seperti Amerika Serikat, sebagian wilayah Eropa, dan Tiongkok. Selain itu, inflasi yang bergerak cepat di sejumlah negara juga berpotensi memperparah krisis. Direktur Pelaksana IMF Kristalina Georgieva menyebut roda perekonomian di wilayah Eropa melambat karena harga gas alam melonjak sebagai dampak konflik Rusia-Ukraina. Sementara itu, perlambatan ekonomi Tiongkok terjadi akibat kebijakan zero COVID policy dan volatilitas (melonjaknya harga) di sektor properti. IMF memprediksi sekitar sepertiga dari ekonomi dunia akan mengalami kontraksi setidaknya dua kuartal berturut-turut tahun ini dan tahun depan. Itu artinya, resesi global membayang di depan mata. Dunia pun menghadapi era kegelapan ekonomi.Pada The 1st Joint Finance and Agriculture Ministers Meeting di Washington DC, Amerika Serikat, Selasa (11/10) malam waktu setempat atau Rabu WIB, Menteri Keuangan Sri Mulyani juga menyampaikan hal yang kurang lebih senada. Dia menyebut krisis pangan akan menghampiri dunia dalam kurun waktu 8–12 bulan ke depan. Kondisi itu, kata dia, diperparah dengan ketersediaan pasokan pupuk sebagai dampak konflik Rusia-Ukraina. Dalam menyikapi hal tersebut, Presiden Jokowi memerintahkan Lembaga Ketahanan Nasional (Lemhannas) untuk membuat kajian yang cepat tentang antisipasi yang dapat dilakukan pemerintah dalam melakukan mitigasi krisis energi, pangan, dan keuangan, baik makro maupun mikro. Gubernur Lemhannas Andi Widjajanto dalam kanal Youtube Sekretariat Presiden, kemarin, mengatakan Presiden mendorong lembaganya untuk fokus melakukan kajian dalam lima hal, yaitu konsolidasi demokrasi, transformasi digital, ekonomi hijau, ekonomi biru, dan Ibu Kota Negara (IKN). Titah Presiden ini tentu harus dilaksanakan sungguh-sungguh. Pemerintah memang harus punya cetak biru untuk mengantisipasi krisis, sehingga dapat mengambil sejumlah langkah yang tepat. Berbeda halnya ketika pandemi COVID-19, di saat seluruh negara tidak siap, kali ini sejumlah lembaga internasional maupun para pakar telah memberi warning tentang ancaman resesi global. Peringatan ini tentu harus ditindaklanjuti dengan menyiapkan sejumlah langkah strategis yang melibatkan sejumlah instansi/lembaga terkait. Selain membuat kajian untuk memitigasi risiko di tengah ketidakpastian ini, langkah lain yang diperlukan ialah meningkatkan kolaborasi, baik di tingkat nasional maupun global. Seperti halnya saat pandemi, tidak ada satu pun negara yang bisa menghindar dari situasi sulit itu. Apalagi di era inflasi dan suku bunga tinggi seperti sekarang ini, tentu dibutuhkan adanya kerja sama di antara negara-negara di dunia. Sikap egois akan membuyarkan semua upaya keluar dari kondisi yang oleh para pengamat disebut sebagai perfect long storm (badai panjang yang sempurna). Di dalam negeri, seluruh elemen bangsa juga harus merapatkan barisan. Apalagi antarinstansi pemerintah. Tidak boleh ada ego sektoral, baik di antara kementerian/lembaga maupun pemerintah daerah. Tiap-tiap kepala daerah harus mampu membangun situasi sosial dan politik yang kondusif untuk menjaga stabilitas ekonomi, terutama dengan menekan laju inflasi, menjaga pasokan dan ketersediaan pasokan pangan maupun energi. Selain menjaga stabilitas, langkah lain yang diperlukan ialah berhemat. Kementerian/lembaga maupun pemerintah daerah harus mengencangkan ikat pinggang. Kurangi anggaran untuk proyek-proyek yang tidak perlu. Lebih baik dana itu disimpan untuk membantu masyarakat bila krisis betul-betul terjadi. Sejauh ini, Indonesia memang belum terdampak krisis. Direktur Pelaksana IMF bahkan mengapresiasi Indonesia yang bisa meraih pertumbuhan ekonomi tinggi di tengah kondisi dunia yang berat. Indonesia, kata dia, ibarat titik terang di tengah kondisi ekonomi global yang memburuk. Namun, pujian ini jangan membuat kita lengah dan terlena. Kewaspadaan dan kehati-hatian perlu agar kita tidak terombang-ambing dan tenggelam dalam badai.",
    image:
      "https://drive.google.com/uc?export=view&id=1d8k1liGU-QGf2VpumqPcsQsVdoObboYi",
    likes: 4,
    commentCount: 123,
  },
  {
    id: 2,
    title: "Keingian main Emel",
    author: "Syahrul Badang Roam",
    createdAt: "2025-09-24T06:34:51.911+00:00",
    content:
      "Dunia di ambang resesi. Sejumlah pengamat ekonomi, Bank Dunia, maupun Dana Moneter Internasional (IMF) telah melihat potensi ke arah itu. Indikatornya, kata mereka, antara lain semakin melambatnya perekonomian di sejumlah negara maju, seperti Amerika Serikat, sebagian wilayah Eropa, dan Tiongkok. Selain itu, inflasi yang bergerak cepat di sejumlah negara juga berpotensi memperparah krisis. Direktur Pelaksana IMF Kristalina Georgieva menyebut roda perekonomian di wilayah Eropa melambat karena harga gas alam melonjak sebagai dampak konflik Rusia-Ukraina. Sementara itu, perlambatan ekonomi Tiongkok terjadi akibat kebijakan zero COVID policy dan volatilitas (melonjaknya harga) di sektor properti. IMF memprediksi sekitar sepertiga dari ekonomi dunia akan mengalami kontraksi setidaknya dua kuartal berturut-turut tahun ini dan tahun depan. Itu artinya, resesi global membayang di depan mata. Dunia pun menghadapi era kegelapan ekonomi.Pada The 1st Joint Finance and Agriculture Ministers Meeting di Washington DC, Amerika Serikat, Selasa (11/10) malam waktu setempat atau Rabu WIB, Menteri Keuangan Sri Mulyani juga menyampaikan hal yang kurang lebih senada. Dia menyebut krisis pangan akan menghampiri dunia dalam kurun waktu 8–12 bulan ke depan. Kondisi itu, kata dia, diperparah dengan ketersediaan pasokan pupuk sebagai dampak konflik Rusia-Ukraina. Dalam menyikapi hal tersebut, Presiden Jokowi memerintahkan Lembaga Ketahanan Nasional (Lemhannas) untuk membuat kajian yang cepat tentang antisipasi yang dapat dilakukan pemerintah dalam melakukan mitigasi krisis energi, pangan, dan keuangan, baik makro maupun mikro. Gubernur Lemhannas Andi Widjajanto dalam kanal Youtube Sekretariat Presiden, kemarin, mengatakan Presiden mendorong lembaganya untuk fokus melakukan kajian dalam lima hal, yaitu konsolidasi demokrasi, transformasi digital, ekonomi hijau, ekonomi biru, dan Ibu Kota Negara (IKN). Titah Presiden ini tentu harus dilaksanakan sungguh-sungguh. Pemerintah memang harus punya cetak biru untuk mengantisipasi krisis, sehingga dapat mengambil sejumlah langkah yang tepat. Berbeda halnya ketika pandemi COVID-19, di saat seluruh negara tidak siap, kali ini sejumlah lembaga internasional maupun para pakar telah memberi warning tentang ancaman resesi global. Peringatan ini tentu harus ditindaklanjuti dengan menyiapkan sejumlah langkah strategis yang melibatkan sejumlah instansi/lembaga terkait. Selain membuat kajian untuk memitigasi risiko di tengah ketidakpastian ini, langkah lain yang diperlukan ialah meningkatkan kolaborasi, baik di tingkat nasional maupun global. Seperti halnya saat pandemi, tidak ada satu pun negara yang bisa menghindar dari situasi sulit itu. Apalagi di era inflasi dan suku bunga tinggi seperti sekarang ini, tentu dibutuhkan adanya kerja sama di antara negara-negara di dunia. Sikap egois akan membuyarkan semua upaya keluar dari kondisi yang oleh para pengamat disebut sebagai perfect long storm (badai panjang yang sempurna). Di dalam negeri, seluruh elemen bangsa juga harus merapatkan barisan. Apalagi antarinstansi pemerintah. Tidak boleh ada ego sektoral, baik di antara kementerian/lembaga maupun pemerintah daerah. Tiap-tiap kepala daerah harus mampu membangun situasi sosial dan politik yang kondusif untuk menjaga stabilitas ekonomi, terutama dengan menekan laju inflasi, menjaga pasokan dan ketersediaan pasokan pangan maupun energi. Selain menjaga stabilitas, langkah lain yang diperlukan ialah berhemat. Kementerian/lembaga maupun pemerintah daerah harus mengencangkan ikat pinggang. Kurangi anggaran untuk proyek-proyek yang tidak perlu. Lebih baik dana itu disimpan untuk membantu masyarakat bila krisis betul-betul terjadi. Sejauh ini, Indonesia memang belum terdampak krisis. Direktur Pelaksana IMF bahkan mengapresiasi Indonesia yang bisa meraih pertumbuhan ekonomi tinggi di tengah kondisi dunia yang berat. Indonesia, kata dia, ibarat titik terang di tengah kondisi ekonomi global yang memburuk. Namun, pujian ini jangan membuat kita lengah dan terlena. Kewaspadaan dan kehati-hatian perlu agar kita tidak terombang-ambing dan tenggelam dalam badai.",
    image:
      "https://drive.google.com/uc?export=view&id=1d8k1liGU-QGf2VpumqPcsQsVdoObboYi",
    likes: 4,
    commentCount: 123,
  },
  {
    id: 3,
    title: "AKu raja koe rimba",
    author: "NIno Cici EXPLAne",
    createdAt: "2025-09-24T06:34:51.911+00:00",
    content:
      "loremdnwaoia aidjawfjnaw dnawf aw nawdnjand sa andnwjdna ajnwdwadn askd nawjd akdpoawd daiwnakld aidwnawnd iawndklanwd iawnwdkamw opawjdanfekna ipepagaenjnad ",
    image: "",
    likes: 4,
    commentCount: 123,
  },
  {
    id: 4,
    title: "AKu raja koe rimba",
    author: "NIno Cici EXPLAne",
    createdAt: "2025-09-24T06:34:51.911+00:00",
    content:
      "loremdnwaoia aidjawfjnaw dnawf aw nawdnjand sa andnwjdna ajnwdwadn askd nawjd akdpoawd daiwnakld aidwnawnd iawndklanwd iawnwdkamw opawjdanfekna ipepagaenjnad ",
    likes: 4,
    commentCount: 123,
  },
  {
    id: 5,
    title: "AKu raja koe rimba",
    author: "NIno Cici EXPLAne",
    createdAt: "2025-09-24T06:34:51.911+00:00",
    content:
      "loremdnwaoia aidjawfjnaw dnawf aw nawdnjand sa andnwjdna ajnwdwadn askd nawjd akdpoawd daiwnakld aidwnawnd iawndklanwd iawnwdkamw opawjdanfekna ipepagaenjnad ",
    likes: 4,
    commentCount: 123,
  },
  {
    id: 6,
    title: "AKu raja koe rimba",
    author: "NIno Cici EXPLAne",
    createdAt: "2025-09-24T06:34:51.911+00:00",
    content:
      "loremdnwaoia aidjawfjnaw dnawf aw nawdnjand sa andnwjdna ajnwdwadn askd nawjd akdpoawd daiwnakld aidwnawnd iawndklanwd iawnwdkamw opawjdanfekna ipepagaenjnad ",
    likes: 4,
    commentCount: 123,
  },
];


export default function SajakPage() {
  return (
        <main className="w-[88.889vw] md:w-[75.833vw] mx-auto pt-8 pb-20">
                <div className="relative w-full mb-8 md:mb-12">
                    {/* garis kuning atas */}
                    <div className="absolute h-[10px] md:h-[16px] bg-[#F9D949] left-[0.5%] w-[85%] top-[31%] md:top-[30%] z-0 opacity-70">

                    </div>
                    
                    {/* garis kuning bawah */}
                    <div className="absolute h-[10px] md:h-[16px] bg-[#F9D949] right-0 w-[48%] md:w-[69%] top-[83%] md:top-[82%] z-0 opacity-70">

                    </div>
                    
                    <div className="relative z-10 grid grid-cols-2 gap-x-4 md:gap-x-8 items-center">
                        {/* baris 1 kiri - enjoy reading */}
                        <div className="text-left">
                            <h1 className="text-4xl md:text-7xl font-jakarta font-extrabold text-oren">
                                Enjoy Reading
                            </h1>
                        </div>

                        {/* baris 1 kanan - gambar org */}
                        <div className="w-full flex justify-end my-4 md:my-0 relative top-2 md:top-0">
                            <Image
                                src="/people.svg"
                                alt="enjoy reading"
                                width={100} height={50}
                                className="md:w-[250px] md:h-[125px] relative bottom-2 right-20 md:right-40"
                            />
                        </div>

                        <div className="col-span-2 grid grid-cols-2 md:grid-cols-10 gap-x-4 md:gap-x-8 items-center mt-2">
                          {/* baris 2 kiri - search bar */}
                          <div className="relative w-full max-w-lg md:mx-0 md:col-span-3">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ABABAB] z-10">
                                  <Image
                                      src="/search-icon.svg"
                                      alt="search"
                                      width={20}
                                      height={20}
                                  />
                              </span>

                              <input
                                  type="search"
                                  placeholder="Search here"
                                  className="relative w-full pl-12 pr-4 py-3 font-jakarta border border-[#B5B5B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                              />
                          </div>

                          {/* baris 2 kanan - our sajak */}
                          <div className="text-left md:col-span-7">
                              <h2 className="text-4xl md:text-7xl font-jakarta font-extrabold text-oren">
                                  Our Sajak.
                              </h2>
                          </div>
                        </div>
                        
                    </div>
                </div>

                {/* daftar sajak */}
                <div className="flex flex-col gap-6">
                    {Sajak.length === 0 ? (
                        <div className="text-center text-black">
                            Tidak ada sajak untuk ditampilkan.
                        </div>
                    ): (
                        Sajak.map((item) => (
                            <BoxSajak key={item.id} sajak={item}/>
                        ))
                    )}
                </div>
        </main>
    );
}