import Hero from "../components/home/Hero";
import FeaturedFoods from "../components/home/FeaturedFoods";
import Categories from "../components/home/Categories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";

function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedFoods />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <CTA />
    </main>
  );
}

export default Home;
