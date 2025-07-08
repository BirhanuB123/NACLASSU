
import { BookOpen, Users, Calendar } from "lucide-react";
import ServiceCard from "./ServiceCard";

const ServicesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={BookOpen} 
            title="Sunday School Curriculum" 
            description="Age-appropriate Orthodox Christian education materials for children from preschool through high school."
          />
          
          <ServiceCard 
            icon={Users} 
            title="Teacher Training" 
            description="Workshops and resources to equip Sunday School teachers with the skills and knowledge they need."
          />
          
          <ServiceCard 
            icon={Calendar} 
            title="Youth Events" 
            description="Retreats, camps, and activities that bring Orthodox youth together for fellowship and spiritual growth."
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
