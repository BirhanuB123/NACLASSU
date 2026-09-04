import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { LanguageContext } from '@/context/LanguageContext';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);
  const [newsItem, setNewsItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sample news data - in a real app, this would come from an API
  const allNewsItems = [
    {
      id: 1,
      title: t('news_page.news_items.annual_conference.title'),
      date: "May 10, 2025",
      category: "events",
      image: "https://res.cloudinary.com/drersaifa/image/upload/v1788440633/nassu/gallery/1788440632831_events.jpg",
      excerpt: t('news_page.news_items.annual_conference.excerpt'),
      readingTime: t('news_page.news_items.annual_conference.reading_time'),
      content: `We are excited to announce the dates for our 2025 Annual Conference, which will focus on innovative approaches to Orthodox education. This year's conference will bring together educators, administrators, and community leaders from across North America, the Caribbean, and Latin America.

The conference will feature keynote presentations from renowned Orthodox educators, interactive workshops on curriculum development, and networking opportunities with fellow Sunday School teachers and administrators. Topics will include:

• Modern teaching methodologies in Orthodox education
• Integrating technology into Sunday School classrooms
• Developing age-appropriate curriculum materials
• Building strong community partnerships
• Supporting students with diverse learning needs

Registration will open in the coming weeks, and early bird pricing will be available. We encourage all members of the EOTC NACLAASSU community to attend and contribute to the future of Orthodox education.`
    },
    {
      id: 2,
      title: t('news_page.news_items.new_curriculum.title'),
      date: "April 28, 2025",
      category: "resources",
      image: "https://res.cloudinary.com/drersaifa/image/upload/v1788440633/nassu/gallery/1788440632831_events.jpg",
      excerpt: t('news_page.news_items.new_curriculum.excerpt'),
      readingTime: t('news_page.news_items.new_curriculum.reading_time'),
      content: `We are pleased to announce the release of our newly developed curriculum materials designed specifically for middle school Sunday School classes. This comprehensive curriculum has been developed by a team of experienced Orthodox educators and theologians.

The new curriculum includes:

• Age-appropriate lesson plans aligned with Orthodox teachings
• Interactive activities and discussion guides
• Multimedia resources including videos and presentations
• Assessment tools to track student progress
• Teacher training materials and guides

These materials are now available for download in the Resources section of our website. We encourage all Sunday School teachers to review and implement these materials in their classrooms.`
    },
    {
      id: 3,
      title: t('news_page.news_items.teacher_training.title'),
      date: "April 15, 2025",
      category: "events",
      image: "https://res.cloudinary.com/drersaifa/image/upload/v1788440633/nassu/gallery/1788440632831_events.jpg",
      excerpt: t('news_page.news_items.teacher_training.excerpt'),
      readingTime: t('news_page.news_items.teacher_training.reading_time'),
      content: `Registration is now open for our spring teacher training workshop series. These workshops are designed to equip Sunday School teachers with the skills and knowledge needed to effectively teach Orthodox faith and traditions.

Workshops will be offered both online and in-person in several major cities across North America. Topics covered will include:

• Effective classroom management techniques
• Creating engaging lesson plans
• Understanding Orthodox theology for teaching
• Working with students of different age groups
• Building relationships with parents and the community

Both new and experienced teachers are welcome. Continuing education credits will be available for participants.`
    },
    {
      id: 4,
      title: t('news_page.news_items.partnership.title'),
      date: "April 5, 2025",
      category: "announcements",
      image: "/images/events.jpg",
      excerpt: t('news_page.news_items.partnership.excerpt'),
      readingTime: t('news_page.news_items.partnership.reading_time'),
      content: `EOTC NACLAASSU is excited to announce our new partnership with Byzantine Press, a leading publisher of Orthodox educational materials. This partnership will enable us to develop and distribute high-quality Sunday School materials to our member churches.

Through this collaboration, we will:

• Co-develop new curriculum materials
• Provide access to existing Byzantine Press resources at discounted rates
• Create custom materials for our specific needs
• Support the development of bilingual materials

This partnership represents a significant step forward in our mission to provide excellent educational resources to Orthodox Sunday Schools across our archdiocese.`
    },
    {
      id: 5,
      title: t('news_page.news_items.summer_camp.title'),
      date: "March 20, 2025",
      category: "events",
      image: "/images/events.jpg",
      excerpt: t('news_page.news_items.summer_camp.excerpt'),
      readingTime: t('news_page.news_items.summer_camp.excerpt'),
      content: `Registration is now open for our annual Orthodox summer youth camp! This year's camp will feature specialized programs for children and youth of all ages, combining faith education with fun activities and community building.

Programs include:

• Junior Camp (ages 6-10): Age-appropriate activities, crafts, and lessons
• Middle School Camp (ages 11-14): Interactive learning and team-building
• High School Camp (ages 15-18): Leadership development and deeper theological discussions

All programs include daily prayer services, educational sessions, recreational activities, and opportunities to build lasting friendships within the Orthodox community.`
    },
    {
      id: 6,
      title: t('news_page.news_items.new_board.title'),
      date: "March 12, 2025",
      category: "announcements",
      image: "/images/events.jpg",
      excerpt: t('news_page.news_items.new_board.excerpt'),
      readingTime: t('news_page.news_items.new_board.reading_time'),
      content: `EOTC NACLAASSU is pleased to welcome three new members to our board of directors. These individuals bring valuable expertise in education, finance, and technology that will help guide our organization forward.

Our new board members include:

• Dr. Sarah Tekle - Education specialist with 20 years of experience in curriculum development
• Mr. Michael Gebremariam - Financial advisor with expertise in nonprofit management
• Ms. Rebecca Yohannes - Technology consultant specializing in educational platforms

We look forward to their contributions as we continue to serve Orthodox Sunday Schools across North America, the Caribbean, and Latin America.`
    },
    {
      id: 7,
      title: t('news_page.news_items.digital_library.title'),
      date: "February 28, 2025",
      category: "resources",
      image: "/images/events.jpg",
      excerpt: t('news_page.news_items.digital_library.excerpt'),
      readingTime: t('news_page.news_items.digital_library.reading_time'),
      content: `Our digital resource library has been significantly expanded with hundreds of new materials now available to member churches. The library includes:

• Lesson plans for all age groups
• Educational videos and multimedia content
• Printable worksheets and activities
• Teacher guides and training materials
• Historical documents and resources

All materials are organized by topic, age group, and language to make it easy to find what you need. Access is free for all registered member churches.`
    },
    {
      id: 8,
      title: t('news_page.news_items.regional_conference.title'),
      date: "February 15, 2025",
      category: "events",
      image: "/images/events.jpg",
      excerpt: t('news_page.news_items.regional_conference.excerpt'),
      readingTime: t('news_page.news_items.regional_conference.reading_time'),
      content: `Regional conferences will be held throughout the year in various locations to make it easier for members to attend. These smaller, regional gatherings provide opportunities for:

• Local networking and collaboration
• Sharing best practices
• Addressing region-specific challenges
• Building stronger local communities

Dates and locations for regional conferences will be announced soon. We encourage all members to participate in their regional events.`
    }
  ];

  useEffect(() => {
    const item = allNewsItems.find(item => item.id === parseInt(id || '0'));
    if (item) {
      setNewsItem(item);
    }
    setLoading(false);
  }, [id, t]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem?.title,
        text: newsItem?.excerpt,
        url: window.location.href,
      }).catch(err => console.log('Error sharing', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orthodox-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <>
        <PageHeader title="News Not Found" />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-8">The news article you're looking for doesn't exist.</p>
            <Link to="/message">
              <Button>Back to News & Messages</Button>
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title={newsItem.title} />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/message">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to News & Messages
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Featured Image */}
            <div className="w-full h-64 md:h-96 overflow-hidden">
              <img 
                src={newsItem.image} 
                alt={newsItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{newsItem.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{newsItem.readingTime}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1 text-orthodox-gold" />
                  <span className="capitalize">{newsItem.category}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center ml-auto text-orthodox-blue hover:text-orthodox-gold transition-colors"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </button>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-orthodox-blue">
                {newsItem.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {newsItem.excerpt}
              </p>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {newsItem.content}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Share this article</p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleShare}
                        className="p-2 rounded-full bg-orthodox-blue/10 text-orthodox-blue hover:bg-orthodox-blue/20 transition-colors"
                        aria-label="Share"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles or Back Button */}
          <div className="mt-8 text-center">
            <Link to="/message">
              <Button variant="outline" className="border-orthodox-blue text-orthodox-blue">
                View All News & Messages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsDetail;


