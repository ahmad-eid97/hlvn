"use client";
import { useQuery } from "@tanstack/react-query";
import ProfileForm from "../components/profile-form";
import { getCurrentUser } from "@/features/auth/user-api";
import LoadingContainer from "@/core/components/loading-container";
import { Spin } from "antd";

export default function SettingsPage() {
    const { data, isPending } = useQuery({
        queryKey: ["profile"],
        queryFn: getCurrentUser,
    });

    console.log(data , "loading");
    
    return (
        
            <div className="flex w-full flex-col border bg-white rounded-[8px] border-[#DCDEE0]  pt-[30px]  ">
                <div className="px-[16px]">
                    <h1 className="text-[22px] font-[600] mb-[12px] ">Edit Account Settings</h1>
                    <span className="text-[14px] font-[400]">Update your username and manage your account.</span>
                </div>
                <hr className="bg-[#A1A3A7] mt-[30px]" />
                <ProfileForm loading = {isPending} data = {data?.data} />
            </div>
 
    );
}
