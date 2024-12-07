"use client";

import NavbarContainer, { NavRoute } from "@components/navbar";
import {usePathname} from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const navRoutes: NavRoute[] = [
        {
            label: "Pharmaceutical Products Quantity Calculator",
            href: "/quantity-calculator",
        },
        {
            label: "Population Calculator",
            href: "/population-calculator",
        },
        {
            label: "Cost Calculator",
            href: "/cost-calculator",
        },
        {
            label: "History",
            href: "/history",
        },
    ];
    const pathname = usePathname();
    if (pathname === "/") return children;

    return <NavbarContainer routes={navRoutes}>{children}</NavbarContainer>;
}
