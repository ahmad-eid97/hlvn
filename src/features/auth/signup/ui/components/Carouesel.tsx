"use client";

import { Carousel } from "antd";
import Image from "next/image";
import React from "react";
import Carouseldots from "./Carouseldots";

const Carouesel = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const carouselRef = React.useRef<any>(null);
    const goToSlide = (index) => {
        setCurrentSlide(index);
        if (carouselRef.current) {
            carouselRef.current.goTo(index);
        }
    };
    return (
        <div className="w-[55%] relative">
            <Carousel
                ref={carouselRef}
                dotPosition="top"
                autoplay
                dots={false}
                className="[&.slick-dots]:!top-[unset]   h-screen"
                beforeChange={(current, next) => setCurrentSlide(next)}>
                <div className="relative">
                    <Image
                        src={"/images/auth/carousel-1.svg"}
                        alt="carousel"
                        className="w-full h-full max-h-screen object-cover"
                        width={400}
                        height={400}
                    />
                    <div className="absolute bottom-[60px] left-[24px] z-10 p-[16px]">
                        <h1 className="text-[30px] font-[500] text-[#fff]">Health Calculators</h1>
                        <p className="text-white ">
                            Welcome to health calculators! Whether you are a doctor, a medical student or a patient, you
                            will find answers to your medical questions here, as well as receive a lot of scientifically
                            proven information. What is my renal function and what does it mean? How much blood do I
                            have? How to dose medication to children? What is my risk of having lung cancer? These are
                            just a few examples of what you can learn! HLVN and MELD Score sound strange to you? HLVN
                            Calculator will explain these terms and help you determine your own result! Don’t hesitate,
                            solve your medical issues with us!
                        </p>
                    </div>
                    <Image
                        width={100}
                        height={100}
                        className="absolute top-0 left-0 h-screen w-full object-cover z-0"
                        alt="logo"
                        src={"/images/auth/carousel-background.svg"}
                    />
                </div>
                <div className="relative">
                    <Image
                        src={"/images/auth/carousel-2.svg"}
                        alt="carousel"
                        className="w-full h-full max-h-screen object-cover"
                        width={400}
                        height={400}
                    />
                    <div className="absolute bottom-[60px] left-[24px] z-10 p-[16px]">
                        <h1 className="text-[30px] font-[500] text-[#fff]">Health Calculators</h1>
                        <p className="text-white ">
                            Welcome to health calculators! Whether you are a doctor, a medical student or a patient, you
                            will find answers to your medical questions here, as well as receive a lot of scientifically
                            proven information. What is my renal function and what does it mean? How much blood do I
                            have? How to dose medication to children? What is my risk of having lung cancer? These are
                            just a few examples of what you can learn! HLVN and MELD Score sound strange to you? HLVN
                            Calculator will explain these terms and help you determine your own result! Don’t hesitate,
                            solve your medical issues with us!
                        </p>
                    </div>
                    <Image
                        width={100}
                        height={100}
                        className="absolute top-0 left-0 h-screen w-full object-cover z-0"
                        alt="logo"
                        src={"/images/auth/carousel-background.svg"}
                    />
                </div>
            </Carousel>

            <Carouseldots currentSlide={currentSlide} goToSlide={goToSlide}/>
            <Image
                width={100}
                height={100}
                className="absolute top-[24px] w-[92px] left-[24px]"
                alt="logo"
                src={"/images/hlvn-logo.svg"}
            />
        </div>
    );
};

export default Carouesel;
