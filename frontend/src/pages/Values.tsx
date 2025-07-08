
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Cross, HeartHandshake, Church, Globe, Users, Heart } from "lucide-react";
import DonateButton from "@/components/DonateButton";

const Values = () => {
  const values = [
    {
      title: "Orthodox Faith",
      description: "We are committed to authentic Orthodox Christian teaching, maintaining fidelity to the traditions, theology, and practices of the Orthodox Church. All our materials and programs are developed with guidance from Orthodox clergy and theologians.",
      icon: Cross,
      color: "bg-church-700"
    },
    {
      title: "Educational Excellence",
      description: "We strive for the highest quality in educational content and methodology. Our resources are developed by experienced educators who understand both Orthodox theology and effective teaching practices for different age groups.",
      icon: BookOpen,
      color: "bg-blue-600"
    },
    {
      title: "Community",
      description: "We believe in the power of community and relationships. Our programs foster connections between students, families, and parishes, creating a supportive network for spiritual growth and faith development.",
      icon: Users,
      color: "bg-green-600"
    },
    {
      title: "Inclusivity",
      description: "Within the bounds of Orthodox teaching, we welcome all who seek to learn and grow in the faith. We strive to create materials and programs that respect the diversity of Orthodox jurisdictions while emphasizing our common faith.",
      icon: Globe,
      color: "bg-purple-600"
    },
    {
      title: "Service",
      description: "Following Christ's example, we value service to others. We encourage students to put faith into action through service projects and outreach, learning to express their faith through love for others.",
      icon: HeartHandshake,
      color: "bg-red-600"
    },
    {
      title: "Lifelong Learning",
      description: "We believe that Orthodox education is a lifelong journey. We support spiritual formation from childhood through adulthood, providing age-appropriate resources that grow with students throughout their lives.",
      icon: Church,
      color: "bg-amber-600"
    }
  ];

  return (
    <>
      <PageHeader title="Our Values" background="">
        <p className="text-lg text-gray-100">The principles that guide our work</p>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">Core Values</h2>
            <p className="text-lg text-gray-700">
              At North America Sunday School Union, our work is guided by a set of core values that reflect our commitment to Orthodox Christian education and the spiritual formation of children and youth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className={`${value.color} text-white p-6 flex items-center gap-4`}>
                    <value.icon className="w-8 h-8" />
                    <h3 className="text-2xl font-serif font-bold">{value.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title">Our Approach</h2>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Our approach to Orthodox Christian education is holistic, recognizing that faith formation involves the whole person—mind, body, and spirit. We believe that Sunday School should be more than just an academic exercise; it should be a transformative experience that helps children and youth develop a living relationship with Christ and His Church.
              </p>
              
              <h3 className="font-serif text-2xl font-bold mt-8 mb-4">Engage the Whole Person</h3>
              <p>
                We design our educational materials to engage students intellectually, emotionally, and spiritually. Through a combination of Scripture study, Church history, lives of the saints, liturgical education, and practical application, we help students develop a well-rounded understanding of the Orthodox faith.
              </p>
              
              <h3 className="font-serif text-2xl font-bold mt-8 mb-4">Connect with Tradition</h3>
              <p>
                We help students connect with the rich tradition of Orthodoxy in ways that are meaningful and accessible. By incorporating icons, hymns, prayers, and the liturgical calendar into our curriculum, we create an educational experience that is authentically Orthodox and deeply rooted in the life of the Church.
              </p>
              
              <h3 className="font-serif text-2xl font-bold mt-8 mb-4">Foster Personal Growth</h3>
              <p>
                We recognize that each student is on their own spiritual journey. Our materials and programs are designed to meet students where they are, addressing their questions and concerns while guiding them toward a deeper understanding of the faith and a more intimate relationship with Christ.
              </p>
              
              <h3 className="font-serif text-2xl font-bold mt-8 mb-4">Support Families</h3>
              <p>
                We believe that parents are the primary educators of their children in the faith. Our resources include components for family participation, helping parents continue the educational process at home and integrate Orthodox practices into family life.
              </p>
            </div>
            
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <Heart className="w-8 h-8 text-red-500" />
                <h3 className="font-serif text-2xl font-bold">Living Our Values</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Our values are not just words on a page—they guide everything we do at NASSU. From curriculum development to teacher training, from youth events to parish consultation, we strive to embody these values in all aspects of our work.
              </p>
              <p className="text-gray-700 mb-6">
                We invite you to join us in this important mission of nurturing the faith of the next generation. Together, we can help children and youth develop a strong foundation in the Orthodox faith that will support them throughout their lives.
              </p>
              <div className="flex justify-center">
                <DonateButton className="bg-gold-500 hover:bg-gold-600 text-black" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Values;
