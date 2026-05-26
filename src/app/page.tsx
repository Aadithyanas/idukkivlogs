'use client';

import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import LoadingScreen from '../components/ui/LoadingScreen';
import ParticleBackground from '../components/ui/ParticleBackground';
import MouseGlow from '../components/ui/MouseGlow';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import TravelSection from '../components/travel/TravelSection';
import ProjectsSection from '../components/projects/ProjectsSection';
import PrintingSection from '../components/printing/PrintingSection';
import StartupLabSection from '../components/startup/StartupLabSection';
import GallerySection from '../components/gallery/GallerySection';
import ContactSection from '../components/contact/ContactSection';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ParticleBackground />
      <MouseGlow />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <TravelSection />
        <ProjectsSection />
        <PrintingSection />
        {/* <StartupLabSection /> */}
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
