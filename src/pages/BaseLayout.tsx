import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import LeftBar from './components/LeftBar';

const BaseLayout = () => {
  return (
    <div className="w-full md:flex">
      <Header />
      <LeftBar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default BaseLayout;
