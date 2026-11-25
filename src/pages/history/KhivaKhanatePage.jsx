import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Landmark, Castle, ScrollText, Flag, Crown, ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';
import ImageLightbox from '../../components/common/ImageLightbox';

const khanateContent = {
  uz: {
    heading: "Xiva xonligi tarixi (1511–1920)",
    intro: "Xiva xonligi (Xorazm xonligi) — Markaziy Osiyodagi uch o'zbek xonliklaridan biri bo'lib, 1511-yilda Elbarsxon boshchiligida Safaviylar quvib chiqarilgach Vazir shahrida tashkil topgan. Poytaxti dastlab Vazir va Ko'hna Urganch, XVI asrning 70-yillarida Amudaryo o'zani o'zgargandan so'ng esa Xiva shahri bo'lgan. 1804-yildan xonlikni o'zbek Qo'ng'irotlar sulolasi boshqardi.",
    kpis: [
      { l: "Davlat mavjudligi", v: "1511–1920 (409 yil)" },
      { l: "Sulolalar", v: "Arabshohiylar va Qo'ng'irotlar" },
      { l: "Poytaxtlar", v: "Vazir → Urganch → Xiva" },
      { l: "Gandimiyon bitimi", v: "1873-yil 12-avgust" },
    ],
    cards: [
      { icon: Crown, bg: '#FFF3E0', color: '#C58B43', title: "Shayboniy–Arabshohiylar davri (1511–1804)", text: "Elbarsxon (1511–1516) asos solgan sulolada Abulg'oziy Bahodirxon (1643–1663) alohida o'rin tutadi: u 1643-yilda Toza Urganchga (hozirgi Urganch) asos solib, «Shajarayi turk» asarini yozdi; o'g'li Anushaxon esa Shovot kanalini qazdirdi." },
      { icon: Castle, bg: '#EBF3FA', color: '#15528B', title: "Qo'ng'irotlar sulolasi va Ichan-Qal'a (1763/1804–1920)", text: "Muhammad Amin Inoq va Eltuzarxon (1804) Qo'ng'irotlar hokimiyatini mustahkamladi. Muhammad Rahimxon I (1806–1825) va Olloqulixon (1825–1842) davrida Toshhovli saroyi, karvonsaroy va o'nlab madrasalar bunyod etildi." },
      { icon: ScrollText, bg: '#E8F5EE', color: '#319568', title: "1873-yil Gandimiyon shartnomasi va Feruz", text: "Muhammad Rahimxon II — Feruz (1864–1910) davrida Markaziy Osiyoda ilk toshbosma nashriyot, Xorazm maqomlari va Munis–Ogahiy tarix maktabi yuksaldi. 1873-yilgi Gandimiyon shartnomasidan keyin xonlik Rossiya imperiyasi protektoratiga aylandi." },
      { icon: Flag, bg: '#F3EEFF', color: '#7C3AED', title: "Islomxo'ja islohotlari va xonlik tugatilishi (1910–1920)", text: "Bosh vazir Islomxo'ja 1910–1913-yillarda yangi maktab, shifoxona va pochta-telegraf qurdirdi. 1918–1920-yillarda so'nggi xon Said Abdullaxon davrida siyosiy inqiroz kuchayib, 1920-yil 2-fevralda xonlik tugatildi." },
    ],
    rulersTitle: "Xiva xonligining eng mashhur hukmdorlari",
    rulers: [
      { name: "Elbarsxon", years: "1511–1516", note: "Xiva (Xorazm) xonligi asoschisi" },
      { name: "Abulg'oziy Bahodirxon", years: "1643–1663", note: "Tarixchi olim, Yangi Urganch asoschisi (1643)" },
      { name: "Sherg'ozixon", years: "1714–1728", note: "1717-yilda Bekovich ekspeditsiyasini qaytargan" },
      { name: "Eltuzarxon", years: "1804–1806", note: "Qo'ng'irotlar sulolasining birinchi xoni" },
      { name: "Muhammad Rahimxon I", years: "1806–1825", note: "Xonlik hududini birlashtirgan islohotchi" },
      { name: "Olloqulixon", years: "1825–1842", note: "Toshhovli saroyi va madrasa bunyodkori" },
      { name: "Muhammad Rahimxon II (Feruz)", years: "1864–1910", note: "Shoir, musiqashunos va matbaachilik homiysi" },
      { name: "Said Abdullaxon", years: "1918–1920", note: "So'nggi xon; 1920-yil 2-fevralda taxtdan tushgan" },
    ],
    galleryTitle: "Xiva xonligi me'moriy durdonalari",
    gallery: [
      { img: '/images/khiva-hero.jpg', caption: "Ichan-Qal'a me'moriy majmuasi" },
      { img: '/images/toshhovli.jpg', caption: "Toshhovli saroyi (Olloqulixon, XIX asr)" },
      { img: '/images/kunya-ark.jpg', caption: "Ko'hna Ark qo'rg'oni" },
      { img: '/images/nurullaboy.jpg', caption: "Nurullaboy saroyi (XX asr boshi)" },
    ],
    source: "Manba: Vikipediya (Xiva xonligi, Xorazm viloyati) va Ichan-Qal'a muzey-qo'riqxonasi ma'lumotlari.",
  },
  ru: {
    heading: "История Хивинского ханства (1511–1920)",
    intro: "Хивинское (Хорезмское) ханство — одно из трёх узбекских ханств Центральной Азии, образованное в 1511 году во главе с Ильбарс-ханом со столицей сначала в Вазире и Куня-Ургенче, а с конца XVI века — в Хиве. С 1804 года страной правила узбекская династия Кунгратов.",
    kpis: [
      { l: "Период истории", v: "1511–1920 (409 лет)" },
      { l: "Династии", v: "Арабшахиды и Кунграты" },
      { l: "Столицы", v: "Вазир → Ургенч → Хива" },
      { l: "Гандимиянский договор", v: "12 августа 1873 г." },
    ],
    cards: [
      { icon: Crown, bg: '#FFF3E0', color: '#C58B43', title: "Династия Шейбанидов–Арабшахидов (1511–1804)", text: "При Абульгази Бахадурхане (1643–1663) в 1643 г. был основан Новый Ургенч и написан труд «Родословная тюрков», при Ануша-хане прорыт канал Шават, а при Шергази-хане (1717) отбита экспедиция Бековича-Черкасского." },
      { icon: Castle, bg: '#EBF3FA', color: '#15528B', title: "Династия Кунгратов и Ичан-Кала (1804–1920)", text: "Эльтузар-хан (1804) закрепил трон за Кунгратами. Мухаммад Рахим-хан I объединил земли Приаралья, а при Аллакули-хане (1825–1842) возведены дворец Таш-Хаули и торговые купола." },
      { icon: ScrollText, bg: '#E8F5EE', color: '#319568', title: "Договор 1873 года и эпоха Феруза", text: "При Мухаммаде Рахим-хане II (поэт Феруз, 1864–1910) открылась первая типография, развивались макомы и историческая школа Муниса и Агахи. После Гандимиянского договора 1873 г. ханство стало протекторатом Российской империи." },
      { icon: Flag, bg: '#F3EEFF', color: '#7C3AED', title: "Реформы Ислам-Ходжи и 1920 год", text: "В 1910–1913 гг. визирь Ислам-Ходжа построил светскую школу, больницу и высокий минарет. 2 февраля 1920 года последний хан Саид Абдулла-хан отрёкся от престола, уступив место Хорезмской НСР." },
    ],
    rulersTitle: "Выдающиеся правители Хивинского ханства",
    rulers: [
      { name: "Ильбарс-хан", years: "1511–1516", note: "Основатель Хивинского ханства" },
      { name: "Абульгази Бахадурхан", years: "1643–1663", note: "Историк, основатель Нового Ургенча (1643)" },
      { name: "Шергази-хан", years: "1714–1728", note: "Разгромил экспедицию Бековича в 1717 г." },
      { name: "Эльтузар-хан", years: "1804–1806", note: "Первый хан династии Кунгратов" },
      { name: "Мухаммад Рахим-хан I", years: "1806–1825", note: "Реформатор и объединитель Приаралья" },
      { name: "Аллакули-хан", years: "1825–1842", note: "Строитель дворца Таш-Хаули и медресе" },
      { name: "Мухаммад Рахим-хан II (Феруз)", years: "1864–1910", note: "Поэт и покровитель книгопечатания и искусства" },
      { name: "Саид Абдулла-хан", years: "1918–1920", note: "Последний хивинский хан (отрёкся 2.02.1920)" },
    ],
    galleryTitle: "Архитектурные памятники Хивинского ханства",
    gallery: [
      { img: '/images/khiva-hero.jpg', caption: "Ансамбль Ичан-Калы" },
      { img: '/images/toshhovli.jpg', caption: "Дворец Таш-Хаули (XIX век)" },
      { img: '/images/kunya-ark.jpg', caption: "Цитадель Куня-Арк" },
      { img: '/images/nurullaboy.jpg', caption: "Дворец Нуруллабая (начало XX века)" },
    ],
    source: "Источник: Википедия (Хивинское ханство, Хорезмская область) и архив музея «Ичан-Кала».",
  },
  en: {
    heading: "History of the Khiva Khanate (1511–1920)",
    intro: "The Khanate of Khiva (Khwarazm) was one of Central Asia’s three Uzbek khanates, founded in 1511 under Ilbars Khan with early capitals at Vazir and Old Urgench before shifting permanently to Khiva in the late 16th century. From 1804 until 1920 it was ruled by the Uzbek Kungrat dynasty.",
    kpis: [
      { l: "Historical Span", v: "1511–1920 (409 yrs)" },
      { l: "Dynasties", v: "Arabshahid & Kungrat" },
      { l: "Capitals", v: "Vazir → Urgench → Khiva" },
      { l: "Gandimiyon Treaty", v: "August 12, 1873" },
    ],
    cards: [
      { icon: Crown, bg: '#FFF3E0', color: '#C58B43', title: "Arabshahid Dynasty (1511–1804)", text: "Founded by Ilbars Khan, the dynasty reached cultural distinction under scholar-khan Abulghazi Bahadur (1643–1663), founder of New Urgench (1643) and author of Shajara-i Turk, while Anushakhan dug the Shavat Canal." },
      { icon: Castle, bg: '#EBF3FA', color: '#15528B', title: "Kungrat Dynasty & Ichan-Kala (1804–1920)", text: "Eltuzar Khan (1804) inaugurated formal Kungrat rule. Muhammad Rahim Khan I unified the Aral delta, and Alloqulikhan (1825–1842) constructed Toshhovli Palace, caravanserais, and major madrasas." },
      { icon: ScrollText, bg: '#E8F5EE', color: '#319568', title: "1873 Gandimiyon Treaty & Khan Feruz", text: "Despite becoming a Russian protectorate after the 1873 Treaty of Gandimiyon, Khan Muhammad Rahim II (poet Feruz, 1864–1910) established Central Asia’s first lithographic press and championed Khorezmian maqom and historiography." },
      { icon: Flag, bg: '#F3EEFF', color: '#7C3AED', title: "Islam Khoja Reforms & 1920 Abdication", text: "Grand Vizier Islam Khoja erected Khiva’s tallest minaret, a modern school, hospital, and telegraph office (1910–1913). Following political upheaval, Said Abdullah Khan abdicated on February 2, 1920." },
    ],
    rulersTitle: "Notable Khans of Khiva",
    rulers: [
      { name: "Ilbars Khan", years: "1511–1516", note: "Founder of the Khiva Khanate" },
      { name: "Abulghazi Bahadur Khan", years: "1643–1663", note: "Historian & founder of New Urgench (1643)" },
      { name: "Sherghazi Khan", years: "1714–1728", note: "Defeated Bekovich-Cherkassky’s 1717 expedition" },
      { name: "Eltuzar Khan", years: "1804–1806", note: "First monarch of the Kungrat dynasty" },
      { name: "Muhammad Rahim Khan I", years: "1806–1825", note: "Administrative reformer & Aral unifier" },
      { name: "Alloqulikhan", years: "1825–1842", note: "Builder of Toshhovli Palace & madrasa" },
      { name: "Muhammad Rahim Khan II (Feruz)", years: "1864–1910", note: "Poet-khan, maqom & printing patron" },
      { name: "Said Abdullah Khan", years: "1918–1920", note: "Final khan; abdicated February 2, 1920" },
    ],
    galleryTitle: "Architectural Legacy of the Khanate",
    gallery: [
      { img: '/images/khiva-hero.jpg', caption: "Ichan-Kala Architectural Ensemble" },
      { img: '/images/toshhovli.jpg', caption: "Toshhovli Palace (19th century)" },
      { img: '/images/kunya-ark.jpg', caption: "Kunya-Ark Royal Citadel" },
      { img: '/images/nurullaboy.jpg', caption: "Nurullaboy Palace (Early 20th century)" },
    ],
    source: "Source: Wikipedia (Khanate of Khiva, Xiva xonligi) & Ichan-Kala Museum-Reserve.",
  },
};

export default function KhivaKhanatePage() {
  const { language, t } = useLanguage();
  const h = t.pages.history;
  const content = khanateContent[language] || khanateContent.uz;
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  return (
    <>
      <Helmet>
        <title>{t.nav.khivaKhanate}</title>
      </Helmet>
      <PageHero
        title={h.khanateTitle}
        subtitle={h.khanateSubtitle}
        image="/images/khiva-hero.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.history} > ${h.khanateTitle}`}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {content.kpis.map((k) => (
            <div key={k.l} className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
              <div className="font-bold text-[#15528B] text-sm sm:text-base">{k.v}</div>
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
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: c.bg, color: c.color }}>
                <c.icon size={20} />
              </div>
              <h3 className="font-bold text-[#17243B] mb-2">{c.title}</h3>
              <p className="text-sm text-[#66758A] leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
          <h2 className="font-bold text-[#17243B] text-base mb-4">{content.rulersTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {content.rulers.map((r) => (
              <div key={r.name} className="p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0]">
                <div className="font-bold text-xs sm:text-sm text-[#17243B]">{r.name}</div>
                <div className="text-[11px] font-semibold text-[#15528B] mt-0.5">{r.years}</div>
                <p className="text-xs text-[#66758A] mt-1">{r.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-[#17243B] text-base mb-3">{content.galleryTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.gallery.map((g, idx) => (
              <button
                key={g.caption}
                type="button"
                onClick={() => setLightboxIdx(idx)}
                className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden text-left group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img src={g.img} alt={g.caption} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
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
            <Link to="/tarix/xorazmshohlar" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66758A] hover:text-[#15528B]">
              <ArrowLeft size={14} /> {h.shahsTitle}
            </Link>
            <Link to="/tarix/xorazm-tarixi" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] hover:underline">
              {h.archiveTitle} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
