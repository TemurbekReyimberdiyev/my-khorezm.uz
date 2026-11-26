import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';
import ImageLightbox from '../../components/common/ImageLightbox';
import Icon3D from '../../components/common/Icon3D';

const shahsContent = {
  uz: {
    heading: "Ma'muniylar oltin asri va Buyuk Xorazmshohlar imperiyasi (995–1231)",
    intro: "X asr oxirida Gurganch (Ko'hna Urganch) hukmdorlari Ma'muniylar sulolasi (995–1017) Xorazmni birlashtirib, 1004-yilda «Xorazm Ma'mun akademiyasi»ni barpo etdilar. XI asr oxirida esa Saljuqiylar noibi Anushtegin Garchoi (1077–1097) asos solgan Xorazmshohlar–Anushteginiylar sulolasi 154 yil hukmronlik qilib, XIII asr boshida islom olamidagi eng ulkan (~4,2 mln km²) saltanatni barpo etdi.",
    kpis: [
      { l: "Sulola hukmronligi", v: "1077–1231 (154 yil)" },
      { l: "Eng katta hududi", v: "~4,2 mln km²" },
      { l: "Ma'mun akademiyasi", v: "1004-yil, Gurganch" },
      { l: "Imperiya poytaxti", v: "Ko'hna Urganch" },
    ],
    cards: [
      { icon: 'book', bg: '#E8F5EE', color: '#319568', title: "Ma'mun akademiyasi (1004)", text: "Ma'mun ibn Ma'mun saroyida Abu Rayhon Beruniy, Abu Ali ibn Sino, Abu Nasr ibn Iroq va Abu Sahl Masihiy birgalikda astronomiya, matematika va tibbiyot bo'yicha olamshumul asarlar yaratdilar." },
      { icon: 'crown', bg: '#EBF3FA', color: '#15528B', title: "Otsiz, El-Arslon va Takash yuksalishi", text: "Alovuddin Otsiz (1127–1156) Xorazm mustaqilligi uchun kurashib Marv va Nishopurga yurish qildi. El-Arslon (1156–1172) va Alovuddin Takash (1172–1200) davrida Xuroson, Eron va Iroqi Ajam imperiya tarkibiga qo'shildi." },
      { icon: 'museum', bg: '#FFF3E0', color: '#C58B43', title: "Alovuddin Muhammad II va Gurganch", text: "Muhammad II (1200–1220) 1210-yilda Qoraxitoylarni yengib Movarounnahrni qo'lga kiritdi. Poytaxt Ko'hna Urganch Sharqning eng boy va gavjum shahri bo'lib, Qutlug' Temur minorasi va me'moriy obidalar bilan bezaldi." },
      { icon: 'swords', bg: '#FEF2F2', color: '#DC2626', title: "Mo'g'ul bosqini va Urganch mudofaasi (1219–1221)", text: "1219-yilda Chingizxon qo'shinlari saroydagi ichki nizolardan foydalanib bostirib kirdi. Ko'hna Urganch aholisi 1221-yilda yetti oy davomida qahramonona qarshilik ko'rsatdi; mo'g'ullar Amudaryo to'g'onini buzib shaharni suvga bostirdilar." },
      { icon: 'shield', bg: '#E8F5EE', color: '#319568', title: "Jaloliddin Manguberdi (1220–1231)", text: "So'nggi Xorazmshoh Jaloliddin Manguberdi Parvon jangida mo'g'ullarni mag'lub etib, Hind daryosi bo'yi, Eron va Ozarbayjonda 11 yil davomida Chingizxon imperiyasiga qarshi mardonavor kurash olib bordi." },
    ],
    rulersTitle: "Anushteginiylar sulolasining asosiy Xorazmshohlari",
    rulers: [
      { name: "Anushtegin Garchoi", years: "1077–1097", note: "Sulola asoschisi, Saljuqiylar noibi" },
      { name: "Qutbiddin Muhammad I", years: "1097–1127", note: "Xorazmshoh unvonini qayta tikladi" },
      { name: "Alovuddin Otsiz", years: "1127–1156", note: "Mustaqil siyosat va Marv yurishi (1141)" },
      { name: "Tojiddin El-Arslon", years: "1156–1172", note: "Xuroson va Dahistonning qo'shib olinishi" },
      { name: "Alovuddin Takash", years: "1172–1200", note: "Eron va Saljuqiylar ustidan g'alaba (1194)" },
      { name: "Alovuddin Muhammad II", years: "1200–1220", note: "Imperiya eng yirik hududga (~4,2 mln km²) yetdi" },
      { name: "Jaloliddin Manguberdi", years: "1220–1231", note: "Mo'g'ul bosqiniga qarshi 11 yillik kurash ramzi" },
    ],
    galleryTitle: "Ko'hna Urganch va Xorazmshohlar merosi",
    gallery: [
      { img: '/images/history/kutlug-timur.jpg', caption: "Ko'hna Urganchdagi Qutlug' Temur minorasi" },
      { img: '/images/history/turabek-khanum.jpg', caption: "To'rabek Xonim maqbarasi, Ko'hna Urganch" },
      { img: '/images/jaloliddin-monument.jpg', caption: "Jaloliddin Manguberdi haykali, Urganch" },
    ],
    source: "Manba: Vikipediya (Xorazmshohlar davlati, Xorazm viloyati) — Z. Bunyodov va K. E. Bosvort tadqiqotlari.",
  },
  ru: {
    heading: "Золотой век Мамунидов и Империя Хорезмшахов (995–1231)",
    intro: "В конце X века династия Мамунидов (995–1017) объединила Хорезм со столицей в Гургандже и основала в 1004 году знаменитую Академию Мамуна. С 1077 года наместник сельджуков Ануштегин Гарчаи заложил династию Ануштегинидов, правившую 154 года и создавшую к началу XIII века крупнейшую державу Востока площадью до 4,2 млн км².",
    kpis: [
      { l: "Правление династии", v: "1077–1231 (154 г.)" },
      { l: "Площадь империи", v: "~4,2 млн км²" },
      { l: "Академия Мамуна", v: "1004 г., Гургандж" },
      { l: "Столица державы", v: "Куня-Ургенч" },
    ],
    cards: [
      { icon: 'book', bg: '#E8F5EE', color: '#319568', title: "Академия Мамуна (1004)", text: "При дворе Хорезмшаха в Гургандже трудились аль-Беруни, Ибн Сина, Абу Наср ибн Ирак и Масихи, создавшие фундаментальные труды по математике, астрономии и медицине." },
      { icon: 'crown', bg: '#EBF3FA', color: '#15528B', title: "Атсыз, Иль-Арслан и Текеш", text: "Атсыз (1127–1156) заложил основы независимости, Иль-Арслан (1156–1172) расширил границы в Хорасан, а Текеш (1172–1200) в 1194 г. разгромил последних иракских сельджуков, удвоив территорию державы." },
      { icon: 'museum', bg: '#FFF3E0', color: '#C58B43', title: "Алауддин Мухаммад II и Гургандж", text: "В 1210 г. Мухаммад II отвоевал Мавераннахр у каракитаев. Столичный Гургандж (Куня-Ургенч) стал одним из богатейших городов исламского мира." },
      { icon: 'swords', bg: '#FEF2F2', color: '#DC2626', title: "Монгольское нашествие (1219–1221)", text: "В 1219 г. войска Чингисхана вторглись в ослабленную внутренними распрями державу. Жители Гурганджа героически оборонялись семь месяцев, пока монголы не разрушили плотину на Амударье." },
      { icon: 'shield', bg: '#E8F5EE', color: '#319568', title: "Джалаладдин Мангуберди (1220–1231)", text: "Последний Хорезмшах одержал победу над монголами при Парване и 11 лет продолжал сопротивление от берегов Инда до Кавказа и Азербайджана." },
    ],
    rulersTitle: "Главные Хорезмшахи династии Ануштегинидов",
    rulers: [
      { name: "Ануштегин Гарчаи", years: "1077–1097", note: "Основатель династии, наместник Хорезма" },
      { name: "Кутб ад-Дин Мухаммад I", years: "1097–1127", note: "Восстановил наследственный титул хорезмшаха" },
      { name: "Ала ад-Дин Атсыз", years: "1127–1156", note: "Курс на независимость и взятие Мерва (1141)" },
      { name: "Тадж ад-Дин Иль-Арслан", years: "1156–1172", note: "Присоединение Хорасана и Дехистана" },
      { name: "Ала ад-Дин Текеш", years: "1172–1200", note: "Разгром сельджуков (1194), включение Ирана" },
      { name: "Ала ад-Дин Мухаммад II", years: "1200–1220", note: "Империя на пике могущества (~4,2 млн км²)" },
      { name: "Джалаладдин Мангуберди", years: "1220–1231", note: "Символ 11-летнего сопротивления монголам" },
    ],
    galleryTitle: "Наследие Куня-Ургенча и Хорезмшахов",
    gallery: [
      { img: '/images/history/kutlug-timur.jpg', caption: "Минарет Кутлуг-Тимура в Куня-Ургенче" },
      { img: '/images/history/turabek-khanum.jpg', caption: "Мавзолей Тюрабек-ханым, Куня-Ургенч" },
      { img: '/images/jaloliddin-monument.jpg', caption: "Монумент Джалаладдину Мангуберди в Ургенче" },
    ],
    source: "Источник: Википедия (Государство Хорезмшахов, Хорезмская область) — труды З. Буниятова и К. Э. Босворта.",
  },
  en: {
    heading: "Mamunid Renaissance & the Anushteginid Khorezmshah Empire (995–1231)",
    intro: "In the late 10th century, the Mamunids (995–1017) united Khorezm in Gurganj and founded the celebrated Khorezm Mamun Academy (1004). Later, Seljuk commander Anushtegin Gharchai (1077–1097) established the Anushteginid Khorezmshah dynasty, which endured for 154 years and expanded into the Islamic world’s largest realm (~4.2 million km²) before the Mongol invasion.",
    kpis: [
      { l: "Dynasty Span", v: "1077–1231 (154 yrs)" },
      { l: "Peak Territory", v: "~4.2 million km²" },
      { l: "Mamun Academy", v: "1004, Gurganj" },
      { l: "Imperial Capital", v: "Old Urgench" },
    ],
    cards: [
      { icon: 'book', bg: '#E8F5EE', color: '#319568', title: "Academy of Mamun (1004)", text: "At the court of Gurganj, al-Biruni, Ibn Sina, and Abu Nasr ibn Iraq collaborated on astronomy, trigonometry, Earth’s curvature, and encyclopedic medicine." },
      { icon: 'crown', bg: '#EBF3FA', color: '#15528B', title: "Atsiz, Il-Arslan & Tekish", text: "Atsiz (1127–1156) asserted autonomy from the Seljuks; Il-Arslan pushed into Khorasan; and Ala al-Din Tekish (1172–1200) defeated Toghrul III in 1194, doubling the empire’s extent across Persia." },
      { icon: 'museum', bg: '#FFF3E0', color: '#C58B43', title: "Muhammad II & Splendid Gurganj", text: "Muhammad II (1200–1220) reclaimed Transoxiana from the Qara Khitai in 1210, turning Old Urgench into a legendary metropolis of scholarship and tiled domes." },
      { icon: 'swords', bg: '#FEF2F2', color: '#DC2626', title: "Mongol Siege (1219–1221)", text: "Exploiting court divisions, Genghis Khan invaded in 1219. Citizens defended Gurganj fiercely for seven months in 1221 until Mongol forces breached the Amu Darya dykes." },
      { icon: 'shield', bg: '#E8F5EE', color: '#319568', title: "Jalal al-Din Manguberdi (1220–1231)", text: "Victory at Parwan and an extraordinary 11-year campaign across the Indus basin, Iran, and Azerbaijan cemented Jalal al-Din’s fame as an undaunted warrior-king." },
    ],
    rulersTitle: "Key Rulers of the Anushteginid Dynasty",
    rulers: [
      { name: "Anushtegin Gharchai", years: "1077–1097", note: "Dynasty founder & Seljuk governor of Khwarazm" },
      { name: "Qutb al-Din Muhammad I", years: "1097–1127", note: "Restored hereditary Khorezmshah title" },
      { name: "Ala al-Din Atsiz", years: "1127–1156", note: "Pioneered independence; took Merv (1141)" },
      { name: "Taj al-Din Il-Arslan", years: "1156–1172", note: "Expanded control across Khorasan" },
      { name: "Ala al-Din Tekish", years: "1172–1200", note: "Defeated Western Seljuks (1194); annexed Persia" },
      { name: "Ala al-Din Muhammad II", years: "1200–1220", note: "Empire reached zenith (~4.2 million km²)" },
      { name: "Jalal al-Din Manguberdi", years: "1220–1231", note: "Led 11-year resistance against Mongol armies" },
    ],
    galleryTitle: "Monuments of Old Urgench & Khorezmshahs",
    gallery: [
      { img: '/images/history/kutlug-timur.jpg', caption: "Kutlug Timur Minaret in Old Urgench" },
      { img: '/images/history/turabek-khanum.jpg', caption: "Turabek Khanum Mausoleum, Old Urgench" },
      { img: '/images/jaloliddin-monument.jpg', caption: "Monument to Jaloliddin Manguberdi, Urgench" },
    ],
    source: "Source: Wikipedia (Khwarazmian Empire, Xorazmshohlar davlati) & C. E. Bosworth.",
  },
};

export default function KhorezmshahsPage() {
  const { language, t } = useLanguage();
  const h = t.pages.history;
  const content = shahsContent[language] || shahsContent.uz;
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  return (
    <>
      <Helmet>
        <title>{t.nav.khorezmshahs}</title>
      </Helmet>
      <PageHero
        title={h.shahsTitle}
        subtitle={h.shahsSubtitle}
        image="/images/jaloliddin-monument.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.history} > ${h.shahsTitle}`}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {content.kpis.map((k) => (
            <div key={k.l} className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
              <div className="font-bold text-[#15528B] text-base sm:text-lg">{k.v}</div>
              <div className="text-xs text-[#66758A] mt-0.5">{k.l}</div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
          <h2 className="font-bold text-[#17243B] text-xl mb-3">{content.heading}</h2>
          <p className="text-sm text-[#66758A] leading-relaxed">{content.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.cards.map((c) => (
            <div key={c.title} className="bg-white border border-[#E5EAF0] rounded-2xl p-5 hover:shadow-sm transition-shadow">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: c.bg }}>
                <Icon3D name={c.icon} alt={c.title} size={28} />
              </div>
              <h3 className="font-bold text-[#17243B] mb-2">{c.title}</h3>
              <p className="text-sm text-[#66758A] leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
          <h2 className="font-bold text-[#17243B] text-base mb-4">{content.rulersTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {content.rulers.map((r) => (
              <div key={r.name} className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0]">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-[#17243B]">{r.name}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EBF3FA] text-[#15528B] shrink-0">{r.years}</span>
                </div>
                <p className="text-xs text-[#66758A] mt-1.5">{r.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-[#17243B] text-base mb-3">{content.galleryTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.gallery.map((g, idx) => (
              <button
                key={g.caption}
                type="button"
                onClick={() => setLightboxIdx(idx)}
                className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden text-left group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img src={g.img} alt={g.caption} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={14} />
                  </span>
                </div>
                <div className="p-3 text-xs font-medium text-[#17243B]">{g.caption}</div>
              </button>
            ))}
          </div>
          <ImageLightbox
            items={content.gallery.map((g) => ({ src: g.img, title: g.caption }))}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(-1)}
            onChange={setLightboxIdx}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E5EAF0]">
          <p className="text-xs text-[#66758A]">{content.source}</p>
          <div className="flex gap-3">
            <Link to="/tarix/qadimgi-xorazm" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66758A] hover:text-[#15528B]">
              <ArrowLeft size={14} /> {h.ancientTitle}
            </Link>
            <Link to="/tarix/xiva-xonligi" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] hover:underline">
              {h.khanateTitle} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
