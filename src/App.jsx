import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoadingSpinner from './components/common/LoadingSpinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const GeographyPage = lazy(() => import('./pages/GeographyPage'));
const ClimatePage = lazy(() => import('./pages/geography/ClimatePage'));
const WaterPage = lazy(() => import('./pages/geography/WaterPage'));
const SoilPage = lazy(() => import('./pages/geography/SoilPage'));
const FloraFaunaPage = lazy(() => import('./pages/geography/FloraFaunaPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const AncientPage = lazy(() => import('./pages/history/AncientPage'));
const KhorezmshahsPage = lazy(() => import('./pages/history/KhorezmshahsPage'));
const KhivaKhanatePage = lazy(() => import('./pages/history/KhivaKhanatePage'));
const HistoryTimelinePage = lazy(() => import('./pages/history/HistoryTimelinePage'));
const DistrictsPage = lazy(() => import('./pages/DistrictsPage'));
const DistrictDetailPage = lazy(() => import('./pages/DistrictDetailPage'));
const TourismPage = lazy(() => import('./pages/TourismPage'));
const AttractionDetailPage = lazy(() => import('./pages/AttractionDetailPage'));
const PersonalitiesPage = lazy(() => import('./pages/PersonalitiesPage'));
const PersonalityDetailPage = lazy(() => import('./pages/PersonalityDetailPage'));
const CulturePage = lazy(() => import('./pages/CulturePage'));
const DictionaryPage = lazy(() => import('./pages/DictionaryPage'));
const CuisinePage = lazy(() => import('./pages/CuisinePage'));
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage'));
const EconomyPage = lazy(() => import('./pages/EconomyPage'));
const EcologyPage = lazy(() => import('./pages/EcologyPage'));
const EducationPage = lazy(() => import('./pages/EducationPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'));
const MediaPage = lazy(() => import('./pages/MediaPage'));
const TvRadioPage = lazy(() => import('./pages/media/TvRadioPage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function FallbackLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <LoadingSpinner />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/geografiya" element={<GeographyPage />} />
          <Route path="/geografiya/iqlim" element={<ClimatePage />} />
          <Route path="/geografiya/suv-resurslari" element={<WaterPage />} />
          <Route path="/geografiya/tuproq" element={<SoilPage />} />
          <Route path="/geografiya/flora-fauna" element={<FloraFaunaPage />} />

          <Route path="/tarix" element={<HistoryPage />} />
          <Route path="/tarix/qadimgi-xorazm" element={<AncientPage />} />
          <Route path="/tarix/xorazmshohlar" element={<KhorezmshahsPage />} />
          <Route path="/tarix/xiva-xonligi" element={<KhivaKhanatePage />} />
          <Route path="/tarix/xorazm-tarixi" element={<HistoryTimelinePage />} />

          <Route path="/tumanlar" element={<DistrictsPage />} />
          <Route path="/tumanlar/:slug" element={<DistrictDetailPage />} />

          <Route path="/turizm" element={<TourismPage />} />
          <Route path="/turizm/:slug" element={<AttractionDetailPage />} />

          <Route path="/shaxslar" element={<PersonalitiesPage />} />
          <Route path="/shaxslar/:slug" element={<PersonalityDetailPage />} />

          <Route path="/madaniyat" element={<CulturePage />} />
          <Route path="/madaniyat/lugat" element={<DictionaryPage />} />
          <Route path="/lugat" element={<DictionaryPage />} />

          <Route path="/taomlar" element={<CuisinePage />} />
          <Route path="/taomlar/:slug" element={<RecipeDetailPage />} />

          <Route path="/iqtisodiyot" element={<EconomyPage />} />
          <Route path="/ekologiya" element={<EcologyPage />} />
          <Route path="/ilm-fan" element={<EducationPage />} />

          <Route path="/yangiliklar" element={<NewsPage />} />
          <Route path="/yangiliklar/:slug" element={<ArticleDetailPage />} />

          <Route path="/media" element={<MediaPage />} />
          <Route path="/media/teleradio" element={<TvRadioPage />} />
          <Route path="/xarita" element={<MapPage />} />
          <Route path="/ai-yordamchi" element={<AIAssistantPage />} />
          <Route path="/qidiruv" element={<SearchPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
