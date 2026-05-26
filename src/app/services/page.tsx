import React from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import SectionWithMockup from "../../components/ui/section-with-mockup";

const serviceData1 = {
    title: (
        <>
            Precision Prototyping,
            <br />
            delivered to you.
        </>
    ),
    description: (
        <>
            Get high-quality 3D printed parts and custom
            <br />
            robotics components crafted by our engineering
            <br />
            team. We bring your digital designs to life with
            <br />
            rapid turnaround times and industrial-grade materials.
        </>
    ),
    primaryImageSrc: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    secondaryImageSrc: 'https://images.unsplash.com/photo-1622322300063-e380fb320399?q=80&w=1200&auto=format&fit=crop',
};

const serviceData2 = {
    title: (
        <>
            Innovation Lab,
            <br />
            at your fingertips.
        </>
    ),
    description: (
        <>
            Leverage our state-of-the-art facilities for your next
            <br />
            startup idea. From initial CAD modeling to
            <br />
            functional multi-material builds, we support your
            <br />
            journey from concept to working prototype.
        </>
    ),
    primaryImageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    secondaryImageSrc: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop',
};

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--dark-900)' }}>
                <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '40px' }}>
                    <h1 style={{ 
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontFamily: 'var(--font-space), sans-serif',
                        fontWeight: 800,
                        marginBottom: '16px',
                        color: 'var(--text-primary)'
                    }}>
                        Our <span className="gradient-text">Services</span>
                    </h1>
                </div>

                <SectionWithMockup
                    title={serviceData1.title}
                    description={serviceData1.description}
                    primaryImageSrc={serviceData1.primaryImageSrc}
                    secondaryImageSrc={serviceData1.secondaryImageSrc}
                />
                
                <SectionWithMockup
                    title={serviceData2.title}
                    description={serviceData2.description}
                    primaryImageSrc={serviceData2.primaryImageSrc}
                    secondaryImageSrc={serviceData2.secondaryImageSrc}
                    reverseLayout={true}
                />
            </main>
            <Footer />
        </>
    );
}
