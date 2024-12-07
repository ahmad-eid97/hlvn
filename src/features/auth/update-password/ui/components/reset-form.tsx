"use client";
import { Button, Form, Input } from "@/core/components/form";
import Password from "@/core/components/form/password";
import { useMutation } from "@tanstack/react-query";
import { reset } from "../../domain/api-calls/reset";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { passwordValidationRules } from "@/features/auth/signup/domain/models/validations";

const ForgotForm = () => {
    const router = useRouter();
    const [sucess, setSucess] = useState(false);
    const { mutate, isPending } = useMutation({
        mutationFn: ({
            email,
            token,
            password,
            password_confirmation,
        }: {
            email: string;
            token: string;
            password: string;
            password_confirmation: string;
        }) => {
            return reset(email, token, password, password_confirmation);
        },
        onSuccess: (res: any) => {
            setSucess(true);
        },
        onError: (err: any) => {
            message.error("Error occurred , please try again");
        },
    });
    const onfinish = (values: { password: string; password_confirmation: string }) => {
        const searchParams = new URLSearchParams(window.location.search);
        const emailValue = searchParams.get("email");
        const tokenValue = searchParams.get("token");

        if (!emailValue || !tokenValue) {
            message.error("Invalid reset link. Please check your email or try again.");
            return;
        }
        if (!values.password) {
            message.error("Password is required");
            return;
        }

        if (!values.password_confirmation) {
            message.error("Repeat password is required");
            return;
        }

        if (values.password !== values.password_confirmation) {
            message.error("Password must match");
            return;
        }

        mutate({
            email: emailValue,
            token: tokenValue,
            password: values.password,
            password_confirmation: values.password_confirmation,
        });
    };
    const handleRedirect = () => {
        router.replace("/login");
    };
    return sucess ? (
        <div className="w-[45%] h-screen flex items-center">
            <div className="w-[80%]  mx-auto  flex flex-col gap-[20px]">
                <svg
                    className="mx-auto"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_705_6524)">
                        <path
                            d="M14.6451 85.356C19.2356 89.9464 24.5832 93.5518 30.5372 96.0699C36.7036 98.6782 43.2519 100 50.0005 100C56.7492 100 63.2975 98.6771 69.4639 96.0699C75.4179 93.5518 80.7655 89.9464 85.356 85.356C89.9464 80.7655 93.5518 75.4179 96.0699 69.4639C98.6782 63.2975 100 56.7492 100 50.0005C100 44.6067 99.1449 39.2998 97.4599 34.2262C96.9162 32.5908 95.1498 31.7049 93.5144 32.2485C91.879 32.7922 90.993 34.5586 91.5367 36.194C93.0115 40.6315 93.7587 45.277 93.7587 50.0005C93.7587 61.6885 89.2068 72.6776 80.9427 80.9416C72.6775 89.2068 61.6896 93.7576 50.0016 93.7576C38.3137 93.7576 27.3247 89.2057 19.0606 80.9416C10.7954 72.6764 6.24457 61.6885 6.24457 50.0005C6.24457 38.3126 10.7965 27.3236 19.0606 19.0595C27.3258 10.7943 38.3137 6.24347 50.0016 6.24347C57.6494 6.24347 65.1739 8.24428 71.7641 12.0291C73.2586 12.8875 75.167 12.3725 76.0254 10.8779C76.8839 9.38336 76.3688 7.47499 74.8732 6.61655C67.3376 2.28806 58.7368 0 50.0005 0C43.2519 0 36.7036 1.32287 30.5372 3.93009C24.5832 6.44817 19.2356 10.0536 14.6451 14.644C10.0547 19.2345 6.44927 24.5821 3.93119 30.5361C1.32287 36.7036 0 43.2519 0 50.0005C0 56.7492 1.32287 63.2975 3.93009 69.4639C6.44927 75.4179 10.0536 80.7645 14.6451 85.356Z"
                            fill="#44AA55"
                        />
                        <path
                            d="M41.8498 56.8791C41.8498 56.8791 35.9123 53.1075 28.7411 47.3175C27.2025 46.0749 24.9397 46.3556 23.7533 47.936C22.8905 49.085 22.8201 50.6434 23.5729 51.8661C27.2014 57.7629 33.4702 67.0626 38.3181 73.1718C40.6062 76.0552 44.6672 76.3216 47.3361 73.7881C62.6889 59.2167 76.9389 40.8341 94.0009 15.3804C94.9903 13.9045 94.4928 11.8971 92.9267 11.0563C91.7304 10.4147 90.2524 10.6546 89.3202 11.6407C70.3906 31.6829 60.6837 41.2094 41.8498 56.8791Z"
                            fill="#44AA55"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_705_6524">
                            <rect width="100" height="100" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                <div className="flex flex-col gap-[4px] ">
                    <h1 className="text-text-primary text-[24px] font-[500] text-center">
                        Your password has been updated
                    </h1>
                </div>
                <div className="flex flex-col gap-[16px]">
                    <Button href={"/login"} onClick={handleRedirect}>
                        Continue
                    </Button>
                </div>
            </div>
            <div></div>
        </div>
    ) : (
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
                        <label className="text-text-secondary text-[16px]" htmlFor="">
                            New password
                        </label>
                        <Password name="password" rules={passwordValidationRules} placeholder="Enter new password" />
                    </div>
                    <div>
                        <label className="text-text-secondary text-[16px]" htmlFor="">
                            Repeat password
                        </label>
                        <Password name="password_confirmation" placeholder="Repeat new password" />
                    </div>
                    <div className="flex flex-col gap-[16px] mt-[42px]">
                        <Button loading={isPending} disabled={isPending} htmlType="submit">
                            Update password
                        </Button>
                    </div>
                </Form>
            </div>
            <div></div>
        </div>
    );
};

export default ForgotForm;
