"use client";
import { Button, Form, Input } from "@/core/components/form";
import Password from "@/core/components/form/password";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { login } from "../../domain/api-calls/login";
import { message } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

const LoginForm = () => {
  const router = useRouter();
  useEffect(() => {
    if(Cookies.get('token')){
      router.replace('/')
    }
  }, [])
    const { mutate, isPending } = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => {
            return login(email, password);
        },
        onSuccess: (res:any) => {
            console.log("resfromlogin", res);
            message.success("Login successful");
            
            Cookies.set("token", res?.data?.token);
            router.push("/quantity-calculator");

        },
        onError: (err:any) => {
        
            
            message.error("Wrong email or password");
        },
    });
    const onfinish = (values: { email: string; password: string }) => {
        mutate({
            email: values.email,
            password: values.password,
        });
    };
    return (
        <div className="w-[45%] h-screen flex items-center">
            <div className="w-[80%]  mx-auto  flex flex-col gap-[32px]">
                <div className="flex flex-col gap-[4px] ">
                    <h1 className="text-text-primary text-[24px] font-[500] text-center">Welcome Back</h1>
                    <p className="text-text-tertiary text-center text-[16px] font-[400]">
                        Been a while! Ready to dive back in? Let&apos;s get you signed in and back to business!
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
                    <div>
                        <label className="text-text-secondary text-[16px]" htmlFor="">
                            Password
                        </label>
                        <Password name="password" placeholder="Enter your password" />
                    </div>
                    <div className="forgot">
                      <Link href={"/forgot-password"}>Forgot Your Password?</Link>
                    </div>
                    <div className="flex flex-col gap-[16px] mt-[42px]">
                        <Button loading={isPending} disabled={isPending} htmlType="submit">
                            Sign in
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

export default LoginForm;
