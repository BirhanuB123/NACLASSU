
import { useState, useEffect } from "react";
import DonateButton from "@/components/DonateButton";
import JoinUsButton from "@/components/JoinUsButton";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url("/lovable-uploads/5da4f0f9-ca7d-466d-a037-8073cbd0e04b.png")',
          filter: 'brightness(0.6)'
        }}
      />
      <div className="hero-overlay absolute inset-0 z-10"></div>
      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
            <div>{t('home_title_line1')}</div>
            <div>{t('home_title_line2')}</div>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DonateButton large />
            <JoinUsButton large>
              {t('join_us')}
            </JoinUsButton>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#welcome" className="text-white opacity-75 hover:opacity-100 transition-opacity">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
