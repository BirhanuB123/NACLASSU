
import React, { useContext } from 'react';
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  Video, 
  Calendar,
  Headphones,
  GraduationCap,
  Palette,
  Map,
  LucideIcon
} from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}
import DonateButton from "@/components/DonateButton";
import JoinUsButton from "@/components/JoinUsButton";
import { LanguageContext } from "@/context/LanguageContext";

const Services = () => {
  const { t } = useContext(LanguageContext);
  
  // Default services data in English
  const defaultServices: ServiceItem[] = [
    {
      title: 'Harp and Kirar Training',
      description: 'Comprehensive, age-appropriate curriculum materials for Sunday School classes.',
      icon: BookOpen
    },
    {
      title: 'Raising Childrens with in Orthodoxy Faith',
      description: 'Professional development and training programs for Sunday School teachers.',
      icon: GraduationCap
    },
    {
      title: 'Strengthening the Unity of the Sunday School',
      description: 'Professional development and training programs for Sunday School teachers.',
      icon: GraduationCap
    },
    {
      title: 'Supporting Monastries',
      description: 'Supporting monastries in their spiritual growth and development.',
      icon: Users
    },
    {
      title: 'Resource Development',
      description: 'Creating and distributing educational materials and resources.',
      icon: Palette
    },
    {
      title: 'Parish Consultation',
      description: 'Guidance and support for parish education programs.',
      icon: Users
    }
  ];

  // Helper function to safely get translations with fallbacks
  const getTranslation = (key: string, fallback: any = '') => {
    try {
      const result = t(key);
      return result || fallback;
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return fallback;
    }
  };

  // Safely get services data with fallback to default services
  let servicesData;
  try {
    servicesData = t('services_section.services_page.services', defaultServices);
  } catch (error) {
    console.warn('Error loading services data, using defaults');
    servicesData = defaultServices;
  }
  
  // Ensure services is always an array with proper fallbacks
  const services = Array.isArray(servicesData) 
    ? servicesData.map((service: any, index: number) => ({
        title: service?.title || defaultServices[index]?.title || `Service ${index + 1}`,
        description: service?.description || defaultServices[index]?.description || '',
        icon: [
          BookOpen,       // Sunday School Curriculum
          GraduationCap,  // Teacher Training
          Calendar,       // Youth Events
          Palette,        // Resource Development
          Video,          // Webinars and Online Classes
          Users,          // Parent Support
          Headphones,     // Audio Resources
          Map             // Parish Consultation
        ][index] || BookOpen // Fallback to BookOpen if index is out of bounds
      }))
    : defaultServices; // Fallback to defaultServices if servicesData is not an array

  return (
    <>
      <PageHeader title={getTranslation('services_section.services_page.title', 'Our Services')} background="">
        <p className="text-lg text-gray-100">
          {getTranslation('services_section.services_page.subtitle', 'Supporting Orthodox Education in North America')}
        </p>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">
              {getTranslation('services_section.services_page.what_we_offer.title', 'What We Offer')}
            </h2>
            <p className="text-lg text-gray-700">
              {getTranslation(
                'services_section.services_page.what_we_offer.description',
                'EOTC NACLAASSU provides a wide range of services designed to support Orthodox Christian education in parishes across North America.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-church-100 rounded-full">
                      {React.createElement(service.icon, { className: "w-6 h-6 text-church-700" })}
                    </div>
                    <h3 className="text-xl font-serif font-bold mt-1">{service.title}</h3>
                  </div>
                  <p className="text-gray-700 flex-grow">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title">
              {getTranslation('services_section.services_page.how_we_help', 'How We Can Help Your Parish')}
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h3 className="font-serif text-2xl font-bold mb-6 text-church-800">
                {getTranslation('services_section.services_page.our_process', 'Our Process')}
              </h3>
              
              <div className="space-y-8">
                {(getTranslation('services_section.services_page.process_steps', []) as Array<{ title: string; description: string }>).map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-church-100 flex items-center justify-center text-church-800 font-bold text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        {step?.title || `Step ${index + 1}`}
                      </h4>
                      <p className="text-gray-600">
                        {step?.description || 'Description not available'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <DonateButton className="flex-1" />
              <JoinUsButton className="flex-1" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-church-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">
            {getTranslation('services_section.services_page.request_services', 'Request Our Services')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {getTranslation(
              'services_section.services_page.request_description',
              'Interested in bringing EOTC NACLAASSU resources to your parish? Reach out to us today to discuss how we can support your Sunday School program.'
            )}
          </p>
          <div className="bg-church-700 p-6 rounded-lg max-w-2xl mx-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">
                  {getTranslation('services_section.services_page.form_labels.parish_name', 'Parish Name')}
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded bg-church-600 border border-church-500 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  placeholder={getTranslation('services_section.services_page.form_labels.parish_name_placeholder', 'Enter your parish name')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">
                  {getTranslation('services_section.services_page.form_labels.your_name', 'Your Name')}
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded bg-church-600 border border-church-500 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  placeholder={getTranslation('services_section.services_page.form_labels.your_name_placeholder', 'Enter your full name')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">
                  {getTranslation('services_section.services_page.form_labels.email', 'Email')}
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 rounded bg-church-600 border border-church-500 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  placeholder={getTranslation('services_section.services_page.form_labels.email_placeholder', 'Enter your email address')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">
                  {getTranslation('services_section.services_page.form_labels.phone', 'Phone')}
                </label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-2 rounded bg-church-600 border border-church-500 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  placeholder={getTranslation('services_section.services_page.form_labels.phone_placeholder', 'Enter your phone number')}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-200">
                  {getTranslation('services_section.services_page.form_labels.message', 'Message')}
                </label>
                <textarea 
                  className="w-full px-4 py-2 rounded bg-church-600 border border-church-500 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gold-400 h-32"
                  placeholder={getTranslation('services_section.services_page.form_labels.message_placeholder', 'Enter your question or comment')}
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-center">
                <button 
                  type="submit" 
                  className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-2 px-8 rounded-full transition-colors duration-300"
                >
                  {getTranslation('services_section.services_page.form_labels.submit', 'Send Message')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
