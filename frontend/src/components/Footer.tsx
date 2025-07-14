import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Church, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext"; // Import useLanguage

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage(); // Get t function
  
  return (
    <footer className="bg-church-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Church className="text-gold-400" size={28} />
              <div>
                <span className="font-serif text-xl font-medium block text-white">NASSU</span>
                <span className="text-xs font-light text-gray-400 -mt-1 block">North America Sunday School Union</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Nurturing faith in the next generation through education, community, and Orthodox tradition.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-white">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold-400 transition-colors">{t('Home')}</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-gold-400 transition-colors">{t('About Us')}</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-gold-400 transition-colors">{t('Our Services')}</Link>
              </li>
              <li>
                <Link to="/values" className="text-gray-300 hover:text-gold-400 transition-colors">{t('Our Values')}</Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-gold-400 transition-colors">{t('Meet the Team')}</Link>
              </li>
              <li>
                <Link to="/sponsors" className="text-gray-300 hover:text-gold-400 transition-colors">{t('Sponsors and Partners')}</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-gold-400 transition-colors">{t('Gallery')}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-white">{t('contactUs')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Orthodox Way, <br />New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gold-400 flex-shrink-0" />
                <span className="text-gray-300">(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gold-400 flex-shrink-0" />
                <span className="text-gray-300">info@nasunion.org</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-white">{t('News Letter')}</h3>
            <p className="text-gray-300 mb-4">
              {t('News and updates delivered to your inbox. Subscribe to our newsletter for the latest information on events, resources, and community activities.')}
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder={t('Your email address')}
                className="w-full px-4 py-2 rounded bg-church-800 border border-church-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
              />
              <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-black">
                {t('Subscribe')}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-church-800 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} North America Sunday School Union. All Rights Reserved.</p>
          {/*<p>✔️ Developed by: <strong><a href="https://www.mulewave.com" target="_blank" rel="noopener noreferrer">Mulewave</a></strong></p>*/}        </div>
      </div>
    </footer>
  );
};

export default Footer;