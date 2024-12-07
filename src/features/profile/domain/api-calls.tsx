import ApiClient from "@/core/api-client";

export const updateProfile = async (data: any) => {
    const res = await ApiClient.post("/user/update-profile-request", data);
    return res?.data;
}

export const contactUs = async (data: any) => {
    const res = await ApiClient.post("/contact-us/send-request", data);
    return res?.data;
}