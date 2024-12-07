import ApiClient from "@/core/api-client";

export const forgot = async (email: string) => {
    const res = await ApiClient.post("/auth-user/forgot-password", { email });
    return res?.data;
};