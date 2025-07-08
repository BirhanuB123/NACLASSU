
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-start p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
      <div className="p-3 bg-church-100 rounded-full mb-4">
        <Icon className="w-6 h-6 text-church-700" />
      </div>
      <h3 className="text-xl font-serif font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      <Button asChild variant="ghost" className="mt-auto text-church-700 hover:text-church-800 hover:bg-church-50 p-0">
        <Link to="/services" className="flex items-center gap-2">
          Learn More
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </Button>
    </div>
  );
};

export default ServiceCard;
