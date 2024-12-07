import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import DataWrapper from "@core/data-wrapper";
import RootStyleRegistry from "@components/root-style-registry";
import '../scss/style.css'
const inter = Inter({
    subsets: ["latin"],
    variable: "--inter",
});

export const metadata: Metadata = {
    title: "HLVN",
    description: "HLVN",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <RootStyleRegistry>
                <DataWrapper>
                    <body className={inter.variable} cz-shortcut-listen="false">{children}</body>
                </DataWrapper>
            </RootStyleRegistry>
        </html>
    );
}
