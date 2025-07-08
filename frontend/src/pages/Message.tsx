
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Tag, FileText, Download } from "lucide-react";

const NewsPage = () => {
  // State for filter options
  const [currentTab, setCurrentTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to show per page
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  // Document data from public/documents
  const documents = [
    { name: "19th year NASSU NASSU.pdf", path: "/documents/19th year NASSU NASSU.pdf" },
    { name: "2024 METSHET FOR NASSU and NASSU.pdf", path: "/documents/2024 METSHET FOR NASSU and NASSU.pdf" },
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
      <div 
        className="relative bg-cover bg-center h-[40vh]" 
        style={{ backgroundImage: "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDQ0NDQ8PDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDw0NFSsZFRkrKy0rKystKy0rLS03LS0tNy03NysrKy0rLSsrKy0rKy0tKy0rKysrKysrLS0rKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAaAAEBAQADAQAAAAAAAAAAAAABAAIDBQYE/8QAFxABAQEBAAAAAAAAAAAAAAAAAAEREv/EABoBAQEBAQEBAQAAAAAAAAAAAAEAAgMEBQb/xAAYEQEBAQEBAAAAAAAAAAAAAAAAEQESAv/aAAwDAQACEQMRAD8A8Egn3H50oIaUkGUkqGdKFQBFZprLLWKs01mhrBWK1WaG8ZrNarNTeMVmtVmprBWaaE2KzSKmsZoNAaFCSISQ10xJINlJApIJPSaNGrXufCK0IaiFoZRCFrOmILWdBhrNVoo1rBWaazWWsDNNZobwVmms1N4KxWqymsFZpotTWCs00VNYKFQGgkE0kCNaxBIOh06yokUgi9EmTr2vhnVrOrRph1azq1lQ6Bo1kw0Wi0Aw2s2qs2hrMOs2pmiNZirNNZtDWCs1WihvBWabWU1irJrNTWKilmprACARQaE0EgGsKqQazUkE01oCSegWsrXtfHh1azq1nVGtGs6tBh0DRayobVazotDUOijRoMNrNWs2hrMVrNptZoazBRarWbQ1itZprKaxUKhNYqzTQmsAIRFBFBQIBRCWtYikGwliSd3q1nVr118qHVrOrQo1o0aNBjWgaNZUNqGjUYdZ0aNDUNo0aLQYqzptZoazFazarRQ1iGoVNCpBFVmmhFBIEA0IoEUFJJa1iSQaxJJF22rWdWvRXzY1q1nRqqjejWdWhRrVrGjQY1aNGjRTDaNGrQYtGjRqahtZVoBVCFRVCGppCqhFBJFAgEVJIhUgFFJacBSDaBCTsdWs6Ndq8Eb1axq1VRvRrOrRTGtGjRoqjWjQEY1aNC0KILRUULUEYqEk0AQiEQiEcWCmMo4sRgFawYDAsOLE1mArCGozhwpGDEUlH06tZ1a3XijWpnVoqjSZ1aqo1q1nVqUa0azqRh1aAVDqGoUxJJNZgWHDirWeWMONYsFbzwzgxvFgreeWcGN4sVPLGDlyWDBTyxgxvFiXLGJsIxnDhSMGLEkokkjGtWjVpeGHVoSUOrRqSjS1klHVoSUSOJHMRRFbzypESq6Z5ZkOEiumeRiw4cFa5ZWNYsVazyxixvFip5YwY3iwU8uPFjdgxUcsYsaxYquWLFjYxVcs4saxYlGcRxKqONM6tNeBrTrK1VQlnSajqBKhMBiOYSDBXTPJMUIreYsRMgrpmCQ4TIK3nkYcJwV0zyzixrEq1nlnFjeDBWuWcGN4MS5YsWNYKhGbBjeCw0RjFjVgQjOLGghBiKSj5kkXzUkkigSiWYUcxqEQxVvMMajMagrpmGEGJvMLQhgdMwwqNB0zFikMMgdMxYsKxN5gxHDga5YVjVgsKjODGkmdxx2BuwUs7jCNgTMGDGkhGcRSUfGkmnyykkEQkjDEi3jUMKDeGRoIN4Y0km8ahiQdcakMSDpjUJSdcUhSDeHFgQbVgxJAWMpFkCxIs6KzYUWNZSSZSSSf/9k=')" }}
       >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
          <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">News & Messages</h1>
            <div className="w-20 h-1 bg-orthodox-gold mb-6"></div>
            <p className="text-lg text-white max-w-2xl">
              Stay updated with the latest news, events, and resources from the North America Sunday School Union.
            </p>
          </div>
        </div>
      </div>

      {/* News & Events Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all" onClick={() => setCurrentTab("all")} className="px-4 py-2">All</TabsTrigger>
                <TabsTrigger value="events" onClick={() => setCurrentTab("events")} className="px-4 py-2">Events</TabsTrigger>
                <TabsTrigger value="announcements" onClick={() => setCurrentTab("announcements")} className="px-4 py-2">Announcements</TabsTrigger>
                <TabsTrigger value="resources" onClick={() => setCurrentTab("resources")} className="px-4 py-2">Resources</TabsTrigger>
                <TabsTrigger value="documents" onClick={() => setCurrentTab("documents")} className="px-4 py-2">Documents</TabsTrigger>
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
          
          <div className="flex justify-center space-x-8">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orthodox-gold transition-colors"
              >
              <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orthodox-gold transition-colors"
              >
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orthodox-gold transition-colors"
              >
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orthodox-gold transition-colors"
              >
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
        </div>

        </div>
      </section>
    </div>
  );
};

export default NewsPage;
