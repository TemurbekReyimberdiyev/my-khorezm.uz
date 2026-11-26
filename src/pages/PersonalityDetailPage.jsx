import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { getPersonalities } from '../data/personalities';
import { useLanguage } from '../hooks/useLanguage';
import Badge from '../components/common/Badge';
import PagePathBar from '../components/common/PagePathBar';
import Icon3D from '../components/common/Icon3D';

export default function PersonalityDetailPage() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const pText = t.pages.personalities;
  const person = getPersonalities(language).find((p) => p.slug === slug);

  if (!person) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#17243B] mb-4">{pText.notFound}</h1>
        <Link to="/shaxslar" className="text-[#15528B] flex items-center gap-1 justify-center">
          <ArrowLeft size={16} /> {t.common.back}
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{person.name}</title>
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <PagePathBar variant="inline" className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 text-center">
              <img src={person.photo} alt={person.name} className="w-32 h-32 rounded-full object-cover object-top mx-auto border-4 border-[#EBF3FA] mb-4" />
              <Badge variant="primary" className="mb-2">{person.category}</Badge>
              <h1 className="font-bold text-[#17243B] text-lg mt-2">{person.name}</h1>
              <p className="text-sm text-[#66758A]">{person.fullName}</p>
              <p className="text-sm font-semibold text-[#15528B] mt-2">{person.years}</p>
              <p className="text-xs text-[#66758A] mt-1">{person.role}</p>
              <Link
                to="/shaxslar"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-xl hover:bg-[#EBF3FA]"
              >
                <ArrowLeft size={13} /> {t.common.back}
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Icon3D name="history" size={20} />
                <h2 className="font-bold text-[#17243B]">{pText.bioTitle}</h2>
              </div>
              <p className="text-sm text-[#66758A] leading-relaxed">{person.fullBio}</p>
            </div>
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Icon3D name="award" size={20} />
                <h2 className="font-bold text-[#17243B]">{pText.achievementsTitle}</h2>
              </div>
              <ul className="space-y-2">
                {person.achievements.map((a, i) => (
                  <li key={i} className="text-sm text-[#66758A] flex items-start gap-2">
                    <CheckCircle size={15} className="text-[#319568] shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            {person.works?.length > 0 && (
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="book" size={20} />
                  <h2 className="font-bold text-[#17243B]">{pText.worksTitle}</h2>
                </div>
                <ul className="space-y-2">
                  {person.works.map((w, i) => (
                    <li key={i} className="text-sm text-[#66758A] flex items-start gap-2.5">
                      <Icon3D name="scroll" size={16} className="mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
