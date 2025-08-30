
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, BookOpen, HeartHandshake } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";

const JoinUs = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    setFormSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      e.currentTarget.reset();
    }, 3000);
  };

  // Simple translation function for this page
  const translate = (en: string, am: string) => {
    return language === 'am' ? am : en;
  };

  return (
    <>
      <PageHeader title={translate("Join Our Mission", "የእኛን ተልእኮ ይቀላቀሉ")} background="">
        <p className="text-lg text-gray-100">{translate("Become part of our Orthodox education community", "የእኛን ኦርቶዶክስ ትምህርት ማህበረሰብ አባል ይሁኑ")}</p>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-4">
              <UserPlus className="w-12 h-12 text-church-700" />
            </div>
            <h2 className="section-title">{translate("How You Can Get Involved", "እንዴት መሳተፍ እንደሚችሉ")}</h2>
            <p className="text-lg text-gray-700">
              {translate(
                "There are many ways to participate in NASSU's mission of providing quality Orthodox Christian education to children and youth across North America. Whether you're a teacher, parent, clergy member, or supporter, we welcome your involvement.",
                "በሰሜን አሜሪካ ውስጥ ለልጆች እና ለወጣቶች ጥራት ያለው ኦርቶዶክስ ክርስቲያናዊ ትምህርት ለመስጠት በ NASSU ተልእኮ ውስጥ መሳተፍ የሚችሉት ብዙ መንገዶች አሉ። እርስዎ አስተማሪ፣ ወላጅ፣ ቄስ ወይም ደጋፊ ስለሆኑ፣ ተሳታፊነትዎን እንወዳለን።"
              )}
            </p>
          </div>

          <Tabs defaultValue="volunteer" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="volunteer">{translate("Volunteer", "በፈቃደኝነት")}</TabsTrigger>
              <TabsTrigger value="parish">{translate("Parish Membership", "የቤተክርስቲያን አባልነት")}</TabsTrigger>
              <TabsTrigger value="donate">{translate("Support Us", "ደግፉን")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="volunteer" className="border rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <BookOpen className="w-6 h-6 text-blue-700" />
                      </div>
                      <h3 className="font-serif text-xl font-bold">Curriculum Development</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      If you have experience in education, theology, or writing, help us develop and review Orthodox Sunday School materials for different age groups.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                      <li>Write lesson plans</li>
                      <li>Create activities and worksheets</li>
                      <li>Review theological content</li>
                      <li>Develop digital resources</li>
                    </ul>
                    <div className="text-sm text-gray-500">
                      Time commitment: 5-10 hours per month
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Users className="w-6 h-6 text-green-700" />
                      </div>
                      <h3 className="font-serif text-xl font-bold">Teacher Training</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Share your teaching expertise by helping to train and support Sunday School teachers across North America.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                      <li>Lead training workshops</li>
                      <li>Mentor new teachers</li>
                      <li>Create training materials</li>
                      <li>Present webinars</li>
                    </ul>
                    <div className="text-sm text-gray-500">
                      Time commitment: 8-15 hours per month
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-purple-100 rounded-full">
                        <HeartHandshake className="w-6 h-6 text-purple-700" />
                      </div>
                      <h3 className="font-serif text-xl font-bold">Event Organization</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Help plan and coordinate youth events, teacher conferences, and educational programs.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                      <li>Plan youth retreats</li>
                      <li>Organize teacher conferences</li>
                      <li>Coordinate regional workshops</li>
                      <li>Manage event logistics</li>
                    </ul>
                    <div className="text-sm text-gray-500">
                      Time commitment: Variable (10-20 hours per month, more before events)
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-pink-100 rounded-full">
                        <svg className="w-6 h-6 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <h3 className="font-serif text-xl font-bold">Administrative Support</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Assist with the day-to-day operations of NASSU, helping us maintain and grow our programs.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                      <li>Manage communications</li>
                      <li>Coordinate volunteers</li>
                      <li>Assist with fundraising</li>
                      <li>Handle program administration</li>
                    </ul>
                    <div className="text-sm text-gray-500">
                      Time commitment: 3-8 hours per month
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <h3 className="font-serif text-xl font-bold mb-4">Volunteer Application Process</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Complete the volunteer interest form below</li>
                  <li>Initial phone interview with our volunteer coordinator</li>
                  <li>Background check (required for all volunteers working with youth)</li>
                  <li>Orientation and training specific to your volunteer role</li>
                  <li>Begin serving with support from NASSU staff and experienced volunteers</li>
                </ol>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-6">Volunteer Interest Form</h3>
                  
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
                      <p className="font-medium mb-1">Thank you for your interest!</p>
                      <p>We've received your information and will contact you soon about volunteer opportunities.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">First Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-church-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-church-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">Email</label>
                          <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-church-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">Phone</label>
                          <input
                            type="tel"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-church-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">Parish/Church</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-church-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">Area(s) of Interest</label>
                        <div className="grid md:grid-cols-2 gap-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Curriculum Development
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Teacher Training
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Event Organization
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Administrative Support
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">Tell us about your skills and experience</label>
                        <textarea
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-church-500 h-32"
                          placeholder="Include any relevant experience in education, Orthodox Church involvement, or skills you'd like to contribute."
                          required
                        ></textarea>
                      </div>
                      
                      <Button type="submit" className="bg-church-700 hover:bg-church-800 text-white">
                        <UserPlus className="mr-2 h-4 w-4" /> Submit Interest Form
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="parish" className="border rounded-lg p-6">
              <h3 className="font-serif text-2xl font-bold mb-6">Parish Membership</h3>
              <p className="text-lg text-gray-700 mb-8">
                Enroll your parish as a member of NASSU to access our full range of Orthodox Sunday School resources, training opportunities, and support services.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <Card className="border-church-200">
                  <CardContent className="p-0">
                    <div className="bg-church-700 text-white p-6 text-center">
                      <h4 className="font-serif text-xl font-bold">Basic Membership</h4>
                      <div className="mt-4 text-3xl font-bold">$350<span className="text-sm font-normal">/year</span></div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Access to core Sunday School curriculum
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Quarterly teacher resources
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Online training for teachers (1 session/year)
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Email support for Sunday School directors
                        </li>
                      </ul>
                      <Button className="w-full mt-6 bg-church-700 hover:bg-church-800 text-white">
                        Apply for Membership
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-gold-300 shadow-lg">
                  <CardContent className="p-0">
                    <div className="bg-gold-500 text-black p-6 text-center">
                      <h4 className="font-serif text-xl font-bold">Premium Membership</h4>
                      <div className="mt-4 text-3xl font-bold">$650<span className="text-sm font-normal">/year</span></div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-medium">All Basic Membership benefits</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Expanded curriculum with additional activities
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Quarterly onsite or online teacher training
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Annual program evaluation and consultation
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Priority phone and email support
                        </li>
                      </ul>
                      <Button className="w-full mt-6 bg-gold-500 hover:bg-gold-600 text-black font-medium">
                        Apply for Premium Membership
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <h3 className="font-serif text-xl font-bold mb-4">Parish Membership Process</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Complete the parish membership application</li>
                  <li>Consultation call with a NASSU representative</li>
                  <li>Payment of annual membership fee</li>
                  <li>Onboarding and setup of parish account</li>
                  <li>Begin accessing resources and support</li>
                </ol>
              </div>
              
              <div className="text-center">
                <p className="mb-6 italic text-gray-700">
                  "NASSU membership has transformed our Sunday School program. The curriculum is engaging and authentically Orthodox, and the teacher training has given our volunteers confidence."
                  <br />
                  <span className="font-medium mt-2 block">— Fr. John, St. Nicholas Orthodox Church</span>
                </p>
                <Button className="bg-church-700 hover:bg-church-800 text-white">
                  Request Parish Membership Information
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="donate" className="border rounded-lg p-6">
              <h3 className="font-serif text-2xl font-bold mb-6">Support Our Mission</h3>
              <p className="text-lg text-gray-700 mb-8">
                Your financial support allows us to continue providing quality Orthodox Christian education resources to parishes across North America.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-church-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-xl font-bold mb-2">One-Time Gift</h4>
                    <p className="text-gray-700 mb-6">
                      Make a one-time donation to support our work in Orthodox education.
                    </p>
                    <Button asChild className="bg-church-700 hover:bg-church-800 text-white">
                      <a href="/donate">Make a Donation</a>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-gold-300 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gold-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-xl font-bold mb-2">Monthly Support</h4>
                    <p className="text-gray-700 mb-6">
                      Become a sustaining donor with a recurring monthly donation to NASSU.
                    </p>
                    <Button asChild className="bg-gold-500 hover:bg-gold-600 text-black">
                      <a href="/donate">Become a Monthly Supporter</a>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-church-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-xl font-bold mb-2">Legacy Giving</h4>
                    <p className="text-gray-700 mb-6">
                      Include NASSU in your estate planning to leave a lasting impact on Orthodox education.
                    </p>
                    <Button asChild className="bg-church-700 hover:bg-church-800 text-white">
                      <a href="/donate">Learn About Legacy Giving</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-church-50 p-6 rounded-lg border border-church-100 mb-8">
                <h3 className="font-serif text-xl font-bold mb-4">Your Gift's Impact</h3>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-church-800 mb-1">$50</div>
                    <p className="text-gray-700">Provides teaching materials for one classroom</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-church-800 mb-1">$250</div>
                    <p className="text-gray-700">Sponsors teacher training for a parish</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-church-800 mb-1">$1,000</div>
                    <p className="text-gray-700">Funds development of new curriculum materials</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-600 text-black font-medium">
                  <a href="/donate">Support Our Mission Today</a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default JoinUs;
