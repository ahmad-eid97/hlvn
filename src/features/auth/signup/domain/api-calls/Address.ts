import ApiClient from "@/core/api-client";
import { City, Country, State } from "../models/Address";

export const getCountries = async (): Promise<Country[]> => {
    const res = await ApiClient.get("/region/index-countries");
    return res?.data?.data;
};

export const getStates = async (countryId: any): Promise<State[]> => {
    const res = await ApiClient.get(`/region/index-states?country_id=${countryId}`);
    return res?.data?.data;
};

export const getCities = async (stateId: any): Promise<City[]> => {
    const res = await ApiClient.get(`/region/index-cites?state_id=${stateId}`);
    return res?.data?.data;
};
