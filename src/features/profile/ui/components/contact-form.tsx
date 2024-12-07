"use client";
import { useRef, useState } from "react";
import { Button, Form, Input, TextArea } from "@/core/components/form";
import { useMutation } from "@tanstack/react-query";
import { contactUs } from "../../domain/api-calls";
import { message } from "antd";

export default function ContactForm() {
    const fileInputRef = useRef<any>(null);
    const [fileName, setFileName] = useState<string>("No file Chosen");
    const { mutate, isPending } = useMutation({
        mutationFn: (values: any) => {
            return contactUs(values);
        },
        onSuccess: () => {
            message.success("Message sent successfully");
        },
        onError: () => {
            message.error("Failed to send message");
        },
    });
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        }
    };
    const onFinish = (values: any) => {
        console.log(values, "contactvalues");

        mutate({
            ...values,
            file: fileInputRef.current.files[0] ?? null,
        });
    };
    return (
        <Form onFinish={onFinish}>
            <div className="flex flex-col w-[350px] !pl-[16px] !py-[20px]">
                <Input name={"name"} label="Name" required />
                <Input name={"email"} label="Email" required />
                <Input name={"organization_name"} label="Organization name" required />
                <TextArea name={"description"} label="How can we help" className="!h-[107px]" required />

                <div className="flex items-center">
                    <button
                        type="button"
                        className="bg-white border border-black rounded-[12px] p-[6px]"
                        onClick={handleButtonClick}>
                        Choose File
                    </button>
                    <span className="ml-2">{fileName}</span>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className="!hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>
                <div className="w-full flex justify-center">
                    <Button htmlType="submit" loading={isPending} className="!w-[200px] !my-[20px]">
                        Submit
                    </Button>
                </div>
        </Form>
    );
}
