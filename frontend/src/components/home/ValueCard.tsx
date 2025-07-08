
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <CardContent className="p-0">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="bg-church-100 rounded-full p-4 mb-6 group-hover:bg-church-700 transition-colors duration-300">
            <Icon className="w-8 h-8 text-church-700 group-hover:text-white" />
          </div>
          <h3 className="text-xl font-serif font-bold mb-3">{title}</h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValueCard;
