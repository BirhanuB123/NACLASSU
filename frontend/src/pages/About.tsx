
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Church, Target, Clock, Globe } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import JoinUsButton from "@/components/JoinUsButton";
import { useLanguage } from "@/context/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const aboutPage = t('about_page');
  const stats = aboutPage?.stats || {};
  const mission = aboutPage?.mission || {};
  const vision = aboutPage?.vision || {};

  return (
    <>
      <PageHeader title={aboutPage?.title || 'About Us'} background="">
        <p className="text-lg text-gray-100">
          {aboutPage?.subtitle || 'Learn about our history, mission, and vision'}
        </p>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/3">
              <h2 className="section-title text-left">{aboutPage?.our_story || 'Our Story'}</h2>
              {aboutPage?.story_paragraphs?.map((paragraph: string, index: number) => (
                <p key={index} className="text-lg mb-6 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <Card className="border-gold-200 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-church-800 text-white py-4 px-6">
                      <h3 className="text-2xl font-bold">{aboutPage?.at_a_glance || 'At a Glance'}</h3>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="bg-church-100 p-2 rounded-full mt-1">
                            <Clock className="w-4 h-4 text-church-700" />
                          </span>
                          <div>
                            <span className="font-medium block">{stats.founded || 'Founded in 2010'}</span>
                            <span className="text-sm text-gray-600">{stats.years_of_service || 'Over 10 years of service'}</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-church-100 p-2 rounded-full mt-1">
                            <Church className="w-4 h-4 text-church-700" />
                          </span>
                          <div>
                            <span className="font-medium block">{stats.parishes_served || '350+ Parishes Served'}</span>
                            <span className="text-sm text-gray-600">{stats.across_jurisdictions || 'Across multiple jurisdictions'}</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-church-100 p-2 rounded-full mt-1">
                            <Globe className="w-4 h-4 text-church-700" />
                          </span>
                          <div>
                            <span className="font-medium block">{stats.north_america_wide || 'North America Wide'}</span>
                            <span className="text-sm text-gray-600">{stats.countries || 'United States and Canada'}</span>
                          </div>
                        </li>
                      </ul>
                      
                      <div className="mt-6 space-y-3">
                        <DonateButton className="w-full" />
                        <JoinUsButton className="w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mt-16 text-center">
            <h2 className="section-title">{aboutPage?.mission_vision || 'Our Mission & Vision'}</h2>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="border-gold-200 h-full">
                <CardContent className="p-8">
                  <div className="bg-church-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Target className="w-6 h-6 text-church-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{mission.title || 'Our Mission'}</h3>
                  <p className="text-gray-700">
                    {mission.description || 'To provide comprehensive, theologically sound, and culturally relevant Sunday School resources that nurture the spiritual growth of children and youth in the Ethiopian Orthodox Tewahedo Church across North America, equipping them with a strong foundation in the Orthodox Christian faith.'}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gold-200 h-full">
                <CardContent className="p-8">
                  <div className="bg-church-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Globe className="w-6 h-6 text-church-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{vision.title || 'Our Vision'}</h3>
                  <p className="text-gray-700">
                    {vision.description || 'To be the leading resource for Ethiopian Orthodox Christian education in North America, fostering a deep and lasting connection to the faith for generations to come through innovative, accessible, and engaging educational materials and programs.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-church-800 text-white">
        <div className="mt-16 text-center bg-church-50 py-16 px-4 rounded-lg">
          <h2 className="section-title text-black">{aboutPage?.join_mission?.title || 'Join Our Mission'}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-4">
            {aboutPage?.join_mission?.description || "Whether you're a parish leader, Sunday School teacher, parent, or supporter of Orthodox Christian education, there are many ways to get involved and support our mission."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <JoinUsButton />
            <DonateButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
