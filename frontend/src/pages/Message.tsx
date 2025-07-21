
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Tag, FileText, Download } from "lucide-react";

const NewsPage = () => {
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
      title: "Annual Conference Dates Announced",
      date: "May 10, 2025",
      category: "events",
      image: "images/events.jpg",
      excerpt: "Join us for our 2025 Annual Conference focused on innovative approaches to Orthodox education.",
      readingTime: "4 min read"
    },
    {
      id: 2,
      title: "New Curriculum Resources Released",
      date: "April 28, 2025",
      category: "resources",
      image: "images/events.jpg",
      excerpt: "Explore our newly released curriculum materials designed for middle school Sunday School classes.",
      readingTime: "3 min read"
    },
    {
      id: 3,
      title: "Teacher Training Workshop Series",
      date: "April 15, 2025",
      category: "events",
      image: "images/events.jpg",
      excerpt: "Register for our spring teacher training workshops offered online and in several major cities.",
      readingTime: "5 min read"
    },
    {
      id: 4,
      title: "NASSU Partners with Orthodox Publisher",
      date: "April 5, 2025",
      category: "announcements",
      image: "images/events.jpg",
      excerpt: "We're excited to announce our new partnership with Byzantine Press to develop Sunday School materials.",
      readingTime: "2 min read"
    },
    {
      id: 5,
      title: "Summer Youth Camp Registration Open",
      date: "March 20, 2025",
      category: "events",
      image: "images/events.jpg",
      excerpt: "Register your children for our annual Orthodox summer youth camp with specialized programs for all ages.",
      readingTime: "6 min read"
    },
    {
      id: 6,
      title: "New Board Members Welcomed",
      date: "March 12, 2025",
      category: "announcements",
      image: "images/events.jpg",
      excerpt: "NASSU welcomes three new board members bringing expertise in education, finance, and technology.",
      readingTime: "4 min read"
    },
    {
      id: 7,
      title: "Digital Resource Library Expanded",
      date: "February 28, 2025",
      category: "resources",
      image: "images/events.jpg",
      excerpt: "Our digital library now includes over 500 resources for Orthodox Sunday Schools, with new materials for all age groups.",
      readingTime: "3 min read"
    },
    {
      id: 8,
      title: "Regional Conference Success",
      date: "February 15, 2025",
      category: "events",
      image: "images/events.jpg",
      excerpt: "Over 200 Sunday School teachers gathered for our Midwest regional conference focused on engaging Orthodox youth.",
      readingTime: "5 min read"
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: 'url("/lovable-uploads/5da4f0f9-ca7d-466d-a037-8073cbd0e04b.png")',
            filter: 'brightness(0.6)'
          }}
        />
        <div className="hero-overlay absolute inset-0 z-10"></div>
        <div className="container mx-auto px-4 relative z-20 text-center">
          <div className="transition-all duration-1000 transform">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
              News & Messages
            </h1>
            <div className="w-20 h-1 bg-gold-400 mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Stay updated with the latest news, events, and resources from the North America Sunday School Union.
            </p>
          </div>
        </div>
      </section>

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
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="events" 
                  onClick={() => setCurrentTab("events")} 
                  className="whitespace-nowrap px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
                >
                  Events
                </TabsTrigger>
                <TabsTrigger 
                  value="announcements" 
                  onClick={() => setCurrentTab("announcements")} 
                  className="whitespace-nowrap px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
                >
                  Announcements
                </TabsTrigger>
                <TabsTrigger 
                  value="resources" 
                  onClick={() => setCurrentTab("resources")} 
                  className="whitespace-nowrap px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
                >
                  Resources
                </TabsTrigger>
                <TabsTrigger 
                  value="documents" 
                  onClick={() => setCurrentTab("documents")} 
                  className="whitespace-nowrap px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
                >
                  Documents
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
                          Read More →
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
                          Read More →
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
                          Read More →
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
                          Read More →
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
                          <p className="text-sm text-gray-500">PDF Document</p>
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
                          Download
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
                Load More
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
              <h2 className="text-3xl font-bold text-orthodox-blue mb-2">Stay Updated</h2>
              <p className="text-gray-600">
                Subscribe to our newsletter to receive the latest news, events, and resources directly in your inbox.
              </p>
            </div>
            
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-orthodox-blue mr-2" />
                  <span className="text-sm text-gray-700">I agree to receive email communications from NASSU</span>
                </label>
              </div>
              
              <div className="text-center">
                <Button className="w-full p-2 border border-gray-300 rounded-md">Subscribe</Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Upcoming Events Calendar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-orthodox-blue">Upcoming Events</h2>
            <div className="w-20 h-1 bg-orthodox-gold mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg">
              Mark your calendar for these important upcoming NASSU events and gatherings.
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
                  <h3 className="text-xl font-bold mb-2 text-orthodox-blue">Teacher Training Workshop</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>June 15, 2025 | 9:00 AM - 4:00 PM EST</span>
                  </div>
                  <p className="mb-4">
                    A comprehensive workshop designed to equip Sunday School teachers with effective teaching 
                    methods, classroom management strategies, and engaging activities for Orthodox education.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Chicago, IL</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">In-Person</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Teachers</span>
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
                  <h3 className="text-xl font-bold mb-2 text-orthodox-blue">Annual Conference</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>July 10-12, 2025 | Boston, MA</span>
                  </div>
                  <p className="mb-4">
                    NASSU's flagship event bringing together Orthodox educators, clergy, and experts for three days 
                    of learning, networking, and inspiration. Registration includes all sessions, materials, and meals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Boston, MA</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">In-Person</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">All Educators</span>
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
                  <h3 className="text-xl font-bold mb-2 text-orthodox-blue">Youth Summer Camp</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>August 5-12, 2025 | Camp Transfiguration</span>
                  </div>
                  <p className="mb-4">
                    A week-long immersive camp experience for Orthodox youth ages 9-16. Activities include 
                    daily church services, religious education, sports, crafts, music, and outdoor adventures.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">New York State</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Residential</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Youth Ages 9-16</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/events-calendar">
              <Button variant="outline" className="border-orthodox-blue text-orthodox-blue">View Full Calendar</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Feed */}
      <section className="py-16 bg-orthodox-blue text-blue">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
            <div className="w-20 h-1 bg-orthodox-gold mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto">
              Follow us on social media for daily updates, resources, and inspiration for Orthodox Sunday Schools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
