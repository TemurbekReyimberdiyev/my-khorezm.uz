import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MapPin,
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  ExternalLink,
  Phone,
  Mail,
  X,
  UserCheck,
  Award,
  ZoomIn,
  Layers,
  BarChart3,
  FileBadge2,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Icon3D from '../components/common/Icon3D';
import ImageLightbox from '../components/common/ImageLightbox';
import { regionalEduSummary, universitiesData } from '../data/universities';

const innovationEcosystem = {
  uz: [
    {
      title: "Xorazm Ma’mun akademiyasi (O‘zR FA)",
      desc: "1004-yildagi tarixiy Ma’mun akademiyasi an’analarini tiklab, 1997-yilda Xiva shahrida qayta tashkil etilgan va UNESCO shafeligida fundamental ilmiy tadqiqotlar olib boruvchi akademiya.",
      photo: '/images/universities/mamun-academy.png',
    },
    {
      title: 'IT Park Xorazm va Al-Xorazmiy shaharchasi',
      desc: "Raqamli iqtisodiyot, dasturlash maktablari, rezident IT-kompaniyalar, BPO markazlari va yoshlar startap ekotizimi markazi.",
      photo: '/images/modern-office.jpg',
    },
    {
      title: 'Yoshlar innovatsiya va STEM markazlari',
      desc: "Viloyatning barcha 13 tuman va shaharlaridagi 573 ta maktab hamda oliygohlar qoshidagi robototexnika, agro-texnologiya va yashil energetika laboratoriyalari.",
      photo: '/images/solar-khorezm.jpg',
    },
  ],
  ru: [
    {
      title: 'Хорезмская академия Маъмуна (АН РУз)',
      desc: 'Восстановлена в 1997 году в Хиве под эгидой ЮНЕСКО как преемница исторической Академии 1004 года; ведёт фундаментальные научные исследования региона.',
      photo: '/images/universities/mamun-academy.png',
    },
    {
      title: 'IT-парк Хорезма и городок Аль-Хорезми',
      desc: 'Региональный центр цифровой экономики, школ программирования, IT-компаний резидентов, BPO-сервисов и стартап-акселерации.',
      photo: '/images/modern-office.jpg',
    },
    {
      title: 'Молодёжные центры инноваций и STEM',
      desc: 'Лаборатории робототехники, агротехнологий и зелёной энергетики, объединяющие 573 школы и вузы всех 13 районов и городов Хорезма.',
      photo: '/images/solar-khorezm.jpg',
    },
  ],
  en: [
    {
      title: "Khorezm Ma'mun Academy (Academy of Sciences)",
      desc: "Re-established in Khiva in 1997 under UNESCO patronage as successor to the 1004 House of Wisdom, leading fundamental academic research across the region.",
      photo: '/images/universities/mamun-academy.png',
    },
    {
      title: 'IT Park Khorezm & Al-Khwarizmi Town',
      desc: 'Regional hub for software engineering, coding schools, resident tech companies, BPO exports, and startup acceleration.',
      photo: '/images/modern-office.jpg',
    },
    {
      title: 'Youth Innovation & STEM Labs',
      desc: 'Applied robotics, agri-tech, and clean-energy hubs connecting 573 schools and universities across all 13 Khorezm districts.',
      photo: '/images/solar-khorezm.jpg',
    },
  ],
};

const studyFormLabels = {
  uz: { fullTime: 'Kunduzgi', partTime: 'Sirtqi', distance: 'Masofaviy', evening: 'Kechki', dual: 'Dual', joint: "Qo'shma", other: 'Ikkinchi oliy / boshqa' },
  ru: { fullTime: 'Очная', partTime: 'Заочная', distance: 'Дистанционная', evening: 'Вечерняя', dual: 'Дуальная', joint: 'Совместная', other: 'Второе высшее / др.' },
  en: { fullTime: 'Full-time', partTime: 'Part-time', distance: 'Distance', evening: 'Evening', dual: 'Dual', joint: 'Joint', other: 'Second degree / other' },
};

const ownershipStyles = {
  state: 'bg-[#EBF3FA] text-[#15528B] border-[#CFE2F4]',
  private: 'bg-[#EEFBF3] text-[#157347] border-[#C8EBD6]',
  foreign: 'bg-[#F5F0FF] text-[#6D28D9] border-[#E0D4FC]',
  academy: 'bg-[#FFF7ED] text-[#B45309] border-[#FDE68A]',
};

const formatNum = (val) => (typeof val === 'number' ? new Intl.NumberFormat('ru-RU').format(val) : val);
const pick = (obj, lang) => obj?.[lang] || obj?.uz || '';

function UniversityLogo({ uni, sizeClass = 'w-11 h-11' }) {
  const title = uni.short || uni.id;
  if (!uni.logo) {
    return (
      <div
        className={`${sizeClass} rounded-xl border border-[#E5EAF0] bg-[#EBF3FA] text-[#15528B] flex items-center justify-center shrink-0 shadow-2xs`}
        aria-hidden="true"
      >
        <GraduationCap size={20} />
      </div>
    );
  }
  return (
    <div
      className={`${sizeClass} rounded-xl border border-[#E5EAF0] bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-2xs ${
        uni.logoCover ? '' : 'p-1'
      }`}
    >
      <img
        src={uni.logo}
        alt={`${title} logo`}
        className={`w-full h-full ${uni.logoCover ? 'object-cover' : 'object-contain'}`}
      />
    </div>
  );
}

function ProgramRow({ badge, badgeTone, count, text }) {
  return (
    <div className="rounded-xl border border-[#E5EAF0] bg-[#FAFBFD] p-3.5">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${badgeTone}`}>{badge}</span>
        {count && <span className="text-xs font-semibold text-[#5B6B82]">{count}</span>}
      </div>
      <p className="text-sm text-[#32435C] leading-relaxed">{text}</p>
    </div>
  );
}

function UniversityDetailModal({ uni, lang, ed, onClose, onZoomPhoto }) {
  useEffect(() => {
    if (!uni) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [uni, onClose]);

  if (!uni) return null;

  const forms = studyFormLabels[lang] || studyFormLabels.uz;
  const formEntries = Object.entries(uni.students.forms || {}).filter(([, count]) => count > 0);
  const faculties = pick(uni.faculties, lang) || [];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="uni-modal-title"
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5EAF0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-56 sm:h-72 bg-slate-900 overflow-hidden">
          <img
            src={uni.photo}
            alt={pick(uni.name, lang)}
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => onZoomPhoto(uni)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />
          <button
            type="button"
            onClick={onClose}
            aria-label={ed.closeBtn}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={() => onZoomPhoto(uni)}
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/55 hover:bg-black/75 text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <ZoomIn size={14} />
            <span>{uni.short}</span>
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-white flex items-end gap-3.5">
            <UniversityLogo uni={uni} sizeClass="w-14 h-14 sm:w-16 sm:h-16" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
                  {pick(uni.typeLabel, lang)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-sm">
                  {uni.founded} · {uni.code === 'O‘zR FA' ? 'O‘zR FA' : `HEMIS #${uni.code}`}
                </span>
              </div>
              <h2 id="uni-modal-title" className="font-bold text-lg sm:text-2xl leading-tight">
                {pick(uni.name, lang)}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          <p className="text-sm sm:text-base text-[#44546A] leading-relaxed">{pick(uni.summary, lang)}</p>

          {/* Address, Rector, Contact & Official Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="rounded-2xl border border-[#E5EAF0] bg-[#F7FAFC] p-4 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wide text-[#5B6B82]">{ed.addressLabel}</div>
              <div className="flex items-start gap-2.5 text-sm text-[#17243B]">
                <MapPin size={17} className="text-[#15528B] shrink-0 mt-0.5" />
                <span>{pick(uni.address, lang)}</span>
              </div>
              {uni.rector && (
                <div className="flex items-start gap-2.5 text-sm text-[#32435C] pt-1 border-t border-[#E5EAF0]">
                  <UserCheck size={17} className="text-[#15528B] shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-[#17243B]">{ed.rectorLabel}:</strong> {uni.rector}
                  </span>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-[#E5EAF0] bg-[#F7FAFC] p-4 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wide text-[#5B6B82]">{ed.contactLabel}</div>
              <div className="flex flex-wrap gap-3 text-sm text-[#32435C]">
                {uni.phone && (
                  <a href={`tel:${uni.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-[#15528B]">
                    <Phone size={15} className="text-[#15528B]" />
                    <span>{uni.phone}</span>
                  </a>
                )}
                {uni.email && (
                  <a href={`mailto:${uni.email}`} className="inline-flex items-center gap-1.5 hover:text-[#15528B]">
                    <Mail size={15} className="text-[#15528B]" />
                    <span>{uni.email}</span>
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#15528B] hover:bg-[#10416F] px-3.5 py-2 rounded-xl transition-colors"
                >
                  <span>{ed.websiteBtn}: {new URL(uni.website).hostname.replace(/^www\./, '')}</span>
                  <ExternalLink size={13} />
                </a>
                {uni.statUrl && (
                  <a
                    href={uni.statUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-white border border-[#CFE2F4] hover:bg-[#EBF3FA] px-3 py-2 rounded-xl transition-colors"
                  >
                    <BarChart3 size={13} />
                    <span>{ed.statBtn}</span>
                  </a>
                )}
                {uni.passportUrl && (
                  <a
                    href={uni.passportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#157347] bg-white border border-[#C8EBD6] hover:bg-[#EEFBF3] px-3 py-2 rounded-xl transition-colors"
                  >
                    <FileBadge2 size={13} />
                    <span>{ed.passportBtn}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Numeric KPI Grid */}
          {uni.students.total > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-[#E5EAF0] p-3.5 text-center">
                <div className="text-xs text-[#66758A] mb-1">{ed.studentsLabel}</div>
                <div className="text-xl font-bold text-[#15528B]">{formatNum(uni.students.total)}</div>
                {uni.students.foreign > 0 && (
                  <div className="text-[11px] text-[#5B6B82] mt-0.5">
                    +{formatNum(uni.students.foreign)} {lang === 'ru' ? 'иностр.' : lang === 'en' ? 'intl.' : 'xorijiy'}
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-[#E5EAF0] p-3.5 text-center">
                <div className="text-xs text-[#66758A] mb-1">{ed.teachersLabel}</div>
                <div className="text-xl font-bold text-[#15528B]">{formatNum(uni.teachers.total)}</div>
                {uni.teachers.withDegree > 0 && (
                  <div className="text-[11px] text-[#5B6B82] mt-0.5">{uni.teachers.withDegree} PhD/DSc</div>
                )}
              </div>
              <div className="rounded-2xl border border-[#E5EAF0] p-3.5 text-center">
                <div className="text-xs text-[#66758A] mb-1">
                  {ed.bachelorLabel} / {ed.masterLabel}
                </div>
                <div className="text-lg font-bold text-[#17243B]">
                  {formatNum(uni.students.bachelor)} / {formatNum(uni.students.master)}
                </div>
                {uni.students.residency > 0 && (
                  <div className="text-[11px] text-[#5B6B82] mt-0.5">
                    {ed.residencyLabel}: {formatNum(uni.students.residency)}
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-[#E5EAF0] p-3.5 text-center">
                <div className="text-xs text-[#66758A] mb-1">
                  {ed.facultiesLabel} / {ed.departmentsLabel}
                </div>
                <div className="text-xl font-bold text-[#17243B]">
                  {uni.structure.faculties} / {uni.structure.departments}
                </div>
                {uni.teachers.avgAge && (
                  <div className="text-[11px] text-[#5B6B82] mt-0.5">
                    Ø {uni.teachers.avgAge} {lang === 'ru' ? 'лет' : lang === 'en' ? 'yrs avg' : 'yosh'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Study Forms */}
          {formEntries.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#17243B] mb-2.5 flex items-center gap-2">
                <Layers size={16} className="text-[#15528B]" />
                <span>{ed.studyFormsTitle}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {formEntries.map(([key, count]) => (
                  <div
                    key={key}
                    className="px-3 py-1.5 rounded-xl bg-[#F4F7FA] border border-[#E5EAF0] text-xs font-medium text-[#32435C]"
                  >
                    <span className="text-[#66758A]">{forms[key] || key}: </span>
                    <strong className="text-[#17243B]">{formatNum(count)}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Faculties */}
          <div>
            <h3 className="text-sm font-bold text-[#17243B] mb-2.5 flex items-center gap-2">
              <Building2 size={16} className="text-[#15528B]" />
              <span>
                {ed.facultiesTitle} ({uni.structure.faculties})
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {faculties.map((f) => (
                <div
                  key={f}
                  className="px-3 py-2 rounded-xl bg-[#FAFBFD] border border-[#E5EAF0] text-xs sm:text-sm text-[#17243B] font-medium"
                >
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Programs: Bachelor, Master, PhD */}
          <div>
            <h3 className="text-sm font-bold text-[#17243B] mb-2.5 flex items-center gap-2">
              <BookOpen size={16} className="text-[#15528B]" />
              <span>{ed.programsTitle}</span>
            </h3>
            <div className="space-y-2.5">
              {uni.programs.bachelor && (
                <ProgramRow
                  badge={ed.bachelorLabel}
                  badgeTone="bg-[#EBF3FA] text-[#15528B]"
                  count={uni.programs.bachelor.countLabel}
                  text={pick(uni.programs.bachelor, lang)}
                />
              )}
              {uni.programs.master && (
                <ProgramRow
                  badge={ed.masterLabel}
                  badgeTone="bg-[#EEFBF3] text-[#157347]"
                  count={uni.programs.master.countLabel}
                  text={pick(uni.programs.master, lang)}
                />
              )}
              {uni.programs.phd && (
                <ProgramRow
                  badge={ed.phdLabel}
                  badgeTone="bg-[#F5F0FF] text-[#6D28D9]"
                  count={uni.programs.phd.countLabel}
                  text={pick(uni.programs.phd, lang)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EducationPage() {
  const { language, t } = useLanguage();
  const ed = t.pages.education;
  const [filter, setFilter] = useState('all');
  const [selectedUni, setSelectedUni] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  const regionalStats = useMemo(() => {
    const statLabels = {
      uz: { otm: "Oliy ta'lim muassasalari", stu: 'Viloyatdagi talabalar', tch: "Professor-o'qituvchilar", sch: "Umumta'lim maktablari" },
      ru: { otm: 'Высших учебных заведений', stu: 'Студентов в регионе', tch: 'Преподавателей', sch: 'Общеобразовательных школ' },
      en: { otm: 'Higher Education Institutions', stu: 'Enrolled Students', tch: 'Academic Faculty', sch: 'General Schools' },
    }[language] || { otm: "Oliy ta'lim muassasalari", stu: 'Viloyatdagi talabalar', tch: "Professor-o'qituvchilar", sch: "Umumta'lim maktablari" };

    return [
      { icon: 'graduation', l: statLabels.otm, v: `${regionalEduSummary.otmCount} + 1` },
      { icon: 'users', l: statLabels.stu, v: formatNum(regionalEduSummary.studentsInRegion) },
      { icon: 'flask', l: statLabels.tch, v: formatNum(regionalEduSummary.totalTeachers) },
      { icon: 'book', l: statLabels.sch, v: `${regionalEduSummary.schoolsCount}` },
    ];
  }, [language]);

  const filteredUniversities = useMemo(() => {
    if (filter === 'all') return universitiesData;
    return universitiesData.filter((u) => u.ownership === filter);
  }, [filter]);

  const lightboxItems = useMemo(
    () =>
      universitiesData.map((u) => ({
        src: u.photo,
        title: pick(u.name, language),
        subtitle: pick(u.address, language),
      })),
    [language]
  );

  const openLightboxForUni = (uni) => {
    const idx = universitiesData.findIndex((item) => item.id === uni.id);
    if (idx >= 0) setLightboxIdx(idx);
  };

  const ecoList = innovationEcosystem[language] || innovationEcosystem.uz;

  return (
    <>
      <Helmet>
        <title>{ed.title}</title>
      </Helmet>
      <PageHero
        title={ed.title}
        subtitle={ed.subtitle}
        image="/images/university-urdu.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.education}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Regional KPI Cards */}
        <section className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regionalStats.map((item) => (
              <div key={item.l} className="bg-white border border-[#E5EAF0] rounded-2xl p-5 text-center shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-[#EBF3FA] flex items-center justify-center mx-auto mb-3">
                  <Icon3D name={item.icon} alt={item.l} size={28} />
                </div>
                <div className="font-bold text-2xl text-[#15528B]">{item.v}</div>
                <div className="text-xs text-[#66758A] mt-1">{item.l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5B6B82] bg-[#F7FAFC] border border-[#E5EAF0] rounded-xl px-4 py-2.5">
            <span>{ed.sourceBadge}</span>
            <a
              href={regionalEduSummary.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#15528B] hover:underline"
            >
              <span>stat.edu.uz</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </section>

        {/* Universities Directory & Filters */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Icon3D name="graduation" size={24} />
              <h2 className="font-bold text-[#17243B] text-xl">{ed.universitiesTitle}</h2>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label={ed.universitiesTitle}>
              {[
                { key: 'all', count: universitiesData.length },
                { key: 'state', count: regionalEduSummary.stateCount },
                { key: 'private', count: regionalEduSummary.privateCount },
                { key: 'foreign', count: regionalEduSummary.foreignCount },
                { key: 'academy', count: regionalEduSummary.academyCount },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                    filter === tab.key
                      ? 'bg-[#15528B] text-white border-[#15528B]'
                      : 'bg-white text-[#44546A] border-[#E5EAF0] hover:bg-[#F7FAFC]'
                  }`}
                >
                  {ed.filters?.[tab.key] || tab.key} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUniversities.map((u) => (
              <article
                key={u.id}
                className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden group">
                  <img
                    src={u.photo}
                    alt={pick(u.name, language)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                    onClick={() => openLightboxForUni(u)}
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                        ownershipStyles[u.ownership] || ownershipStyles.state
                      }`}
                    >
                      {ed.filters?.[u.ownership] || u.ownership}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/70 text-white text-[11px] font-semibold backdrop-blur-sm">
                    {u.founded} · {u.short}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col space-y-3.5">
                  {/* Logo directly beside university title */}
                  <div className="flex items-start gap-3">
                    <UniversityLogo uni={u} sizeClass="w-11 h-11" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[#17243B] text-base leading-snug">{pick(u.name, language)}</h3>
                      <p className="text-xs text-[#5B6B82] mt-1 flex items-start gap-1.5">
                        <MapPin size={13} className="text-[#15528B] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{pick(u.address, language)}</span>
                      </p>
                    </div>
                  </div>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="rounded-xl bg-[#F7FAFC] border border-[#E5EAF0] p-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-[11px] text-[#66758A]">
                        <Users size={12} className="text-[#15528B]" />
                        <span className="truncate">{ed.studentsLabel}</span>
                      </div>
                      <div className="font-bold text-sm text-[#17243B] mt-0.5">
                        {u.students.total > 0 ? formatNum(u.students.total) : '—'}
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#F7FAFC] border border-[#E5EAF0] p-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-[11px] text-[#66758A]">
                        <GraduationCap size={12} className="text-[#15528B]" />
                        <span className="truncate">{ed.teachersLabel}</span>
                      </div>
                      <div className="font-bold text-sm text-[#17243B] mt-0.5">
                        {u.teachers.total > 0 ? formatNum(u.teachers.total) : '—'}
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#F7FAFC] border border-[#E5EAF0] p-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-[11px] text-[#66758A]">
                        <Building2 size={12} className="text-[#15528B]" />
                        <span className="truncate">{ed.facultiesLabel}</span>
                      </div>
                      <div className="font-bold text-sm text-[#17243B] mt-0.5">{u.structure.faculties}</div>
                    </div>
                  </div>

                  {/* Degree Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {u.programs.bachelor && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EBF3FA] text-[#15528B]">
                        {ed.bachelorLabel}
                      </span>
                    )}
                    {u.programs.master && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EEFBF3] text-[#157347]">
                        {ed.masterLabel}
                      </span>
                    )}
                    {u.students.residency > 0 && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#FFF7ED] text-[#C2410C]">
                        {ed.residencyLabel}
                      </span>
                    )}
                    {u.programs.phd && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F5F0FF] text-[#6D28D9]">
                        <Award size={11} />
                        <span>PhD / DSc</span>
                      </span>
                    )}
                  </div>

                  {/* Summary snippet */}
                  <p className="text-xs text-[#5B6B82] leading-relaxed line-clamp-2 flex-1">{pick(u.summary, language)}</p>

                  {/* Footer Actions */}
                  <div className="pt-2 border-t border-[#E5EAF0] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedUni(u)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#15528B] hover:bg-[#10416F] text-white text-xs font-semibold transition-colors text-center"
                    >
                      {ed.detailsBtn} →
                    </button>
                    {u.statUrl && (
                      <a
                        href={u.statUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={ed.statBtn}
                        aria-label={`${u.short} ${ed.statBtn}`}
                        className="p-2 rounded-xl border border-[#E5EAF0] text-[#15528B] hover:bg-[#EBF3FA] transition-colors inline-flex items-center justify-center"
                      >
                        <BarChart3 size={16} />
                      </a>
                    )}
                    <a
                      href={u.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={ed.websiteBtn}
                      aria-label={`${u.short} ${ed.websiteBtn}`}
                      className="p-2 rounded-xl border border-[#E5EAF0] text-[#15528B] hover:bg-[#EBF3FA] transition-colors inline-flex items-center justify-center"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Research Centers & Innovation Ecosystem */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Icon3D name="cpu" size={24} />
            <h2 className="font-bold text-[#17243B] text-xl">{ed.itTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ecoList.map((p) => (
              <div key={p.title} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <img src={p.photo} alt={p.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-[#17243B]">{p.title}</h3>
                  <p className="text-sm text-[#66758A] mt-2 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <UniversityDetailModal
        uni={selectedUni}
        lang={language}
        ed={ed}
        onClose={() => setSelectedUni(null)}
        onZoomPhoto={openLightboxForUni}
      />

      <ImageLightbox
        items={lightboxItems}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(-1)}
        onChange={setLightboxIdx}
      />
    </>
  );
}
