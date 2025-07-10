
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Cross, HeartHandshake } from "lucide-react";
import ValueCard from "./ValueCard";
import { useLanguage } from "@/context/LanguageContext";

const CoreValuesSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">{t('core_values')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard 
            icon={BookOpen} 
            title={t('educational_excellence')} 
            description={t('core_values_section.educational_excellence')}
          />
          
          <ValueCard 
            icon={Cross} 
            title={t('orthodox_faith')} 
            description={t('core_values_section.orthodox_faith')}
          />
          
          <ValueCard 
            icon={HeartHandshake} 
            title={t('community')} 
            description={t('core_values_section.community')}
          />
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-church-700 hover:bg-church-800 text-white">
            <Link to="/values">{t('core_values_section.learn_more')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
