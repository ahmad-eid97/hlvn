import React from "react";
import SectionContent from "../components/section-wrapper";
import { ArrowLongEndIcon, Calc, CategoryIcon, UsersIcon, WalletIcon } from "@icons";
import classNames from "classnames";

function FeaturesSection() {
    const cards = [
        {
            icon: <Calc />,
            title: "Pharmaceutical Products Quantity Calculator",
            description: "Quantify the number of packs or unit doses needed per course of treatment.",
        },
        {
          icon: <Calc />,
            title: "Population Calculator",
            description: "This tool helps you categorize your served population into patients' subgroups.",
        },
        {
          icon: <Calc />,
            title: "Cost Calculator",
            description: "Our user friendly tool to calculate your cost elements and compare alternatives.",
        },
        {
          icon: <Calc />,
            title: "Projects and Reports",
            description: "This brilliant feature enables you to export an informative and structured report within minutes.",
        },
    ];

    return (
        <section id="calculators">
            <SectionContent>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <div className="items">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className={'item'}>
                                <div className="icon">
                                    {card.icon}
                                </div>
                                <h2>
                                    {card.title}
                                </h2>
                                <p>{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionContent>
        </section>
    );
}

export default FeaturesSection;
