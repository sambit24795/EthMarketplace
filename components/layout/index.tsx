import { FunctionComponent, PropsWithChildren } from "react";
import { Footer } from "..";
import MidSection from "../midSection";
import Navbar from "../navbar";
import HeroContent from "../HeroContent";

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_repeat(5, 1fr)_auto] auto-cols-auto">
      <Navbar />
      <div className="h-96 hero">
        <div className="space-y-8 max-w-7xl sm:mx-auto sm:px-6 lg:px-8 ">
          {children}
        </div>
      </div>
      <div className="h-44 clip-bg-left bg-custom-muted-sky-blue"></div>
      <MidSection />
      <div className="h-44 clip-bg-right bg-custom-muted-sky-blue"></div>
      <HeroContent />
      <Footer />
    </div>
  );
};

export default Layout;
