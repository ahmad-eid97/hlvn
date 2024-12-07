'use client';
import { useState } from "react";
import Image from "next/image";

function WhatisHLVN() {
    const [activeStep, setActiveStep] = useState(1); // Initialize the active step state

    const handleStepClick = (step) => {
        setActiveStep(step); // Update the active step state
    };

    return (
        <section className="whatishlvn">
            <Image src={"/images/hlvn.svg"} alt="what is hlvn" width={700} height={400} />
            <div className="whatisText">
                <h1>HLVN is a user-friendly tool to support your decision-making within minutes.</h1>
                <span>
                    You can use our calculators independently to get instant results for your decision. You can also use
                    them combined to deliver comprehensive reports.
                </span>
                <div className="steps">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`step ${activeStep === step ? "active" : ""}`}
                            onClick={() => handleStepClick(step)} // Set the active step on click
                        >
                            <div className="stepNum">
                                <span>{`0${step}`}</span>
                            </div>
                            <div className="sText">
                                <h2>
                                    {step === 1
                                        ? "User friendly interface"
                                        : step === 2
                                        ? "Instant results"
                                        : "Informative reporting"}
                                </h2>
                                <p>
                                    Our experts made extensive research to deliver the most user-friendly approach at
                                    your convenience.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhatisHLVN;
