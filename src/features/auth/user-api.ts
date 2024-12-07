import ApiClient from "@/core/api-client";

export const getCurrentUser = async () => {
    const res = await ApiClient.get("/user/show-profile");
    return res?.data;
};
