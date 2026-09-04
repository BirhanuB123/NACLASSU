
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const WelcomeSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="welcome" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2">
            <h2 className="section-title text-left mb-6">{t('about_page.title')}</h2>
            <p className="text-lg mb-6 text-gray-700">
              {t('about_page.story_paragraphs.0')}
            </p>
            <p className="text-lg mb-8 text-gray-700">
              {t('about_page.story_paragraphs.1')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-church-700 hover:bg-church-800 text-white">
                <Link to="/about">{t('about')}</Link>
              </Button>
              <Button asChild variant="outline" className="border-church-200 hover:bg-church-50">
                <Link to="/services">{t('services')}</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-500 rounded-lg"></div>
              <img 
                src="https://res.cloudinary.com/drersaifa/image/upload/v1788440634/nassu/gallery/1788440633752_Mariyam_enate.jpg" 
                alt="Sunday School Children" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                style={{ maxHeight: "500px" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
