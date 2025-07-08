
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Handshake, Heart } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import JoinUsButton from "@/components/JoinUsButton";

const Sponsors = () => {
  // Sample sponsors and partners data
  const majorSponsors = [
    {
      name: "Ahadu Bank SC",
      logo: "/images/download.png",
      description: "A foundation dedicated to supporting Orthodox education initiatives across North America.",
      website: "https://www.ahadubank.com"
    },
    {
      name: "Open to new Sponsors",
      logo: "/images/sponsors.jpg",
      description: "",
      website: "https://example.com"
    },
    {
      name: "Open to new Sponsors",
      logo: "/images/sponsors.jpg",
      description: "",
      website: "https://example.com"
    }
  ];
        
  const partners = [
    {
      name: "We are new Partners",
      logo: "/images/sponsors.jpg",
      website: "https://example.com"
    },
    {
      name: "We are new Partners",
      logo: "/images/sponsors.jpg",
      website: "https://example.com"
    },
    {
      name: "We are new Partners",
      logo: "/images/sponsors.jpg",
      website: "https://example.com"
    }
  ];

  return (
    <>
      <PageHeader title="Sponsors & Partners" background="">
        <p className="text-lg text-gray-100">The organizations that make our work possible</p>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">Our Major Sponsors</h2>
            <p className="text-lg text-gray-700">
              NASSU's work would not be possible without the generous support of our major sponsors. These organizations share our commitment to Orthodox education and have made significant contributions to our mission.
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {majorSponsors.map((sponsor, index) => (
              <Card key={index} className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-white p-8 flex items-center justify-center">
                      <div className="h-48 w-48 rounded-full overflow-hidden bg-gray-100 border-8 border-gray-100 shadow-inner flex items-center justify-center">
                        <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8 bg-gray-50">
                      <h3 className="text-2xl font-serif font-bold mb-3">{sponsor.name}</h3>
                      <p className="text-gray-700 mb-6">{sponsor.description}</p>
                      <a 
                        href={sponsor.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-church-700 hover:text-church-900 transition-colors"
                      >
                        Visit Website <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Handshake className="w-12 h-12 text-church-700" />
            </div>
            <h2 className="section-title">Our Partners</h2>
            <p className="text-lg text-gray-700">
              We collaborate with numerous Orthodox organizations across North America to advance our shared mission of providing quality Orthodox Christian education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 mb-4 flex items-center justify-center">
                      <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-serif font-bold mb-3">{partner.name}</h3>
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-sm text-church-700 hover:text-church-900 transition-colors"
                    >
                      Visit Website <ExternalLink size={14} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-church-50 border border-church-100 rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <Heart className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-serif font-bold">Become a Sponsor or Partner</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Support from organizations like yours helps us reach more parishes and provide better resources for Orthodox Christian education. By becoming a sponsor or partner, you'll be making a significant contribution to the spiritual formation of Orthodox youth across North America.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-serif font-bold mb-3 text-church-800">Sponsorship Benefits</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Recognition on our website and publications
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Opportunities to connect with Orthodox parishes
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Input on educational initiatives
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Support Orthodox education across North America
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-serif font-bold mb-3 text-church-800">Partnership Opportunities</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Collaborative educational projects
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Resource sharing and development
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Joint events and programs
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Networking with Orthodox organizations
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <DonateButton className="sm:flex-1 md:flex-initial" />
                <JoinUsButton className="sm:flex-1 md:flex-initial" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sponsors;
