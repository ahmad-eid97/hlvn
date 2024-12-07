import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            boxShadow: {
                surface: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
            },
            height: {
                nav: "94px",
                "footer-actions": "72px",
                "screen-with-nav": "calc(100vh - 142px)",
                "screen-with-nav-footer-actions": "calc(100vh - 142px - 60px)",
            },
            padding: {
                nav: `142px`,
                "footer-actions": "60px",
            },
            inset: {
                nav: "142px",
            },
            colors: {
                orient: {
                    50: "#f0faff",
                    100: "#e1f4fd",
                    200: "#bce9fb",
                    300: "#80d9f9",
                    400: "#3dc6f3",
                    500: "#14afe3",
                    600: "#078dc2",
                    700: "#07719d",
                    800: "#0a5d7f",
                    900: "#0f4e6b",
                    950: "#0a3347",
                },
                lynch: {
                    50: "#f6f7f9",
                    100: "#eceef2",
                    150: "#dcdee0",
                    200: "#d5d9e2",
                    300: "#b1bbc8",
                    400: "#8695aa",
                    500: "#64748b",
                    600: "#526077",
                    700: "#434e61",
                    800: "#3a4252",
                    900: "#343a46",
                    950: "#23272e",
                },
                emerald: {
                    800: "#014e53",
                    900: "#013d41",
                },
                text: {
                    primary: "#1F1F1F",
                    secondary: "#454545",
                    tertiary: "#9AA0A6",
                    placeholder: "#8C8C8C",
                },
                border: {
                    primary: "#D9D9D9",
                    secondary: "#dcdee0",
                    tertiary: "#F5F5F5",
                },
                success: "#62df8c",
                warning: "#ead774",
                danger: "#ff4d4f",
                background: "#f5f6f7",
                surface: "#fff",
                "landing-primary": "#090955",
                "landing-gray": "#5B6971",
            },
        },
    },
    plugins: [
        // @ts-ignore
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".card": {
                    backgroundColor: "white",
                    borderRadius: "12px",
                },
                ".card-group": {
                    backgroundColor: "#FCFCFC",
                    borderRadius: "8px",
                    border: "1px solid #F5F5F5",
                    padding: "16px",
                },
                ".card-group-sm": {
                    backgroundColor: "#FCFCFC",
                    borderRadius: "8px",
                    border: "1px solid #F5F5F5",
                },
                ".form-container-2": {
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "0 16px",
                    "@media (min-width: 640px)": {
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: "0 36px",
                    },
                    "@media (min-width: 900px)": {
                        gap: "0 54px",
                    },
                },
                ".form-container-3": {
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "0 16px",
                    "@media (min-width: 640px)": {
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: "0 24px",
                    },
                    "@media (min-width: 900px)": {
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: "0 36px",
                    },
                },
                ".form-container-4": {
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "0 10px",
                    padding:"10px 10px 0 10px",
                    "@media (min-width: 640px)": {
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: "0 10px",
                    },
                    "@media (min-width: 900px)": {
                        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                        gap: "0 10px",
                    },
                },
            });
        }),
    ],
};
export default config;
