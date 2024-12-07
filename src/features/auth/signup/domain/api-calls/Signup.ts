import ApiClient from "@/core/api-client"
import { User, UserResponse } from "../models/Signup"

export const signup = async(userData : User) : Promise<UserResponse>=> {
    const res = await ApiClient.post("/auth-user/register-user", userData);
    return res?.data;
}