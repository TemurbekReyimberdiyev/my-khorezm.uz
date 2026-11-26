import { Helmet } from 'react-helmet-async';
import { GraduationCap, BookOpen, Cpu, FlaskConical } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Icon3D from '../components/common/Icon3D';

const eduContent = {
  uz: {
    stats: [
      { icon: 'graduation', l: "Oliy ta'lim muassasalari", v: '8' },
      { icon: 'book', l: 'Umumta\'lim maktablari', v: '400+' },
      { icon: 'cpu', l: 'IT kompaniyalar', v: '150+' },
      { icon: 'flask', l: 'Ilmiy tadqiqot markazlari', v: '12' },
    ],
    universities: [
      { name: 'Urganch Davlat Universiteti', short: 'UrDU', students: '15 000+', photo: '/images/university-urdu.jpg' },
      { name: 'TATU Urganch filiali', short: 'TATU UF', students: '3 500+', photo: '/images/modern-office.jpg' },
      { name: 'Toshkent tibbiyot akademiyasi Urganch filiali', short: 'TTA UF', students: '4 000+', photo: '/images/urgench-modern.jpg' },
      { name: 'Xorazm Ma\'mun akademiyasi', short: "Ma'mun", students: 'Ilmiy markaz', photo: '/images/khiva-hero.jpg' },
    ],
    itProjects: [
      { title: 'IT Park Xorazm', desc: "Raqamli iqtisodiyot, dasturlash maktablari va startap ekotizimi markazi.", photo: '/images/modern-office.jpg' },
      { title: 'Yoshlar innovatsiya markazi', desc: "Yoshlarning muhandislik va robototexnika loyihalarini qo'llab-quvvatlaydi.", photo: '/images/solar-khorezm.jpg' },
      { title: "Raqamli ta'lim platformalari", desc: "Viloyat bo'ylab IT-akademiya va masofaviy ta'lim dasturlari.", photo: '/images/urgench-modern.jpg' },
    ],
  },
  ru: {
    stats: [
      { icon: 'graduation', l: 'Высшие учебные заведения', v: '8' },
      { icon: 'book', l: 'Общеобразовательные школы', v: '400+' },
      { icon: 'cpu', l: 'IT-компании и резиденты', v: '150+' },
      { icon: 'flask', l: 'Научные центры', v: '12' },
    ],
    universities: [
      { name: 'Ургенчский государственный университет', short: 'УрГУ', students: '15 000+', photo: '/images/university-urdu.jpg' },
      { name: 'Ургенчский филиал ТУИТ', short: 'ТУИТ УФ', students: '3 500+', photo: '/images/modern-office.jpg' },
      { name: 'Ургенчский филиал ТМА', short: 'ТМА УФ', students: '4 000+', photo: '/images/urgench-modern.jpg' },
      { name: 'Хорезмская академия Мамуна', short: 'Академия', students: 'НИИ', photo: '/images/khiva-hero.jpg' },
    ],
    itProjects: [
      { title: 'IT Park Хорезм', desc: 'Центр цифровой экономики, IT-школ и поддержки стартапов.', photo: '/images/modern-office.jpg' },
      { title: 'Молодёжный инновационный центр', desc: 'Поддержка инженерных и робототехнических проектов молодёжи.', photo: '/images/solar-khorezm.jpg' },
      { title: 'Платформы цифрового образования', desc: 'Сеть IT-центров и дистанционного обучения в районах.', photo: '/images/urgench-modern.jpg' },
    ],
  },
  en: {
    stats: [
      { icon: 'graduation', l: 'Higher Education Institutions', v: '8' },
      { icon: 'book', l: 'Public Schools', v: '400+' },
      { icon: 'cpu', l: 'IT Companies & Startups', v: '150+' },
      { icon: 'flask', l: 'Research Centers', v: '12' },
    ],
    universities: [
      { name: 'Urgench State University', short: 'UrSU', students: '15,000+', photo: '/images/university-urdu.jpg' },
      { name: 'TUIT Urgench Branch', short: 'TUIT UB', students: '3,500+', photo: '/images/modern-office.jpg' },
      { name: 'Tashkent Medical Academy Urgench', short: 'TMA UB', students: '4,000+', photo: '/images/urgench-modern.jpg' },
      { name: 'Khorezm Mamun Academy', short: 'Mamun', students: 'Research', photo: '/images/khiva-hero.jpg' },
    ],
    itProjects: [
      { title: 'IT Park Khorezm', desc: 'Regional hub for software development, digital skills and startup acceleration.', photo: '/images/modern-office.jpg' },
      { title: 'Youth Innovation Center', desc: 'Supporting engineering, robotics and applied youth research projects.', photo: '/images/solar-khorezm.jpg' },
      { title: 'Digital Learning Network', desc: 'Expanding coding academies and distance education across all districts.', photo: '/images/urgench-modern.jpg' },
    ],
  },
};

export default function EducationPage() {
  const { language, t } = useLanguage();
  const ed = t.pages.education;
  const content = eduContent[language] || eduContent.uz;

  return (
    <>
      <Helmet>
        <title>{t.nav.education}</title>
      </Helmet>
      <PageHero
        title={ed.title}
        subtitle={ed.subtitle}
        image="/images/university-urdu.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.education}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.stats.map((item) => (
            <div key={item.l} className="bg-white border border-[#E5EAF0] rounded-2xl p-5 text-center">
              <div className="w-11 h-11 rounded-xl bg-[#EBF3FA] flex items-center justify-center mx-auto mb-3">
                <Icon3D name={item.icon} alt={item.l} size={28} />
              </div>
              <div className="font-bold text-2xl text-[#15528B]">{item.v}</div>
              <div className="text-xs text-[#66758A] mt-1">{item.l}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-bold text-[#17243B] text-lg mb-4">{ed.universitiesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.universities.map((u) => (
              <div key={u.name} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <img src={u.photo} alt={u.name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <div className="text-xs font-bold text-[#15528B] mb-1">{u.short}</div>
                  <h3 className="font-bold text-[#17243B] text-sm leading-snug">{u.name}</h3>
                  <p className="text-xs text-[#66758A] mt-2">
                    🎓 {u.students} {u.students.includes('0') ? ed.studentsLabel : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-[#17243B] text-lg mb-4">{ed.itTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.itProjects.map((p) => (
              <div key={p.title} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <img src={p.photo} alt={p.title} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-[#17243B]">{p.title}</h3>
                  <p className="text-sm text-[#66758A] mt-2 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
