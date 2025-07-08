import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

interface JoinUsButtonProps {
  className?: string;
  large?: boolean;
}

const JoinUsButton: React.FC<JoinUsButtonProps> = ({ className = "", large = false }) => {
  const { t } = useLanguage();
  
  return (
    <Button 
      asChild
      className={`bg-church-700 hover:bg-church-800 text-white flex items-center gap-2 ${large ? 'text-lg py-6 px-8' : ''} ${className}`}
    >
      <Link to="/join-us">
        <UserPlus className="w-5 h-5" /> {t('joinUs')}
      </Link>
    </Button>
  );
};

export default JoinUsButton;