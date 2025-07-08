
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Cross, HeartHandshake } from "lucide-react";
import ValueCard from "./ValueCard";

const CoreValuesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Core Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard 
            icon={BookOpen} 
            title="Orthodox Education" 
            description="We are committed to providing authentic Orthodox Christian education that is rooted in the traditions and teachings of our faith."
          />
          
          <ValueCard 
            icon={Cross} 
            title="Faith Formation" 
            description="We believe in nurturing a deep and lasting faith that helps children and youth develop a personal relationship with Christ."
          />
          
          <ValueCard 
            icon={HeartHandshake} 
            title="Community Building" 
            description="We foster a sense of belonging and connection among our youth, creating a supportive community that extends beyond Sunday School."
          />
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-church-700 hover:bg-church-800 text-white">
            <Link to="/values">Learn More About Our Values</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
