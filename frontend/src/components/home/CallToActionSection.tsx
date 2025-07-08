
import DonateButton from "@/components/DonateButton";
import JoinUsButton from "@/components/JoinUsButton";

const CallToActionSection = () => {
  return (
    <section className="py-20 bg-church-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join Our Mission</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Help us nurture the faith of the next generation. Your support makes our work possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <DonateButton className="bg-gold-500 hover:bg-gold-600 text-black" />
          <JoinUsButton className="bg-white hover:bg-gray-100 text-church-800" />
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
