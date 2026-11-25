import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <Header />
      <Navigation />
      <main className="flex-1">{children || <Outlet />}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
