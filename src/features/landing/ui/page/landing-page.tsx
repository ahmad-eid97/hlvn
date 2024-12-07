import React from "react";
import HeroSection from "../sections/hero-section";
import FeaturesSection from "@features/landing/ui/sections/features-section";
import TiersSection from "@features/landing/ui/sections/tiers-section";
import PricingSliderSection from "@features/landing/ui/sections/pricing-slider-section";
import HomeNavbar from "@features/landing/ui/components/home-navbar";
import { cookies } from "next/headers";
import WhatisHLVN from "../sections/what-is-hlvn";
import FAQHome from "../sections/faq-home";
import ContactHome from "../sections/contact-home";
import Footer from "../sections/footer";

function LandingPage() {
    const routes = [
        {
            name: "Calculators",
            href: cookies().get('token') ? "/history" : "#calculators",
        },
        {
            name: "Pricing",
            href: "#pricing",
        },
        {
            name: "Contact us",
            href: "#contact",
        },
    ];
    return (
        <main className="bg-white sm:[&>section]:scroll-mt-14 md:[&>section]:scroll-mt-0">
            <HomeNavbar routes={routes} />
            <HeroSection />
            <FeaturesSection />
            <WhatisHLVN/>
            <PricingSliderSection />
            <ContactHome />
            <FAQHome />
            <Footer/>
        </main>
    );
}

export default LandingPage;
