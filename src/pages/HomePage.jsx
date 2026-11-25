import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import HeroCarousel from '../components/homepage/HeroCarousel';
import CategoryGrid from '../components/homepage/CategoryGrid';
import StatisticsSection from '../components/homepage/StatisticsSection';
import LatestNews from '../components/homepage/LatestNews';
import FeaturedSection from '../components/homepage/FeaturedSection';
import PersonalitiesStrip from '../components/homepage/PersonalitiesStrip';
import MapPreview from '../components/homepage/MapPreview';
import LatestArticles from '../components/homepage/LatestArticles';
import NewsletterBanner from '../components/homepage/NewsletterBanner';

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <title>{t.nav.home}</title>
        <meta name="description" content={t.metaDescription} />
      </Helmet>
      <HeroCarousel />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryGrid />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-1">
          <div className="lg:col-span-7">
            <StatisticsSection />
          </div>
          <div className="lg:col-span-5">
            <LatestNews />
          </div>
        </div>
        <FeaturedSection />
        <PersonalitiesStrip />
      </div>
      <MapPreview />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LatestArticles />
        <NewsletterBanner />
      </div>
    </>
  );
}
