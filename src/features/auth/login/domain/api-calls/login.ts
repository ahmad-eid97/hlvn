import ApiClient from "@/core/api-client";

export const login = async (email: string, password: string) => {
    const res = await ApiClient.post("/auth-user/login-user", { email, password });
    return res?.data;
};