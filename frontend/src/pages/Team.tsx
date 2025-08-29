import { useState, useContext } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Globe } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import JoinUsButton from "@/components/JoinUsButton";
import { LanguageContext } from "@/context/LanguageContext";

const Team = () => {
  const { t } = useContext(LanguageContext);
  
  const teamMembers = [
    {
      name: t('team_page.team_members.abraham.name'),
      title: t('team_page.team_members.abraham.title'),
      bio: t('team_page.team_members.abraham.bio'),
      image: "/images/1.jpg",
      email: "Sara@nasunion.org",
      linkedin: "https://linkedin.com",
      website: ""
    },
    {
      name: t('team_page.team_members.sara.name'),
      title: t('team_page.team_members.sara.title'),
      bio: t('team_page.team_members.sara.bio'),
      image: "/images/Sara.jpeg",
      email: "Sara@nasunion.org",
      linkedin: "https://linkedin.com",
      website: ""
    },
    {
      name: t('team_page.team_members.mintesnot.name'),
      title: t('team_page.team_members.mintesnot.title'),
      bio: t('team_page.team_members.mintesnot.bio'),
      image: "/images/photo_2024-09-03_23-35-43.jpg",
      email: "Mintesnot@nasunion.org",
      linkedin: "https://linkedin.com",
      website: ""
    },
    {
      name: t('team_page.team_members.yared.name'),
      title: t('team_page.team_members.yared.title'),
      bio: t('team_page.team_members.yared.bio'),
      image: "/images/yared2.jpg",
      email: "Yared@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://Yared.com"
    },
    {
      name: t('team_page.team_members.wosen.name'),
      title: t('team_page.team_members.wosen.title'),
      bio: t('team_page.team_members.wosen.bio'),
      image: "/images/wos2.jpg",
      email: "Wosen@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://Wosen.com"
    },
    {
      name: t('team_page.team_members.biniyam.name'),
      title: t('team_page.team_members.biniyam.title'),
      bio: t('team_page.team_members.biniyam.bio'),
      image: "/images/Ashu.jpg",
      email: "Biniyam@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://Biniyam.com"
    },
    {
      name: t('team_page.team_members.eskedar.name'),
      title: t('team_page.team_members.eskedar.title'),
      bio: t('team_page.team_members.eskedar.bio'),
      image: "/images/esku.jpg",
      email: "Eskedar@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://Eskedar.com"
    },
    {
      name: t('team_page.team_members.betelhem.name'),
      title: t('team_page.team_members.betelhem.title'),
      bio: t('team_page.team_members.betelhem.bio'),
      image: "/images/Betelhem.jpg",
      email: "Betelhem@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://Betelhem.com"
    },
    {
      name: t('team_page.team_members.tinsae.name'),
      title: t('team_page.team_members.tinsae.title'),
      bio: t('team_page.team_members.tinsae.bio'),
      image: "/images/tins.jpeg",
      email: "tinsae@nasunion.org",
      linkedin: "https://linkedin.com",
      website: "https://tinsaeNassu.com"
    }
  ];
  
  const [activeMember, setActiveMember] = useState<number | null>(null);
  
  const handleMemberClick = (index: number) => {
    setActiveMember(activeMember === index ? null : index);
  };

  return (
    <>
      <PageHeader title={t('team_page.title')} background="">
        <p className="text-lg text-gray-100">{t('team_page.subtitle')}</p>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{t('team_page.leadership_title')}</h2>
            <p className="text-lg text-gray-700">
              {t('team_page.leadership_description')}
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
            <h3 className="text-2xl font-serif font-bold mb-4">{t('team_page.join_team.title')}</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              {t('team_page.join_team.description')}
            </p>
            <JoinUsButton large />
          </div>
        </div>
      </section>

      <section className="py-16 bg-church-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">{t('team_page.support_work.title')}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {t('team_page.support_work.description')}
          </p>
          <DonateButton className="bg-gold-500 hover:bg-gold-600 text-black" large />
        </div>
      </section>
    </>
  );
};

export default Team;