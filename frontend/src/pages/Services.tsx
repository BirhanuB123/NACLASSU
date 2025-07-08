
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
  Map
} from "lucide-react";
import DonateButton from "@/components/DonateButton";
import JoinUsButton from "@/components/JoinUsButton";

const Services = () => {
  const services = [
    {
      title: "Sunday School Curriculum",
      description: "Comprehensive, age-appropriate Orthodox Christian education materials for children from preschool through high school.",
      icon: BookOpen
    },
    {
      title: "Teacher Training",
      description: "Workshops, webinars, and resources to equip Sunday School teachers with effective teaching methods and Orthodox knowledge.",
      icon: GraduationCap
    },
    {
      title: "Youth Events",
      description: "Retreats, camps, and activities that bring Orthodox youth together for fellowship and spiritual growth.",
      icon: Calendar
    },
    {
      title: "Resource Development",
      description: "Creation of teaching aids, activity books, and digital resources to enhance the Sunday School experience.",
      icon: Palette
    },
    {
      title: "Webinars and Online Classes",
      description: "Live and recorded educational sessions for students, teachers, and parents on various aspects of Orthodox faith.",
      icon: Video
    },
    {
      title: "Parent Support",
      description: "Resources and guidance to help parents continue faith education at home and support their children's spiritual journey.",
      icon: Users
    },
    {
      title: "Audio Resources",
      description: "Orthodox music, stories, and teachings in audio format for use in Sunday School and at home.",
      icon: Headphones
    },
    {
      title: "Parish Consultation",
      description: "Expert guidance to help parishes establish and strengthen their Sunday School programs.",
      icon: Map
    }
  ];

  return (
    <>
      <PageHeader title="Our Services" background="">
        <p className="text-lg text-gray-100">Supporting Orthodox education across North America</p>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">What We Offer</h2>
            <p className="text-lg text-gray-700">
              NASSU provides a wide range of services designed to support Orthodox Christian education in parishes across North America. Our offerings are developed by experienced educators and clergy to ensure theological accuracy and educational effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-church-100 rounded-full">
                      <service.icon className="w-6 h-6 text-church-700" />
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
            <h2 className="section-title">How We Can Help Your Parish</h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h3 className="font-serif text-2xl font-bold mb-6 text-church-800">Our Process</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-church-700 text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Consultation</h4>
                    <p className="text-gray-700">
                      We begin by understanding your parish's specific needs, goals, and current Sunday School structure. This helps us tailor our recommendations and support.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-church-700 text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Curriculum Selection</h4>
                    <p className="text-gray-700">
                      Based on your needs, we help you select or develop appropriate curriculum materials for each age group in your Sunday School program.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-church-700 text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Teacher Training</h4>
                    <p className="text-gray-700">
                      We provide training for your Sunday School teachers, equipping them with teaching methods, classroom management skills, and deeper knowledge of Orthodox theology.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-church-700 text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Ongoing Support</h4>
                    <p className="text-gray-700">
                      We offer continued support through regular check-ins, additional resources as needed, and opportunities for your teachers and youth to participate in NASSU events.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                <DonateButton className="flex-1" />
                <JoinUsButton className="flex-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-church-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Request Our Services</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Interested in bringing NASSU resources to your parish? Reach out to us today to discuss how we can support your Sunday School program.
          </p>
          <div className="bg-church-700 p-6 rounded-lg max-w-2xl mx-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">Parish Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded bg-church-600 border border-church-500 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  placeholder="St. John Orthodox Church"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">Your Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded bg-church-600 border border-church-500 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 rounded bg-church-600 border border-church-500 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-2 rounded bg-church-600 border border-church-500 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gold-400"
                  placeholder="(123) 456-7890"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-200">How can we help?</label>
                <textarea 
                  className="w-full px-4 py-2 rounded bg-church-600 border border-church-500 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-gold-400 h-32"
                  placeholder="Tell us about your needs..."
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-center">
                <button 
                  type="submit" 
                  className="bg-gold-500 hover:bg-gold-600 text-black px-8 py-3 rounded-lg font-medium w-full md:w-auto"
                >
                  Submit Request
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
