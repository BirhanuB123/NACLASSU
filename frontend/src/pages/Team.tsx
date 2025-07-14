import { useState } from "react";
import { useTranslation } from 'react-i18next';
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Globe } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import JoinUsButton from "@/components/JoinUsButton";

const Team = () => {
  const teamMembers = [
    
    {
      name: "Wise Chronicler Abraham",
      title: "Chairman",
      bio: "Wise Chronicler Abraham brings over 10 years of experience in leader and leadership management to NASSU.",
      image: "/images/1.jpg",
      email: "Sara@nasunion.org",
      linkedin: "https://linkedin.com",
      website: ""
    },
    {
      name: "Sara",
      title: "Finance Director",
      bio: "Ms. Sara brings over 8 years of experience in finance and non-profit management to NASSU. As our Finance Director, he oversees budgeting, financial planning, and ensures the responsible stewardship of our resources.",
      image: "/images/Sara.jpeg",
      email: "Sara@nasunion.org",
      linkedin: "https://linkedin.com",
      website: ""
    },
  
    {
      name: "Mintesnot",
      title: "Secretary",
      bio: "With a background in education and curriculum development, Mintesnot coordinates all NASSU programs, ensuring they meet the highest standards of Orthodox teaching while engaging students of all ages.",
      image: "/images/photo_2024-09-03_23-35-43.jpg",
      email: "Mintesnot@nasunion.org",
      linkedin: "https://linkedin.com",
      website: ""
    },
    {
      name: "Yared",
      title: "Communication Lead",
      bio: "Yared manages all communication efforts for NASSU, from our website and social media presence to newsletters and educational materials. He ensures our message reaches the Orthodox community effectively.",
      image: "/images/yared2.jpg",
      email: "Yared@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://Yared.com"
    },
    {
      name: "Wosen",
      title: "Plan and Strategy Director",
      bio: "Wosen has served Orthodox parishes for over five years. He leads our strategic planning initiatives, ensuring our work remains focused on our mission and values.",
      image: "/images/wos2.jpg",
      email: "Wosen@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://Wosen.com"
    },
    {
      name: "Eskedar",
      title: "Communication Director",
      bio: "Eskedar oversees our communications strategy and public relations. With a background in marketing and Orthodox theology, she helps articulate our mission to parishes, donors, and the broader Orthodox community.",
      image: "/images/esku.jpg",
      email: "Eskedar@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://Eskedar.com"
      
    },
    {
      name: "Biniyam",
      title: "Hymn Section",
      bio: "Biniyam oversees our communications strategy and public relations. With a background in marketing and Orthodox theology, she helps articulate our mission to parishes, donors, and the broader Orthodox community.",
      image: "/images/ashu.jpeg",
      email: "Biniyam@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://Biniyam.com"
      
    },
    {
      name: "Betelhem",
      title: "Child and Youth Section",
      bio: "Ms Betelhem oversees our child and youth participation and managing. With a background in marketing and Orthodox theology, she helps articulate our mission to parishes, donors, and the broader Orthodox community.",
      image: "/images/Betelhem.jpg",
      email: "Betelhem@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://Betelhem.com"
      
    }
  ];
  
  const [activeMember, setActiveMember] = useState<number | null>(null);
  
  const handleMemberClick = (index: number) => {
    setActiveMember(activeMember === index ? null : index);
  };

  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('team_page.meet_team')} background="">
        <p className="text-lg text-gray-100">{t('team_page.subtitle')}</p>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{t('team_page.our_leadership')}</h2>
            <p className="text-lg text-gray-700">
              NASSU is led by a team of dedicated professionals who bring diverse expertise in Orthodox education, finance, communications, and strategic planning to our organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden transition-all duration-300 ${activeMember === index ? 'ring-2 ring-church-600 shadow-xl' : 'shadow-md hover:shadow-lg'}`}
                onClick={() => handleMemberClick(index)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gold-600 font-medium mb-4">{member.title}</p>
                    
                    <p className={`text-gray-700 mb-4 transition-all duration-300 ${activeMember === index ? 'h-auto opacity-100' : 'h-20 overflow-hidden opacity-90'}`}>
                      {member.bio}
                    </p>
                    
                    <div className={`flex items-center gap-3 transition-all duration-300 ${activeMember === index ? 'opacity-100' : 'opacity-70'}`}>
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-church-700 hover:text-church-900 transition-colors">
                          <Mail size={18} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-church-700 hover:text-church-900 transition-colors">
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.website && (
                        <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-church-700 hover:text-church-900 transition-colors">
                          <Globe size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">Join Our Team</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              We're always looking for passionate individuals who share our commitment to Orthodox education and want to make a difference in the lives of children and youth.
            </p>
            <JoinUsButton large />
          </div>
        </div>
      </section>

      <section className="py-16 bg-church-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Support Our Work</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Your donation helps us continue providing quality Orthodox education resources to parishes across North America.
          </p>
          <DonateButton className="bg-gold-500 hover:bg-gold-600 text-black" large />
        </div>
      </section>
    </>
  );
};

export default Team;