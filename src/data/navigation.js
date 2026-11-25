export function getNavItems(t) {
  return [
    { id: 'home', label: t.nav.home, href: '/' },
    {
      id: 'geography',
      label: t.nav.geography,
      href: '/geografiya',
      children: [
        { id: 'climate', label: t.nav.climate, href: '/geografiya/iqlim' },
        { id: 'water', label: t.nav.waterResources, href: '/geografiya/suv-resurslari' },
        { id: 'soil', label: t.nav.soil, href: '/geografiya/tuproq' },
        { id: 'flora-fauna', label: t.nav.floraFauna, href: '/geografiya/flora-fauna' },
      ],
    },
    {
      id: 'history',
      label: t.nav.history,
      href: '/tarix',
      children: [
        { id: 'ancient', label: t.nav.ancientKhorezm, href: '/tarix/qadimgi-xorazm' },
        { id: 'khorezmshah', label: t.nav.khorezmshahs, href: '/tarix/xorazmshohlar' },
        { id: 'khanate', label: t.nav.khivaKhanate, href: '/tarix/xiva-xonligi' },
        { id: 'archive', label: t.nav.historyTimeline, href: '/tarix/xorazm-tarixi' },
      ],
    },
    { id: 'districts', label: t.nav.districts, href: '/tumanlar' },
    {
      id: 'tourism',
      label: t.nav.tourism,
      href: '/turizm',
      children: [
        { id: 'ichan-qala', label: t.nav.ichanKala, href: '/turizm/ichan-qala' },
        { id: 'monuments', label: t.nav.monuments, href: '/turizm' },
        { id: 'map', label: t.nav.map, href: '/xarita' },
      ],
    },
    {
      id: 'culture',
      label: t.nav.culture,
      href: '/madaniyat',
      children: [
        { id: 'lazgi', label: t.nav.lazgi, href: '/madaniyat#lazgi' },
        { id: 'dictionary', label: t.nav.dictionary, href: '/lugat' },
        { id: 'personalities', label: t.nav.personalities, href: '/shaxslar' },
        { id: 'cuisine', label: t.nav.cuisine, href: '/taomlar' },
        { id: 'education', label: t.nav.education, href: '/ilm-fan' },
        { id: 'ai', label: t.nav.aiAssistant, href: '/ai-yordamchi' },
      ],
    },
    { id: 'economy', label: t.nav.economy, href: '/iqtisodiyot' },
    { id: 'ecology', label: t.nav.ecology, href: '/ekologiya' },
    { id: 'news', label: t.nav.news, href: '/yangiliklar' },
    {
      id: 'media',
      label: t.nav.media,
      href: '/media',
      children: [
        { id: 'tv-radio', label: t.nav.tvRadio, href: '/media/teleradio' },
        { id: 'photos', label: t.nav.photos, href: '/media' },
        { id: 'videos', label: t.nav.videos, href: '/media' },
        { id: 'panorama', label: t.nav.panorama, href: '/media' },
      ],
    },
  ];
}
