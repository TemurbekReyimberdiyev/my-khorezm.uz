const statsData = {
  uz: [
    { id: 'population', value: '~2,0 mln', label: 'Aholi soni', sublabel: "Taxminiy ko'rsatkich", icon: 'Users', color: '#3b82f6' },
    { id: 'area', value: '6 100 km²', label: 'Hudud maydoni', sublabel: "O'zbekiston hududining ~1,4%", icon: 'Map', color: '#10b981' },
    { id: 'districts', value: '13 ta', label: 'Tuman va shaharlar', sublabel: '2 shahar, 11 tuman', icon: 'MapPin', color: '#f59e0b' },
    { id: 'heritage', value: '2500+ yil', label: 'Tarixiy meros', sublabel: 'Qadimiy sivilizatsiya markazi', icon: 'Landmark', color: '#8b5cf6' },
    { id: 'tourism', value: '200+', label: "Turistik ob'ektlar", sublabel: "UNESCO ro'yxatidagi joylar", icon: 'Compass', color: '#ef4444' },
    { id: 'universities', value: '8 ta', label: "Oliy ta'lim muassasalari", sublabel: 'Universitet va filiallar', icon: 'GraduationCap', color: '#06b6d4' },
  ],
  ru: [
    { id: 'population', value: '~2,0 млн', label: 'Население', sublabel: 'Примерный показатель', icon: 'Users', color: '#3b82f6' },
    { id: 'area', value: '6 100 км²', label: 'Площадь региона', sublabel: '~1,4% территории Узбекистана', icon: 'Map', color: '#10b981' },
    { id: 'districts', value: '13', label: 'Районов и городов', sublabel: '2 города, 11 районов', icon: 'MapPin', color: '#f59e0b' },
    { id: 'heritage', value: '2500+ лет', label: 'Историческое наследие', sublabel: 'Центр древней цивилизации', icon: 'Landmark', color: '#8b5cf6' },
    { id: 'tourism', value: '200+', label: 'Туристических объектов', sublabel: 'Включая объекты ЮНЕСКО', icon: 'Compass', color: '#ef4444' },
    { id: 'universities', value: '8', label: 'ВУЗов', sublabel: 'Университеты и филиалы', icon: 'GraduationCap', color: '#06b6d4' },
  ],
  en: [
    { id: 'population', value: '~2.0M', label: 'Population', sublabel: 'Approximate figure', icon: 'Users', color: '#3b82f6' },
    { id: 'area', value: '6,100 km²', label: 'Total Area', sublabel: '~1.4% of Uzbekistan', icon: 'Map', color: '#10b981' },
    { id: 'districts', value: '13', label: 'Districts & Cities', sublabel: '2 cities, 11 districts', icon: 'MapPin', color: '#f59e0b' },
    { id: 'heritage', value: '2500+ yrs', label: 'Historical Heritage', sublabel: 'Ancient civilization cradle', icon: 'Landmark', color: '#8b5cf6' },
    { id: 'tourism', value: '200+', label: 'Tourism Sites', sublabel: 'Including UNESCO heritage', icon: 'Compass', color: '#ef4444' },
    { id: 'universities', value: '8', label: 'Higher Education', sublabel: 'Universities & branches', icon: 'GraduationCap', color: '#06b6d4' },
  ],
};

export const getKhorezmStats = (lang = 'uz') => statsData[lang] || statsData.uz;
export const khorezmStats = statsData.uz;
