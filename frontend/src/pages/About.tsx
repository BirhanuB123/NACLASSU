
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Church, Target, Clock, Globe } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import JoinUsButton from "@/components/JoinUsButton";

const About = () => {
  return (
    <>
      <PageHeader title="About Us" background="">
        <p className="text-lg text-gray-100">
          Learn about our history, mission, and vision
        </p>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/3">
              <h2 className="section-title text-left">Our Story</h2>
              <p className="text-lg mb-6 text-gray-700">
                The North America Sunday School Union (NASSU) was founded in 2010 by a group of dedicated Ethiopian Orthodox priests and educators who recognized the need for a unified approach to Sunday School education across North America. What began as a small gathering of educators from various jurisdictions has grown into a comprehensive resource center supporting Sunday Schools throughout the continent.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                For over 10 years, we have been developing curriculum materials, organizing teacher training workshops, and creating resources that help parishes provide quality Orthodox Christian education to children and youth. Our work spans across multiple Orthodox jurisdictions, bringing together the rich traditions and teachings of our faith.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Today, NASSU serves hundreds of parishes, reaching thousands of children each week. We continue to expand our offerings and adapt to the changing needs of Orthodox communities while remaining firmly rooted in the unchanging truths of our faith.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <Card className="border-gold-200 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-church-800 text-white py-4 px-6">
                      <h3 className="text-2xl font-bold">At a Glance</h3>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="bg-church-100 p-2 rounded-full mt-1">
                            <Clock className="w-4 h-4 text-church-700" />
                          </span>
                          <div>
                            <span className="font-medium block">Founded in 2010</span>
                            <span className="text-sm text-gray-600">Over 10 years of service</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-church-100 p-2 rounded-full mt-1">
                            <Church className="w-4 h-4 text-church-700" />
                          </span>
                          <div>
                            <span className="font-medium block">350+ Parishes Served</span>
                            <span className="text-sm text-gray-600">Across multiple jurisdictions</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-church-100 p-2 rounded-full mt-1">
                            <Globe className="w-4 h-4 text-church-700" />
                          </span>
                          <div>
                            <span className="font-medium block">North America Wide</span>
                            <span className="text-sm text-gray-600">United States and Canada</span>
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
            <h2 className="section-title">Our Mission & Vision</h2>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="border-gold-200 h-full">
                <CardContent className="p-8">
                  <div className="bg-church-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Target className="w-6 h-6 text-church-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-gray-700">
                    To provide comprehensive, theologically sound, and culturally relevant Sunday School resources that nurture the spiritual growth of children and youth in the Ethiopian Orthodox Tewahedo Church across North America, equipping them with a strong foundation in the Orthodox Christian faith.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gold-200 h-full">
                <CardContent className="p-8">
                  <div className="bg-church-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Globe className="w-6 h-6 text-church-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                  <p className="text-gray-700">
                    To see a thriving network of Ethiopian Orthodox Sunday Schools across North America where children and youth are deeply rooted in their faith, actively participating in the life of the Church, and prepared to pass on the rich spiritual heritage of Ethiopian Orthodoxy to future generations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-church-800 text-white">
        <div className="mt-16 text-center bg-church-50 py-16 px-4 rounded-lg">
          <h2 className="section-title text-black">Join Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-4">
            Whether you're a parish leader, Sunday School teacher, parent, or supporter of Orthodox Christian education, there are many ways to get involved and support our mission.
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
