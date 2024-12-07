export type Country = {
    id: number;
    name: string;
};

export type State = {
    id: number;
    name: string;
    country_id: number;
}
export type City = {
    id: number;
    name: string;
    state_id: number;
}
export type CountryResponse = {
    code: number;
    status: number;
    errors: any; // Can be null or a specific error type if available
    message: string;
    data: Country[];
};


export type StateResponse = {
    code: number;
    status: number;
    errors: any; // Can be null or a specific error type if available
    message: string;
    data: State[];
};

export type CityResponse = {
    code: number;
    status: number;
    errors: any; // Can be null or a specific error type if available
    message: string;
    data: City[];
};

