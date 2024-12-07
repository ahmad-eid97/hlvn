"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { message } from "antd";

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            onSuccess: (data) => {
                const dataObject = data ? (data as Record<string, any>) : {};
                if ("message" in dataObject) {
                    message.success(dataObject.message);
                }
            },
            onError: (error) => {
                message.error(
                    "response" in error && error.response
                        ? error.response["data"]["message"]
                        : "Something went wrong, please try again!"
                );
            },
        },
    },
});

export default function DataWrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
