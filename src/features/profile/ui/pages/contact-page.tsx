import React from "react";
import ContactForm from "../components/contact-form";

export default function ContactPage() {
    return (
        <div className="flex w-full flex-col border bg-white rounded-[8px] border-[#DCDEE0]  pt-[30px] ">
            <div className="px-[16px]">
                <h1 className="text-[22px] font-[600] mb-[12px] ">Contact us</h1>
                <span className="text-[14px] font-[400]">
                    Have any questions or problems, email us. We&apos;re here to help.
                </span>
            </div>
        <hr className="bg-[#A1A3A7] mt-[30px]" />

            <ContactForm />
        </div>
    );
}
