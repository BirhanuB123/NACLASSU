import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

interface DonateButtonProps {
  className?: string;
  large?: boolean;
}

const DonateButton: React.FC<DonateButtonProps> = ({ className = "", large = false }) => {
  const { t } = useLanguage();
  
  return (
    <Button 
      asChild
      className={`bg-gold-500 hover:bg-gold-600 text-black flex items-center gap-2 ${large ? 'text-lg py-6 px-8' : ''} ${className}`}
    >
      <Link to="/donate">
        <Heart className="w-5 h-5" /> {t('donate')}
      </Link>
    </Button>
  );
};

export default DonateButton;
