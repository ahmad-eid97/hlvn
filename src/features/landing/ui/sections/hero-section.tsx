import React from "react";
import SectionContent from "../components/section-wrapper";
import LandingButton from "../components/landing-button";
import Image from "next/image";

function HeroSection() {
    return (
        <section className="home">
          <div className="box text">
            <span>HeaLthcare Value Navigator</span>
            <h1>HLVN is a powerful Decision Support tool to plan Healthcare costs.</h1>
            <p>Get rapid insights over the patient joureny cost through using our calculators.</p>
          <Image src={'/images/hero.svg'} width={1200} height={600} alt="hero"/>
          </div>
        </section>
    );
}

export default HeroSection;
