
import { useState, useEffect, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Tag, FileText, Download } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { LanguageContext } from "@/context/LanguageContext";

const NewsPage = () => {
  const { t } = useContext(LanguageContext);
  
  // State for filter options
  const [currentTab, setCurrentTab] = useState("all");
  const [visibleItems, setVisibleItems] = useState(8);
  const itemsPerPage = 8; // Number of items to load per page
  
  useEffect(() => {
    // Any initialization code can go here
    return () => {
      // Cleanup function
    };
  }, []);

  // Document data from public/documents
  const documents = [
    { name: "19th year NASSU.pdf", path: "/documents/19th year NASSU.pdf" },
    { name: "2024 METSHET FOR NASSU.pdf", path: "/documents/2024 METSHET FOR NASSU.pdf" },
    { name: "2025 NASSU LIDET.pdf", path: "/documents/2025 NASSU LIDET.pdf" },
    { name: "MICHIGAN SUNDAY SCHOOL THE 4 COUNCILS AND CREED.pdf", path: "/documents/MICHIGAN SUNDAY SCHOOL THE 4 COUNCILS AND CREED.pdf" },
    { name: "NASSU ABIY TSOME.pdf", path: "/documents/NASSU ABIY TSOME.pdf" },
    { name: "NASSU GEBRHER.pdf", path: "/documents/NASSU GEBRHER.pdf" },
    { name: "NASSU KIDIST.pdf", path: "/documents/NASSU KIDIST.pdf" },
    { name: "NASSU LIDET BEAL 2024.pdf", path: "/documents/NASSU LIDET BEAL 2024.pdf" },
    { name: "NASSU MEKURAB.pdf", path: "/documents/NASSU MEKURAB.pdf" },
    { name: "NASSU METSAGU.pdf", path: "/documents/NASSU METSAGU.pdf" },
    { name: "NASSU NEW YEAR.pdf", path: "/documents/NASSU NEW YEAR.pdf" },
    { name: "NASSU NICODIMUS.pdf", path: "/documents/NASSU NICODIMUS.pdf" },
    { name: "NASSU SIBKET BIRHAN AND NOLAWI.pdf", path: "/documents/NASSU SIBKET BIRHAN AND NOLAWI.pdf" },
    { name: "NASSU SPIRITUAL ETHICS 1.pdf", path: "/documents/NASSU SPIRITUAL ETHICS 1.pdf" },
    { name: "NASSU TSOME NINEVEH (NENEWE).pdf", path: "/documents/NASSU TSOME NINEVEH (NENEWE).pdf" },
    { name: "NASSU WOREHA TSIGE.pdf", path: "/documents/NASSU WOREHA TSIGE.pdf" },
    { name: "POEM FOR NASSU 2018.pdf", path: "/documents/POEM FOR NASSU 2018.pdf" },
    { name: "TAKS SUNDAY SCHOOL COURSE.pdf", path: "/documents/TAKS SUNDAY SCHOOL COURSE.pdf" },
    { name: "THE 4 CONVENTION AND THE CREED IN ENGLISH.pdf", path: "/documents/THE 4 CONVENTION AND THE CREED IN ENGLISH.pdf" },
  ];

  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: t('news_page.news_items.annual_conference.title'),
      date: "May 10, 2025",
      category: "events",
      image: "images/events.jpg",
      excerpt: t('news_page.news_items.annual_conference.excerpt'),
      readingTime: t('news_page.news_items.annual_conference.reading_time')
    },
    {
      id: 2,
      title: t('news_page.news_items.new_curriculum.title'),
      date: "April 28, 2025",
      category: "resources",
      image: "images/events.jpg",
      excerpt: t('news_page.news_items.new_curriculum.excerpt'),
      readingTime: t('news_page.news_items.new_curriculum.reading_time')
    },
    {
      id: 3,
      title: t('news_page.news_items.teacher_training.title'),
      date: "April 15, 2025",
      category: "events",
      image: "images/events.jpg",
      excerpt: t('news_page.news_items.teacher_training.excerpt'),
      readingTime: t('news_page.news_items.teacher_training.reading_time')
    },
    {
      id: 4,
      title: t('news_page.news_items.partnership.title'),
      date: "April 5, 2025",
      category: "announcements",
      image: "images/events.jpg",
      excerpt: t('news_page.news_items.partnership.excerpt'),
      readingTime: t('news_page.news_items.partnership.reading_time')
    },
    {
      id: 5,
      title: t('news_page.news_items.summer_camp.title'),
      date: "March 20, 2025",
      category: "events",
      image: "images/events.jpg",
      excerpt: t('news_page.news_items.summer_camp.excerpt'),
      readingTime: t('news_page.news_items.summer_camp.reading_time')
    },
    {
      id: 6,
      title: t('news_page.news_items.new_board.title'),
      date: "March 12, 2025",
      category: "announcements",
      image: "images/events.jpg",
      excerpt: t('news_page.news_items.new_board.excerpt'),
      readingTime: t('news_page.news_items.new_board.reading_time')
    },
    {
      id: 7,
      title: t('news_page.news_items.digital_library.title'),
      date: "February 28, 2025",
      category: "resources",
      image: "images/events.jpg",
      excerpt: t('news_page.news_items.digital_library.excerpt'),
      readingTime: t('news_page.news_items.digital_library.reading_time')
    },
    {
      id: 8,
      title: t('news_page.news_items.regional_conference.title'),
      date: "February 15, 2025",
      category: "events",
      image: "images/events.jpg",
      excerpt: t('news_page.news_items.regional_conference.excerpt'),
      readingTime: t('news_page.news_items.regional_conference.reading_time')
    }
  ];

  // Filter news based on selected tab
  const filteredNews = (currentTab === "all" 
    ? newsItems 
    : newsItems.filter(item => item.category === currentTab));

  // Get current items to display
  const currentItems = filteredNews.slice(0, visibleItems);

  // Function to load more items
  const loadMore = () => {
    setVisibleItems(prev => prev + itemsPerPage);
  };

  // Reset visible items when tab changes
  useEffect(() => {
    setVisibleItems(itemsPerPage);
  }, [currentTab]);

  return (
    <>
      <PageHeader title={t('news_page.title')}>
        <p className="text-lg text-gray-100">
          {t('news_page.subtitle')}
        </p>
      </PageHeader>

      {/* News & Events Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="mb-8">
            <div className="mb-8 overflow-x-auto pb-2">
              <TabsList className="inline-flex w-auto min-w-full px-4 md:px-0">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setCurrentTab("all")} 
                  className="whitespace-nowrap px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
                >
                  {t('news_page.tabs.all')}
                </TabsTrigger>
                <TabsTrigger 
                  value="events" 
                  onClick={() => setCurrentTab("events")} 
                  className="whitespace-nowrap px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
                >
                  {t('news_page.tabs.events')}
                </TabsTrigger>
                <TabsTrigger 
                  value="announcements" 
                  onClick={() => setCurrentTab("announcements")} 
                  className="whitespace-nowrap px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
                >
                  {t('news_page.tabs.announcements')}
                </TabsTrigger>
                <TabsTrigger 
                  value="resources" 
                  onClick={() => setCurrentTab("resources")} 
                  className="whitespace-nowrap px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
                >
                  {t('news_page.tabs.resources')}
                </TabsTrigger>
                <TabsTrigger 
                  value="documents" 
                  onClick={() => setCurrentTab("documents")} 
                  className="whitespace-nowrap px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
                >
                  {t('news_page.tabs.documents')}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{item.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{item.readingTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-orthodox-blue">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Tag className="h-4 w-4 mr-1 text-orthodox-gold" />
                          <span className="capitalize">{item.category}</span>
                        </div>
                        <Link to={`/news/${item.id}`} className="text-orthodox-blue font-medium hover:text-orthodox-gold">
                          {t('news_page.actions.read_more')}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{item.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{item.readingTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-orthodox-blue">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Tag className="h-4 w-4 mr-1 text-orthodox-gold" />
                          <span className="capitalize">{item.category}</span>
                        </div>
                        <Link to={`/news/${item.id}`} className="text-orthodox-blue font-medium hover:text-orthodox-gold">
                          {t('news_page.actions.read_more')}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="announcements" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{item.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{item.readingTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-orthodox-blue">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Tag className="h-4 w-4 mr-1 text-orthodox-gold" />
                          <span className="capitalize">{item.category}</span>
                        </div>
                        <Link to={`/news/${item.id}`} className="text-orthodox-blue font-medium hover:text-orthodox-gold">
                          {t('news_page.actions.read_more')}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{item.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{item.readingTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-orthodox-blue">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Tag className="h-4 w-4 mr-1 text-orthodox-gold" />
                          <span className="capitalize">{item.category}</span>
                        </div>
                        <Link to={`/news/${item.id}`} className="text-orthodox-blue font-medium hover:text-orthodox-gold">
                          {t('news_page.actions.read_more')}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 bg-orthodox-blue/10 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-orthodox-blue" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {doc.name.replace(/\.pdf$/i, '')}
                          </h3>
                          <p className="text-sm text-gray-500">{t('news_page.document_types.pdf_document')}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <a
                          href={doc.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-orthodox-blue bg-orthodox-blue/10 hover:bg-orthodox-blue/20"
                        >
                          <Download className="h-3.5 w-3.5 mr-1.5" />
                          {t('news_page.actions.download')}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {visibleItems < filteredNews.length && (
            <div className="text-center mt-12">
              <Button 
                onClick={loadMore}
                className="w-full p-2 border border-gray-300 rounded-md hover:bg-orthodox-blue hover:text-white transition-colors"
              >
                {t('news_page.actions.load_more')}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-orthodox-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-orthodox-blue mb-2">{t('news_page.newsletter.title')}</h2>
              <p className="text-gray-600">
                {t('news_page.newsletter.description')}
              </p>
            </div>
            
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">{t('news_page.newsletter.form.first_name')}</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder={t('news_page.newsletter.form.first_name_placeholder')}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">{t('news_page.newsletter.form.last_name')}</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder={t('news_page.newsletter.form.last_name_placeholder')}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('news_page.newsletter.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={t('news_page.newsletter.form.email_placeholder')}
                />
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-orthodox-blue mr-2" />
                  <span className="text-sm text-gray-700">{t('news_page.newsletter.form.agreement')}</span>
                </label>
              </div>
              
              <div className="text-center">
                <Button className="w-full p-2 border border-gray-300 rounded-md">{t('news_page.actions.subscribe')}</Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Upcoming Events Calendar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-orthodox-blue">{t('news_page.upcoming_events.title')}</h2>
            <div className="w-20 h-1 bg-orthodox-gold mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              {t('news_page.upcoming_events.subtitle')}
            </p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="md:flex items-start">
                <div className="md:w-32 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="bg-orthodox-blue text-white text-center rounded-lg overflow-hidden">
                    <div className="bg-orthodox-gold py-1">
                      <span className="text-sm font-bold">JUNE</span>
                    </div>
                    <div className="py-3">
                      <span className="text-3xl font-bold">15</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-orthodox-blue">{t('news_page.upcoming_events.teacher_workshop.title')}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>June 15, 2025 | 9:00 AM - 4:00 PM EST</span>
                  </div>
                  <p className="mb-4">
                    {t('news_page.upcoming_events.teacher_workshop.description')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{t('news_page.upcoming_events.teacher_workshop.location')}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{t('news_page.upcoming_events.teacher_workshop.type')}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{t('news_page.upcoming_events.teacher_workshop.audience')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="md:flex items-start">
                <div className="md:w-32 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="bg-orthodox-blue text-white text-center rounded-lg overflow-hidden">
                    <div className="bg-orthodox-gold py-1">
                      <span className="text-sm font-bold">JULY</span>
                    </div>
                    <div className="py-3">
                      <span className="text-3xl font-bold">10-12</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-orthodox-blue">{t('news_page.upcoming_events.annual_conference.title')}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>July 10-12, 2025 | Boston, MA</span>
                  </div>
                  <p className="mb-4">
                    {t('news_page.upcoming_events.annual_conference.description')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{t('news_page.upcoming_events.annual_conference.location')}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{t('news_page.upcoming_events.annual_conference.type')}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{t('news_page.upcoming_events.annual_conference.audience')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="md:flex items-start">
                <div className="md:w-32 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="bg-orthodox-blue text-white text-center rounded-lg overflow-hidden">
                    <div className="bg-orthodox-gold py-1">
                      <span className="text-sm font-bold">AUGUST</span>
                    </div>
                    <div className="py-3">
                      <span className="text-3xl font-bold">5-12</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-orthodox-blue">{t('news_page.upcoming_events.youth_camp.title')}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>August 5-12, 2025 | Camp Transfiguration</span>
                  </div>
                  <p className="mb-4">
                    {t('news_page.upcoming_events.youth_camp.description')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{t('news_page.upcoming_events.youth_camp.location')}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{t('news_page.upcoming_events.youth_camp.type')}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{t('news_page.upcoming_events.youth_camp.audience')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/events-calendar">
              <Button variant="outline" className="border-orthodox-blue text-orthodox-blue">{t('news_page.upcoming_events.view_calendar')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Feed */}
      <section className="py-16 bg-orthodox-blue text-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('news_page.social_media.title')}</h2>
            <div className="w-20 h-1 bg-orthodox-gold mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto">
              {t('news_page.social_media.description')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;
