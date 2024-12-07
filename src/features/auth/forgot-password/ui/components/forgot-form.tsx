"use client";
import { Button, Form, Input } from "@/core/components/form";
import Password from "@/core/components/form/password";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { forgot } from "../../domain/api-calls/forgot";
import { message } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ForgotForm = () => {
    const router = useRouter();
    const { mutate, isPending } = useMutation({
        mutationFn: ({ email }: { email: string }) => {
            return forgot(email);
        },
        onSuccess: (res:any) => {
            message.success("Link sent , please check your email");
        },
        onError: (err:any) => {
            message.error("Error occurred , please try again");
        },
    });
    const onfinish = (values: { email: string }) => {
        mutate({
            email: values.email,
        });
    };
    return (
        <div className="w-[45%] h-screen flex items-center">
            <div className="w-[80%]  mx-auto  flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[4px] ">
                    <h1 className="text-text-primary text-[24px] font-[500] text-center">Password Reset</h1>
                    <p className="text-text-tertiary text-center text-[16px] font-[400]">
                    We’ll send a link to reset your password.
                    </p>
                </div>

                <Form onFinish={onfinish}>
                    <div>
                        <label className="text-text-secondary font-[500] text-[16px]" htmlFor="">
                            Email Address
                        </label>
                        <Input
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your full email",
                                },
                            ]}
                            className=""
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col gap-[16px] mt-[42px]">
                        <Button loading={isPending} disabled={isPending} htmlType="submit">
                            Get Link
                        </Button>
                        <p className="mx-auto ">
                            <span className="text-text-tertiary text-[14px]">Don&apos;t have an account? </span>
                            <Link className="text-text-primary" href="/signup">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
            <div></div>
        </div>
    );
};

export default ForgotForm;
