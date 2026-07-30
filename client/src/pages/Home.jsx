import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/home/Hero";
import FeaturedFoods from "../components/home/FeaturedFoods";
import Categories from "../components/home/Categories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
//test
import toast from "react-hot-toast";
function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        {/* {toast.success("Order status updated")} */}
        <Categories />
        <FeaturedFoods />
        <WhyChooseUs />
        <Statistics />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}

export default Home;