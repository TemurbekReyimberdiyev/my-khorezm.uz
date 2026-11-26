import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Icon3D from '../components/common/Icon3D';

const eduContent = {
  uz: {
    stats: [
      { icon: 'graduation', l: "Oliy ta'lim tashkilotlari", v: '8 ta' },
      { icon: 'book', l: "Umumta'lim maktablari", v: '573 ta' },
      { icon: 'users', l: 'Talabalar qamrovi', v: '50 000+' },
      { icon: 'flask', l: 'Ilmiy tadqiqot markazlari', v: '12' },
    ],
    universities: [
      { name: 'Urganch Davlat Universiteti', short: 'UrDU · 1935', students: '20 000+', photo: '/images/university-urdu.jpg' },
      { name: 'Urganch davlat pedagogika instituti', short: 'UrDPI', students: '7 000+', photo: '/images/urgench-modern.jpg' },
      { name: 'TATU Urganch filiali', short: 'TATU UF', students: '4 000+', photo: '/images/modern-office.jpg' },
      { name: 'Toshkent tibbiyot akademiyasi Urganch filiali', short: 'TTA UF', students: '4 500+', photo: '/images/urgench-modern.jpg' },
      { name: "O'zbekiston davlat xoreografiya akademiyasi Urganch filiali", short: "O'zDXA UF", students: '500+', photo: '/images/lazgi-dance.jpg' },
      { name: "Xorazm Ma'mun akademiyasi", short: "Ilmiy markaz · 1997", students: 'UNESCO hamkori', photo: '/images/khiva-hero.jpg' },
    ],
    itProjects: [
      { title: 'IT Park Xorazm va Al-Xorazmiy shaharchasi', desc: "Raqamli iqtisodiyot, dasturlash maktablari, rezident IT-kompaniyalar va startap ekotizimi markazi.", photo: '/images/modern-office.jpg' },
      { title: 'Yoshlar innovatsiya markazi', desc: "Yoshlarning muhandislik, agro-texnologiya va robototexnika loyihalarini qo'llab-quvvatlaydi.", photo: '/images/solar-khorezm.jpg' },
      { title: "Raqamli ta'lim platformalari", desc: "Viloyatning barcha 13 tuman va shaharlari maktablarida axborot texnologiyalari va STEM dasturlari.", photo: '/images/urgench-modern.jpg' },
    ],
  },
  ru: {
    stats: [
      { icon: 'graduation', l: 'Высшие учебные заведения', v: '8' },
      { icon: 'book', l: 'Общеобразовательные школы', v: '573' },
      { icon: 'users', l: 'Охват студентов', v: '50 000+' },
      { icon: 'flask', l: 'Научные центры', v: '12' },
    ],
    universities: [
      { name: 'Ургенчский государственный университет', short: 'УрГУ · 1935', students: '20 000+', photo: '/images/university-urdu.jpg' },
      { name: 'Ургенчский госпединститут', short: 'УрГПИ', students: '7 000+', photo: '/images/urgench-modern.jpg' },
      { name: 'Ургенчский филиал ТУИТ', short: 'ТУИТ УФ', students: '4 000+', photo: '/images/modern-office.jpg' },
      { name: 'Ургенчский филиал ТМА', short: 'ТМА УФ', students: '4 500+', photo: '/images/urgench-modern.jpg' },
      { name: 'Ургенчский филиал ГАХ Узбекистана', short: 'ГАХ УФ', students: '500+', photo: '/images/lazgi-dance.jpg' },
      { name: 'Хорезмская академия Мамуна', short: 'НИИ · 1997', students: 'Центр АН', photo: '/images/khiva-hero.jpg' },
    ],
    itProjects: [
      { title: 'IT Park Хорезм и городок Аль-Хорезми', desc: 'Центр цифровой экономики, IT-школ и поддержки технологических стартапов.', photo: '/images/modern-office.jpg' },
      { title: 'Молодёжный инновационный центр', desc: 'Поддержка инженерных, агротехнологических и робототехнических проектов.', photo: '/images/solar-khorezm.jpg' },
      { title: 'Платформы цифрового образования', desc: 'Сеть IT-центров и STEM-обучения во всех 13 районах и городах области.', photo: '/images/urgench-modern.jpg' },
    ],
  },
  en: {
    stats: [
      { icon: 'graduation', l: 'Higher Education Institutions', v: '8' },
      { icon: 'book', l: 'Public Schools', v: '573' },
      { icon: 'users', l: 'University Students', v: '50,000+' },
      { icon: 'flask', l: 'Research Centers', v: '12' },
    ],
    universities: [
      { name: 'Urgench State University', short: 'UrSU · 1935', students: '20,000+', photo: '/images/university-urdu.jpg' },
      { name: 'Urgench State Pedagogical Institute', short: 'UrSPI', students: '7,000+', photo: '/images/urgench-modern.jpg' },
      { name: 'TUIT Urgench Branch', short: 'TUIT UB', students: '4,000+', photo: '/images/modern-office.jpg' },
      { name: 'Tashkent Medical Academy Urgench', short: 'TMA UB', students: '4,500+', photo: '/images/urgench-modern.jpg' },
      { name: 'State Academy of Choreography Urgench', short: 'SAC UB', students: '500+', photo: '/images/lazgi-dance.jpg' },
      { name: 'Khorezm Mamun Academy', short: 'Research · 1997', students: 'Academy Center', photo: '/images/khiva-hero.jpg' },
    ],
    itProjects: [
      { title: 'IT Park Khorezm & Al-Khwarizmi Town', desc: 'Regional hub for software engineering, resident companies and startup acceleration.', photo: '/images/modern-office.jpg' },
      { title: 'Youth Innovation Center', desc: 'Supporting engineering, agro-tech and applied youth robotics initiatives.', photo: '/images/solar-khorezm.jpg' },
      { title: 'Digital Learning Network', desc: 'Expanding coding academies and STEM curricula across all 13 districts and cities.', photo: '/images/urgench-modern.jpg' },
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
          <div className="flex items-center gap-2 mb-4">
            <Icon3D name="graduation" size={22} />
            <h2 className="font-bold text-[#17243B] text-lg">{ed.universitiesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.universities.map((u) => (
              <div key={u.name} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <img src={u.photo} alt={u.name} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <div className="text-xs font-bold text-[#15528B] mb-1">{u.short}</div>
                  <h3 className="font-bold text-[#17243B] text-sm leading-snug">{u.name}</h3>
                  <p className="text-xs text-[#66758A] mt-2 inline-flex items-center gap-1.5">
                    <Icon3D name="graduation" size={14} />
                    <span>{u.students} {/\d/.test(u.students) ? ed.studentsLabel : ''}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon3D name="cpu" size={22} />
            <h2 className="font-bold text-[#17243B] text-lg">{ed.itTitle}</h2>
          </div>
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
