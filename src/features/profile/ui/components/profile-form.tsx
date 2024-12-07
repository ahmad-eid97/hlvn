import { Button, Form, FormHooks, Input, Select } from "@/core/components/form";
import { getCities, getCountries, getStates } from "@/features/auth/signup/domain/api-calls/Address";
import { User } from "@/features/auth/signup/domain/models/Signup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message, Spin } from "antd";
import { useEffect, useState } from "react";
import { updateProfile } from "../../domain/api-calls";

export default function ProfileForm({ loading, data }: { loading: boolean; data: any }) {
    const [countryId, setCountryId] = useState<number | null>(null);
    const [stateId, setStateId] = useState<number | null>(null);

    const [form] = FormHooks.useForm();
    const { data: countries, isPending: isCountriesLoading } = useQuery({
        queryKey: ["countries"],
        queryFn: () => {
            return getCountries();
        },
    });
    const { data: states, isPending: isStatesLoading } = useQuery({
        queryKey: ["states", countryId],
        queryFn: () => {
            return getStates(countryId);
        },
    });
    const { data: cities, isPending: isCitiesLoading } = useQuery({
        queryKey: ["cities", stateId],
        queryFn: () => {
            return getCities(stateId);
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (values: any) => {
            return updateProfile(values);
        },
        onSuccess: (res) => {
            message.success(res.message);
        },
        onError: (err: any) => {
            message.error(err?.response?.data?.message);
        },
    });

    useEffect(() => {
        setCountryId(data?.country?.id);
        setStateId(data?.state?.id);
        console.log(stateId, countryId, "dataprof");

        form.setFieldsValue({
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            country_id: data?.country?.id,
            job_function: data?.job_function,
            job_role: data?.job_role,
        });
    }, [data]);

    useEffect(() => {
        console.log(data?.state?.id, data?.city?.id, "data");

        form.setFieldsValue({
            state_id: data?.state?.id,
            city_id: data?.city?.id,
        });
    }, [data]);

    const onFinish = (values: User) => {
        mutate({
            ...values,
            organization_name: data?.organization_name,
        });
    };
    if (loading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Spin />
            </div>
        );
    }
    return (
        <Form form={form} onFinish={onFinish} className="  !my-[24px]  ">
            <div className="grid grid-cols-2 !pl-[16px] w-[70%]">
                <span className="mb-[24px]">Full Name</span>
                <Input
                    name={"name"}
                    className="!w-[350px]"
                    placeholder="Enter your name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                />

                <span className="mb-[24px]">Email Address</span>
                <Input
                    name={"email"}
                    className="!w-[350px]"
                    placeholder="Enter your email"
                    rules={[{ required: true, message: "Please enter your email" }]}
                />

                <span className="mb-[24px]">Phone Number</span>
                <Input
                    name={"phone"}
                    className="!w-[350px]"
                    placeholder="Enter your Phone"
                    rules={[{ required: true, message: "Please enter your phone" }]}
                />

                <span className="mb-[24px]">Country</span>
                <Select
                    name={"country_id"}
                    className="!w-[350px]"
                    loading={isCountriesLoading}
                    placeholder="Select tour Country"
                    onChange={(value) => {
                        setCountryId(value);
                        form.setFieldsValue({ state_id: undefined });
                        form.setFieldsValue({ city_id: undefined });
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

                <span className="mb-[24px]">State</span>
                <Select
                    name="state_id"
                    className="!w-[350px]"
                    loading={isStatesLoading}
                    onChange={(value) => {
                        setStateId(value);
                        form.setFieldsValue({ city_id: undefined });
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Please select your state",
                        },
                    ]}
                    placeholder="Select your State"
                    options={
                        states
                            ? states.map((state) => ({
                                  label: state.name,
                                  value: state.id,
                              }))
                            : []
                    }
                />

                <span className="mb-[24px]">City</span>
                <Select
                    className="!w-[350px]"
                    name="city_id"
                    loading={isCitiesLoading}
                    rules={[
                        {
                            required: true,
                            message: "Please select your city",
                        },
                    ]}
                    placeholder="City"
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
            <hr className="bg-[#A1A3A7] mt-[0px] w-full" />

            <div className="mt-[24px]">
                <div className="grid grid-cols-2 !pl-[16px] w-[70%]">
                    <span className="mb-[24px]">Job Function</span>
                    <Input
                        name={"job_function"}
                        className="!w-[350px]"
                        placeholder="Enter your Job Function"
                        rules={[{ required: true, message: "Please enter your Job Function" }]}
                    />
                </div>
                <div className="grid grid-cols-2 !pl-[16px] w-[70%]">
                    <span className="mb-[24px]">Job Role</span>
                    <Input
                        name={"job_role"}
                        className="!w-[350px]"
                        placeholder="Enter your Job Role"
                        rules={[{ required: true, message: "Please enter your Job Role" }]}
                    />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Button htmlType="submit" loading={isPending} className="!w-[200px] mt-[24px] ">
                    Save Changes
                </Button>
            </div>
        </Form>
    );
}
