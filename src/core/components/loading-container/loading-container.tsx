import React from "react";
import { Spin } from "antd";
import ComponentThemeProvider from "@components/component-theme-provider";

type LoadingContainerProps = {
    loading: boolean;
    children: React.ReactNode;
};

function LoadingContainer({ loading, children }: LoadingContainerProps) {
    return (
        <div className="relative">
            {children}
            {loading && (
                <div className="fixed inset-0 w-full h-full z-10 flex items-center justify-center bg-[#9992]">
                    <ComponentThemeProvider>
                        <Spin size="large" />
                    </ComponentThemeProvider>
                </div>
            )}
        </div>
    );
}

export default LoadingContainer;
