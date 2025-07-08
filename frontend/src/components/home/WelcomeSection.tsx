
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WelcomeSection = () => {
  return (
    <section id="welcome" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2">
            <h2 className="section-title text-left mb-6">Welcome to Our Union</h2>
            <p className="text-lg mb-6 text-gray-700">
              The North America Sunday School Union is dedicated to providing Orthodox Christian education to children and youth across North America. Our mission is to nurture the spiritual growth and development of the next generation of faithful Orthodox Christians.
            </p>
            <p className="text-lg mb-8 text-gray-700">
              Through our educational programs, community events, and resources, we strive to create an environment where children can learn about their faith, develop meaningful relationships, and grow in their love for Christ and His Church.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-church-700 hover:bg-church-800 text-white">
                <Link to="/about">Learn More About Us</Link>
              </Button>
              <Button asChild variant="outline" className="border-church-200 hover:bg-church-50">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-500 rounded-lg"></div>
              <img 
                src="/images/Mariyam_enate.jpg" 
                alt="Sunday School Children" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                style={{ maxHeight: "500px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
