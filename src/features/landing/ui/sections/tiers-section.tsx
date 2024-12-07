import React from "react";
import SectionContent from "../components/section-wrapper";
import PricingTiers from "@components/pricing-tiers";

function TiersSection() {
    return (
        <section >
            <SectionContent className="w-full flex items-center justify-center">
                <PricingTiers />
            </SectionContent>
        </section>
    );
}

export default TiersSection;
