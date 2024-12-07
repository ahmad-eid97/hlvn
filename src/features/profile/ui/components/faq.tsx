"use client";
import ApiClient from "@/core/api-client";
import ComponentThemeProvider from "@/core/components/component-theme-provider";
import { useQuery } from "@tanstack/react-query";
import { Collapse } from "antd";

export default function FAQComponent() {
    const fetchFAQ = async () => {
        const response = await ApiClient.get("/f-a-qs");
        return response.data.data.map((faq: any) => ({
            label: <Title text={faq.question} />,
            children: faq.answer,
        }));
    };
    const {
        data: items = [],
        isLoading,
        isError,
    } = useQuery(
        {
            queryKey: ["faqs"],
            queryFn: () => {
                return fetchFAQ();
            },
            staleTime: 5 * 1000,
        } 
    );

    if (isLoading) {
        return <div className="p-[20px]">Loading FAQs...</div>;
    }

    if (isError) {
        return <div className="p-[20px]">Failed to load FAQs. Please try again later.</div>;
    }

    return (
        <div className="mt-[20px]">
            <ComponentThemeProvider>
                <Collapse className="bg-white" accordion bordered={false} expandIconPosition="end" items={items} />
            </ComponentThemeProvider>
        </div>
    );
}

const Title = ({ text }) => {
    return <span className="font-[500] text-[16px]">{text}</span>;
};
