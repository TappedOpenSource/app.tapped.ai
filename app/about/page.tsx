import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <Nav />
      <main className="container mx-auto py-8">

        <section className="shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">about tapped</h2>
          <p className="text-lg mb-4">we turn dreams of global performance into reality. as the premier
        live music data company, we specialize in crafting unforgettable world tours for performers of any
        scale.</p>
          <p className="text-lg mb-4">harnessing the power of data and custom machine learning models, we provide unparalleled
        insights and guidance in the dynamic live music industry.</p>
          <p className="text-lg mb-4">our mission is simple: to empower artists with the tools and knowledge they need to
        thrive on the world stage. whether you&apos;re a budding talent or a seasoned superstar, our innovative
        approach ensures that every aspect of your tour is optimized for success.</p>
        </section>

        <section className="shadow-md rounded-lg p-4 mt-4">
          <h2 className="text-2xl font-bold mb-4">our approach</h2>
          <p className="text-lg mb-4">at tapped, we understand that no two artists are alike. that&apos;s why our solutions
        are as unique as the performers we serve. our dedicated team of experts works closely with each
        client to understand their vision, preferences, and goals, crafting a personalized tour strategy
        that exceeds expectations.</p>
        </section>

        <section className="shadow-md rounded-lg p-4 mt-4">
          <h2 className="text-2xl font-bold mb-4">join us</h2>
          <p className="text-lg mb-4">join us on a journey where creativity meets analytics, and passion meets precision.
        together, let&apos;s elevate the live music experience and create unforgettable moments on stages
        around the globe. welcome to the future of touring with Tapped.</p>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default About;
