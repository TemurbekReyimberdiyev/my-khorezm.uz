const statsData = {
  uz: [
    { id: 'population', value: '~2,0 mln', label: 'Aholi soni', sublabel: "Taxminiy ko'rsatkich", icon: 'Users', color: '#0B4A6F' },
    { id: 'area', value: '6 100 km²', label: 'Hudud maydoni', sublabel: "O'zbekiston hududining ~1,4%", icon: 'Ruler', color: '#F59E0B' },
    { id: 'districts', value: '13 ta', label: 'Tuman va shaharlar', sublabel: '2 shahar, 11 tuman', icon: 'MapPinned', color: '#0EA5A6' },
    { id: 'heritage', value: '2500+ yil', label: 'Tarixiy meros', sublabel: 'Qadimiy sivilizatsiya markazi', icon: 'Castle', color: '#F59E0B' },
    { id: 'tourism', value: '200+', label: "Turistik ob'ektlar", sublabel: "UNESCO ro'yxatidagi joylar", icon: 'Camera', color: '#0B4A6F' },
    { id: 'universities', value: '10 ta', label: "Oliy ta'lim muassasalari", sublabel: 'Davlat, nodavlat va xorijiy OTMlar', icon: 'GraduationCap', color: '#7C3AED' },
  ],
  ru: [
    { id: 'population', value: '~2,0 млн', label: 'Население', sublabel: 'Примерный показатель', icon: 'Users', color: '#0B4A6F' },
    { id: 'area', value: '6 100 км²', label: 'Площадь региона', sublabel: '~1,4% территории Узбекистана', icon: 'Ruler', color: '#F59E0B' },
    { id: 'districts', value: '13', label: 'Районов и городов', sublabel: '2 города, 11 районов', icon: 'MapPinned', color: '#0EA5A6' },
    { id: 'heritage', value: '2500+ лет', label: 'Историческое наследие', sublabel: 'Центр древней цивилизации', icon: 'Castle', color: '#F59E0B' },
    { id: 'tourism', value: '200+', label: 'Туристических объектов', sublabel: 'Включая объекты ЮНЕСКО', icon: 'Camera', color: '#0B4A6F' },
    { id: 'universities', value: '10', label: 'ВУЗов', sublabel: 'Государственные, частные и филиалы', icon: 'GraduationCap', color: '#7C3AED' },
  ],
  en: [
    { id: 'population', value: '~2.0M', label: 'Population', sublabel: 'Approximate figure', icon: 'Users', color: '#0B4A6F' },
    { id: 'area', value: '6,100 km²', label: 'Total Area', sublabel: '~1.4% of Uzbekistan', icon: 'Ruler', color: '#F59E0B' },
    { id: 'districts', value: '13', label: 'Districts & Cities', sublabel: '2 cities, 11 districts', icon: 'MapPinned', color: '#0EA5A6' },
    { id: 'heritage', value: '2500+ yrs', label: 'Historical Heritage', sublabel: 'Ancient civilization cradle', icon: 'Castle', color: '#F59E0B' },
    { id: 'tourism', value: '200+', label: 'Tourism Sites', sublabel: 'Including UNESCO heritage', icon: 'Camera', color: '#0B4A6F' },
    { id: 'universities', value: '10', label: 'Higher Education', sublabel: 'State, private & foreign HEIs', icon: 'GraduationCap', color: '#7C3AED' },
  ],
};

export const getKhorezmStats = (lang = 'uz') => statsData[lang] || statsData.uz;
export const khorezmStats = statsData.uz;
