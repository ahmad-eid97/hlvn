import FAQComponent from "../components/faq";

export default function FAQPage() {
    return (
        <div className="flex w-full flex-col border bg-white rounded-[8px] border-[#DCDEE0]  pt-[30px] ">
            <div className="px-[16px]">
                <h1 className="text-[22px] font-[600] mb-[12px] ">Frequently asked questions</h1>
                <span className="text-[14px] font-[400]">You can find the answers to the most common questions.</span>
            </div>
            <hr className="bg-[#A1A3A7] mt-[30px]" />
            <FAQComponent />
        </div>
    );
}
