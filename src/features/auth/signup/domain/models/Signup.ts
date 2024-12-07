export type UserResponse = {
    code: number;
    status: number;
    errors: null | string;
    message: string;
    data: {
        token: string;
        user: {
            name: string;
            phone: string;
            country_id: string;
            state_id: string;
            city_id: string;
            organization_name: string;
            job_function: string;
            job_role: string;
            email: string;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
};

export type User = {
    name: string;
    phone: string;
    country_id: string;
    state_id: string;
    city_id: string;
    organization_name: string;
    job_function: string;
    job_role: string;
    email: string;
    password: string;
};
