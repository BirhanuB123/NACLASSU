import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HighlightedEventsSection = () => {
  // Sample events data - in a real app, this would come from an API
  const highlightedEvents = [
    {
      id: 1,
      title: 'Annual Youth Conference 2025',
      date: 'July 15-18, 2025',
      time: '9:00 AM - 5:00 PM',
      excerpt: 'Join us for our biggest youth event of the year with inspiring speakers and workshops.',
      image: 'images/events.jpg',
      category: 'events'
    },
    {
      id: 2,
      title: 'Bible Study Workshop',
      date: 'July 22, 2025',
      time: '6:00 PM - 8:00 PM',
      excerpt: 'Deepen your understanding of the Scriptures with our weekly Bible study sessions.',
      image: 'images/events.jpg',
      category: 'events'
    },
    {
      id: 3,
      title: 'Community Service Day',
      date: 'August 5, 2025',
      time: '8:00 AM - 3:00 PM',
      excerpt: 'Join us as we give back to our local community through various service projects.',
      image: 'images/events.jpg',
      category: 'events'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
            Join us for these exciting upcoming events. Stay connected with our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {highlightedEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Calendar className="w-4 h-4 mr-2 text-church-700" />
                  <span className="text-gray-700">{event.date}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <Clock className="w-4 h-4 mr-2 text-church-700" />
                  <span className="text-gray-700">{event.time}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-700 mb-4">{event.excerpt}</p>
                <Link 
                  to={`/message?category=${event.category}`}
                  className="text-church-700 hover:text-church-900 font-medium inline-flex items-center transition-colors duration-200"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-church-700 text-church-700 hover:bg-church-50 hover:text-church-900 transition-colors duration-200">
            <Link to="/message?category=events">
              View All Events & News
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HighlightedEventsSection;
