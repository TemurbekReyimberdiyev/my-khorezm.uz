import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft, Award, Landmark } from 'lucide-react';
import { getHistoryData } from '../../data/history';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';

export default function HistoryTimelinePage() {
  const { language, t } = useLanguage();
  const h = t.pages.history;
  const { eras, etymology, viloyatModern, sourceNote } = getHistoryData(language);

  return (
    <>
      <Helmet>
        <title>{t.nav.historyTimeline}</title>
      </Helmet>
      <PageHero
        title={h.archiveTitle}
        subtitle={h.archiveSubtitle}
        image="/images/ancient-fortress.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.history} > ${h.archiveTitle}`}
      />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Modern Region Milestones (1920 - Present) from Xorazm viloyati Wikipedia */}
        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-[#15528B]" />
            <h2 className="font-bold text-[#17243B] text-lg">{viloyatModern.title}</h2>
          </div>
          <p className="text-sm text-[#66758A] leading-relaxed mb-5">{viloyatModern.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {viloyatModern.milestones.map((m) => (
              <div key={m.date} className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0]">
                <div className="text-xs font-bold text-[#15528B] mb-1">{m.date}</div>
                <div className="font-bold text-sm text-[#17243B] mb-1">{m.title}</div>
                <p className="text-xs text-[#66758A] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Chronological Timeline */}
        <div className="relative border-l-2 border-[#E5EAF0] pl-6 space-y-6">
          {eras.map((era) => (
            <div key={era.id} className="relative bg-white border border-[#E5EAF0] rounded-2xl p-6 shadow-sm">
              <span
                className="absolute -left-[33px] top-6 w-4 h-4 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: era.color }}
              />
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: era.color }}>
                  <Calendar size={12} /> {era.dates}
                </span>
                <Link to={era.href} className="text-xs font-semibold text-[#15528B] flex items-center gap-1 hover:gap-2 transition-all">
                  {t.common.readMore} <ArrowRight size={12} />
                </Link>
              </div>
              <h2 className="font-bold text-[#17243B] text-lg">{era.name}</h2>
              <p className="text-sm text-[#66758A] mt-2 leading-relaxed">{era.desc}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {era.events.map((ev) => (
                  <span key={ev} className="text-xs bg-[#F7F9FC] border border-[#E5EAF0] px-2.5 py-1 rounded-lg text-[#17243B]">
                    {ev}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Capitals Archive */}
        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Landmark size={18} className="text-[#C58B43]" />
            <h2 className="font-bold text-[#17243B] text-base">{etymology.capitalsTitle}</h2>
          </div>
          <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-4">{etymology.text}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {etymology.capitals.map((c) => (
              <div key={c.name} className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0]">
                <div className="font-bold text-sm text-[#15528B]">{c.name}</div>
                <div className="text-xs text-[#66758A] mt-0.5">{c.period}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E5EAF0]">
          <p className="text-xs text-[#66758A]">{sourceNote}</p>
          <Link to="/tarix" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] hover:underline">
            <ArrowLeft size={14} /> {t.nav.history}
          </Link>
        </div>
      </div>
    </>
  );
}
