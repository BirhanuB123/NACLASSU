
import { useContext } from 'react';
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Cross, HeartHandshake, Church, Globe, Users, Heart } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import { LanguageContext } from "@/context/LanguageContext";

const Values = () => {
  const { t } = useContext(LanguageContext);
 /* 
  const values = [
    {
      title: t('orthodox_faith.title', {defaultValue: 'Orthodox Faith'}),
      description: t('values.orthodox_faith.description', {defaultValue: "We are committed to authentic Orthodox Christian teaching, maintaining fidelity to the traditions, theology, and practices of the Orthodox Church. All our materials and programs are developed with guidance from Orthodox clergy and theologians."}),
      icon: Cross,
      color: "bg-church-600"
    },
    {
      title: t('values.educational_excellence.title', {defaultValue: 'Educational Excellence'}),
      description: t('values.educational_excellence.description', {defaultValue: "We strive for the highest quality in educational content and methodology. Our resources are developed by experienced educators who understand both Orthodox theology and effective teaching practices for different age groups."}),
      icon: BookOpen,
      color: "bg-church-600"
    },
    {
      title: t('values.community.title', {defaultValue: 'Community'}),
      description: t('values.community.description', {defaultValue: "We believe in the power of community and relationships. Our programs foster connections between students, families, and parishes, creating a supportive network for spiritual growth and faith development."}),
      icon: Users,
      color: "bg-church-600"
    },
    {
      title: t('values.inclusivity.title', {defaultValue: 'Inclusivity'}),
      description: t('values.inclusivity.description', {defaultValue: "Within the bounds of Orthodox teaching, we welcome all who seek to learn and grow in the faith. We strive to create materials and programs that respect the diversity of Orthodox jurisdictions while emphasizing our common faith."}),
      icon: Globe,
      color: "bg-church-600"
    },
    {
      title: t('values.service.title', {defaultValue: 'Service'}),
      description: t('values.service.description', {defaultValue: "Following Christ's example, we value service to others. We encourage students to put faith into action through service projects and outreach, learning to express their faith through love for others."}),
      icon: HeartHandshake,
      color: "bg-church-600"
    },
    {
      title: t('values.lifelong_learning.title', {defaultValue: 'Lifelong Learning'}),
      description: t('values.lifelong_learning.description', {defaultValue: "We believe that Orthodox education is a lifelong journey. We support spiritual formation from childhood through adulthood, providing age-appropriate resources that grow with students throughout their lives."}),
      icon: Church,
      color: "bg-church-600"
    }
  ]; */

  const values = [
    {
      title: t('values_page.values.orthodox_faith.title'),
      description: t('values_page.values.orthodox_faith.description'),
      icon: Cross,
      color: "bg-church-600"
    },
    {
      title: t('values_page.values.educational_excellence.title'),
      description: t('values_page.values.educational_excellence.description'),
      icon: BookOpen,
      color: "bg-church-600"
    },
    {
      title: t('values_page.values.community.title'),
      description: t('values_page.values.community.description'),
      icon: Users,
      color: "bg-church-600"
    },
    {
      title: t('values_page.values.inclusivity.title'),
      description: t('values_page.values.inclusivity.description'),
      icon: Globe,
      color: "bg-church-600"
    },
    {
      title: t('values_page.values.service.title'),
      description: t('values_page.values.service.description'),
      icon: HeartHandshake,
      color: "bg-church-600"
    },
    {
      title: t('values_page.values.lifelong_learning.title'),
      description: t('values_page.values.lifelong_learning.description'),
      icon: Church,
      color: "bg-church-600"
    }
  ];

  return (
    <>
      <PageHeader title={t('values_page.title', {defaultValue: 'Our Values'})} background="">
        <p className="text-lg text-gray-100">{t('values_page.subtitle', {defaultValue: 'The principles that guide our work'})}</p>
      </PageHeader>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{t('values_page.core_values_title', {defaultValue: 'Core Values'})}</h2>
            <p className="text-lg text-gray-700">
              {t('values_page.core_values_description', {defaultValue: 'At Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union, our work is guided by a set of core values that reflect our commitment to Orthodox Christian education and the spiritual formation of children and youth.'})}
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
            <h2 className="section-title">{t('values_page.approach.title', {defaultValue: 'Our Approach'})}</h2>
            
            <div className="prose prose-lg max-w-none">
              <p>
                {t('values_page.approach.intro', {defaultValue: 'Our approach to Orthodox Christian education is holistic, recognizing that faith formation involves the whole person—mind, body, and spirit. We believe that Sunday School should be more than just an academic exercise; it should be a transformative experience that helps children and youth develop a living relationship with Christ and His Church.'})}
              </p>
              
              <h3 className="font-serif text-2xl font-bold mt-8 mb-4">
                {t('values_page.approach.engage_title', {defaultValue: 'Engage the Whole Person'})}
              </h3>
              <p>
                {t('values_page.approach.engage_content', {defaultValue: 'We design our educational materials to engage students intellectually, emotionally, and spiritually. Through a combination of Scripture study, Church history, lives of the saints, liturgical education, and practical application, we help students develop a well-rounded understanding of the Orthodox faith.'})}
              </p>
              
              <h3 className="font-serif text-2xl font-bold mt-8 mb-4">
                {t('values_page.approach.tradition_title', {defaultValue: 'Connect with Tradition'})}
              </h3>
              <p>
                {t('values_page.approach.tradition_content', {defaultValue: 'We help students connect with the rich tradition of Orthodoxy in ways that are meaningful and accessible. By incorporating icons, hymns, prayers, and the liturgical calendar into our curriculum, we create an educational experience that is authentically Orthodox and deeply rooted in the life of the Church.'})}
              </p>
              
              <h3 className="font-serif text-2xl font-bold mt-8 mb-4">
                {t('values_page.approach.growth_title', {defaultValue: 'Foster Personal Growth'})}
              </h3>
              <p>
                {t('values_page.approach.growth_content', {defaultValue: 'We recognize that each student is on their own spiritual journey. Our materials and programs are designed to meet students where they are, addressing their questions and concerns while guiding them toward a deeper understanding of the faith and a more intimate relationship with Christ.'})}
              </p>
              
              <h3 className="font-serif text-2xl font-bold mt-8 mb-4">
                {t('values_page.approach.families_title', {defaultValue: 'Support Families'})}
              </h3>
              <p>
                {t('values_page.approach.families_content', {defaultValue: 'We believe that parents are the primary educators of their children in the faith. Our resources include components for family participation, helping parents continue the educational process at home and integrate Orthodox practices into family life.'})}
              </p>
            </div>
            
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <Heart className="w-8 h-8 text-red-500" />
                <h3 className="font-serif text-2xl font-bold">
                  {t('values_page.living_values.title', {defaultValue: 'Living Our Values'})}
                </h3>
              </div>
              <p className="text-gray-700 mb-6">
                {t('values_page.living_values.paragraph1', {defaultValue: 'Our values are not just words on a page—they guide everything we do at EOTC NACLAASSU. From curriculum development to teacher training, from youth events to parish consultation, we strive to embody these values in all aspects of our work.'})}
              </p>
              <p className="text-gray-700 mb-6">
                {t('values_page.living_values.paragraph2', {defaultValue: 'We invite you to join us in this important mission of nurturing the faith of the next generation. Together, we can help children and youth develop a strong foundation in the Orthodox faith that will support them throughout their lives.'})}
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
