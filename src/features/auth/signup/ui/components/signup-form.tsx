"use client";
import { Button, Form, FormHooks, Input, Select } from "@/core/components/form";
import Password from "@/core/components/form/password";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React from "react";
import { User } from "../../domain/models/Signup";
import { signup } from "../../domain/api-calls/Signup";
import { getCities, getCountries, getStates } from "../../domain/api-calls/Address";
import { message } from "antd";
import { passwordValidationRules } from "../../domain/models/validations";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupForm = () => {
    const [form] = FormHooks.useForm();
    const [countryId, setCountryId] = React.useState<number | null>(null);
    const [stateId, setStateId] = React.useState<number | null>(null);
    const router = useRouter();
    const { mutate, isPending } = useMutation({
        mutationFn: (userData: User) => {
            return signup(userData);
        },
        onSuccess: (res) => {
            console.log(res, "resss");
            
            Cookies.set("token", res?.data?.token);
            router.push("/quantity-calculator");
            message.success("User created successfully");
        },
        onError: (error) => {
            message.error(error?.message);
        },
    });

    const { data: countries, isPending: isCountriesLoading } = useQuery({
        queryKey: ["countries"],
        queryFn: () => {
            return getCountries();
        },
    });
    const { data: states, isPending: isStatesLoading } = useQuery({
        queryKey: ["states", countryId],
        queryFn: () => {
            return getStates(form.getFieldValue("country_id"));
        },
    });
    const { data: cities, isPending: isCitiesLoading } = useQuery({
        queryKey: ["cities", stateId],
        queryFn: () => {
            return getCities(form.getFieldValue("state_id"));
        },
    });
    const onFinish = (values) => {
        console.log(values, "submitvalues");
        mutate(values);
    };
    return (
        <div className="flex flex-col w-[45%] bg-white  overflow-y-auto max-h-screen">
            <div className="w-[80%] mx-auto my-[24px]">
                <header className="mb-[24px]">
                    <h1 className="text-[24px] font-[500] text-center">Sign up for an account</h1>
                    <p className="text-center w-[350px] mx-auto">
                        Join the future of <b>HLVN</b> management. Sign up now for your Wiko account!
                    </p>
                </header>
                <Form onFinish={onFinish} form={form} className="flex flex-col">
                    <div>
                        <label className="text-text-secondary text-[16px]" htmlFor="">
                            Full Name
                        </label>
                        <Input
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your full name",
                                },
                            ]}
                            className=""
                            type="text"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label className="text-text-secondary text-[16px]" htmlFor="">
                            Email Address
                        </label>
                        <Input
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your email address",
                                },
                            ]}
                            type="email"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div>
                        <label className="text-text-secondary text-[16px]" htmlFor="">
                            Phone Number
                        </label>
                        <Input
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your phone number",
                                },
                            ]}
                            type="tel"
                            placeholder="Enter your Phone number"
                        />
                    </div>
                    <div>
                        <label className="text-text-secondary text-[16px]" htmlFor="">
                            Country
                        </label>
                        <Select
                            loading={isCountriesLoading}
                            placeholder="Select a Country"
                            name="country_id"
                            onChange={(value) => {
                                setCountryId(value);
                                form.setFieldsValue({ state: undefined });
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please select your country",
                                },
                            ]}
                            options={
                                countries
                                    ? countries.map((country) => ({
                                          label: country.name,
                                          value: country.id,
                                      }))
                                    : []
                            }
                        />
                    </div>

                    <div className="flex gap-[16px]">
                        <div className="flex-[1]">
                            <label className="text-text-secondary text-[16px]" htmlFor="">
                                State
                            </label>
                            <Select
                                name="state_id"
                                onChange={(value) => {
                                    setStateId(value);
                                    form.setFieldsValue({ city: undefined });
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select your state",
                                    },
                                ]}
                                placeholder="State"
                                loading={isStatesLoading}
                                options={
                                    states
                                        ? states.map((state) => ({
                                              label: state.name,
                                              value: state.id,
                                          }))
                                        : []
                                }
                            />
                        </div>
                        <div className="flex-[1]">
                            <label className="text-text-secondary text-[16px]" htmlFor="">
                                City
                            </label>
                            <Select
                                name="city_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select your city",
                                    },
                                ]}
                                placeholder="City"
                                loading={isCitiesLoading}
                                options={
                                    cities
                                        ? cities.map((city) => ({
                                              label: city.name,
                                              value: city.id,
                                          }))
                                        : []
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-text-secondary text-[16px]" htmlFor="">
                            Organization Name
                        </label>
                        <Input
                            name="organization_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your company name",
                                },
                            ]}
                            placeholder="Enter your company name"
                        />
                    </div>

                    <div className="flex gap-[16px]">
                        <div className="flex-[1]">
                            <label className="text-text-secondary text-[16px]" htmlFor="">
                                What’s your job function?
                            </label>
                            <Input
                                name="job_function"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your job function",
                                    },
                                ]}
                                placeholder="Enter your job function"
                            />
                        </div>
                        <div className="flex-[1]">
                            <label className="text-text-secondary text-[16px]" htmlFor="">
                                what’s your job role?
                            </label>
                            <Input
                                name="job_role"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your job role",
                                    },
                                ]}
                                placeholder="Write down tour job role"
                            />
                        </div>
                    </div>
                    {/* <div>
                        <label className="text-text-secondary text-[16px]" htmlFor="">
                            Work Place
                        </label>
                        <Input
                            name="work_place"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your workplace",
                                },
                            ]}
                            placeholder="Enter your workplace"
                        />
                    </div> */}
                    <div>
                        <label className="text-text-secondary text-[16px]" htmlFor="">
                            Password
                        </label>
                        <Password name="password" rules={passwordValidationRules} placeholder="Enter your password" />
                    </div>
                    <div  className="flex flex-col gap-[16px] mt-[42px]">

                    <Button htmlType="submit" loading={isPending} disabled={isPending}>
                        Sign Up
                    </Button>
                    <p className="mx-auto ">
                            <span className="text-text-tertiary text-[14px]">Already have an account? </span>
                            <Link className="text-text-primary" href="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignupForm;
