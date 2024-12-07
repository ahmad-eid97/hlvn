import React from "react";
import TierCard from "@components/pricing-tiers/tier-card";

function PricingTiers() {
    const tiers = [
        {
            name: "Evaluator User",
            price: 0,
            buttonText: "Try It Free For 14 Days",
            options: [
                {
                    label: "Use quantity calculator",
                    available: true,
                },
                {
                    label: "Use population calculator",
                    available: true,
                },
                {
                    label: "Use cost calculator",
                    available: true,
                },
                {
                    label: "Extract reports (Only one report)",
                    available: true,
                },
                {
                    label: "Create projects",
                    available: false,
                },
                {
                    label: "Save results",
                    available: false,
                },
                {
                    label: "Get reports",
                    available: false,
                },
            ],
        },
        {
            name: "Decision User",
            price: 123,
            options: [
                {
                    label: "Use quantity calculator",
                    available: true,
                },
                {
                    label: "Use population calculator",
                    available: true,
                },
                {
                    label: "Use cost calculator",
                    available: true,
                },
                {
                    label: "Extract reports (Only one report)",
                    available: true,
                },
                {
                    label: "Create projects",
                    available: true,
                },
                {
                    label: "Save results",
                    available: true,
                },
                {
                    label: "Get reports",
                    available: true,
                },
            ],
        },
        {
            name: "Enterprise User",
            price: 234,
            recommended: true,
            options: [
                {
                    label: "Use quantity calculator",
                    available: true,
                },
                {
                    label: "Use population calculator",
                    available: true,
                },
                {
                    label: "Use cost calculator",
                    available: true,
                },
                {
                    label: "Extract reports (Only one report)",
                    available: true,
                },
                {
                    label: "Create projects",
                    available: true,
                },
                {
                    label: "Save results",
                    available: true,
                },
                {
                    label: "Get reports",
                    available: true,
                },
            ],
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 items-center gap-4 w-full">
            {tiers.map((tier) => (
                <TierCard key={tier.name} {...tier} />
            ))}
        </div>
    );
}

export default PricingTiers;
