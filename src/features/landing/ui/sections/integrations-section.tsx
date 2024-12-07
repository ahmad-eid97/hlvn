import React from "react";
import SectionContent from "../components/section-wrapper";
import { CheckBulletIcon } from "@icons";
import Image from "next/image";

function IntegrationsSection() {
    const items = [
        {
            title: "Website Content Creation",
            description: "Hey, we’re Bluegg. We’re a marketing agency in (sometimes) sunny Cardiff.",
        },
        {
            title: "Google Ads & PPC Services",
            description: "We’re friendly, but we not afraid to challenge things. If you want results.",
        },
        {
            title: "Link Building",
            description: "We’ve been creating great work since the days before you want Google.",
        },
    ];

    return (
        <section>
            <SectionContent className="flex flex-row items-center justify-between gap-4">
                <Image src="/images/integrations.svg" alt="Integration Image" width={1000} height={1000} />
                <div className="flex flex-col justify-between gap-10 h-full">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-row gap-3.5">
                            <CheckBulletIcon className="flex-shrink-0 relative top-1" />
                            <div>
                                <h2 className="text-landing-primary text-2xl font-medium mb-2">{item.title}</h2>
                                <p className="text-[#98A2A6] text-base font-normal">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionContent>
        </section>
    );
}

export default IntegrationsSection;
