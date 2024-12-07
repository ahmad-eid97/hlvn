"use client";

import React, { useState } from "react";
import SectionContent from "../components/section-wrapper";
import classNames from "classnames";
import LandingButton from "@features/landing/ui/components/landing-button";
import Link from "next/link";

function PricingSliderSection() {
    const [sliderValue, setSliderValue] = useState(1);
    return (
        <section id="#pricing">
          <div className="box pricing">
              <div className="header">
                <h1>Plans and Pricing</h1>
                <p>7 days free trial after which you can choose the most convenient subscription plan.</p>
              </div>
          </div>
          <div className="box plans">
            <div className="plan">
              <h2>Evaluator</h2>
              <span>Up to 10 users per organization</span>
              <h1>$1,999</h1>
              <p>(Can use the 3 calculators and compute final results, once  logged out all data will reset), this is the free level user registration, only  one alternative at a time can be computed. This is the basic registered  unpaid user level.</p>
              <div className="btns">
                <Link href="#contact">Contact us</Link>
              </div>
            </div>
            <div className="plan">
              <h2>Planner</h2>
              <span>Up to 5 users per organization
              </span>
              <h1>$1,999</h1>
              <p>Can compare more than one alternative simultaneously.</p>
              <div className="btns">
                <Link href="#contact">Contact us</Link>
                <button>Free now
                </button>
              </div>
            </div>
            <div className="plan">
              <h2>Decision</h2>
              <span>Up to 3 users per organization
              </span>
              <h1>$1,999</h1>
              <p>Export reports limited to 10 reports per subscription.</p>
              <div className="btns">
                <Link href="#contact">Contact us</Link>
                <button>Free now
                </button>
              </div>
            </div>
            <div className="plan">
              <h2>Enterprise</h2>
              <span>U1 user per organization
              </span>
              <h1>$1,999</h1>
              <p>EUnlimited reports</p>
              <div className="btns">
                <Link href="#contact">Contact us</Link>
                <button>Free now
                </button>
              </div>
            </div>
          </div>
        </section>
    );
}

export default PricingSliderSection;
