
import { BookOpen, Users, Calendar, Book, Mic, BookOpenText, Users2, School, Mic2, HeartHandshake } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { useLanguage } from "@/context/LanguageContext";

const ServicesSection = () => {
  const { t } = useLanguage();
  
  // Get services from translations
  const services = [
    {
      icon: BookOpen,
      title: t('services_section.services_page.services.0.title'),
      description: t('services_section.services_page.services.0.description')
    },
    {
      icon: Users,
      title: t('services_section.services_page.services.1.title'),
      description: t('services_section.services_page.services.1.description')
    },
    {
      icon: Calendar,
      title: t('services_section.services_page.services.2.title'),
      description: t('services_section.services_page.services.2.description')
    },
    {
      icon: BookOpenText,
      title: t('services_section.services_page.services.3.title'),
      description: t('services_section.services_page.services.3.description')
    },
    {
      icon: School,
      title: t('services_section.services_page.services.4.title'),
      description: t('services_section.services_page.services.4.description')
    },
    {
      icon: Users2,
      title: t('services_section.services_page.services.5.title'),
      description: t('services_section.services_page.services.5.description')
    },
    {
      icon: Mic2,
      title: t('services_section.services_page.services.6.title'),
      description: t('services_section.services_page.services.6.description')
    },
    {
      icon: HeartHandshake,
      title: t('services_section.services_page.services.7.title'),
      description: t('services_section.services_page.services.7.description')
    }
  ];
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('services_section.services_page.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services_section.services_page.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon} 
              title={service.title} 
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
