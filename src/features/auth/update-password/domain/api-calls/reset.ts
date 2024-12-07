import ApiClient from "@/core/api-client";

export const reset = async (email: string,token:string,password:string,password_confirmation:string) => {
    const res = await ApiClient.post("/auth-user/reset-password", { email,token,password,password_confirmation });
    return res?.data;
};