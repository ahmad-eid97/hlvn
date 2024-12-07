"use client";

import React from "react";
import Image from "next/image";
import classNames from "classnames";
import { NavRoute } from "./types";
import NavItem from "./nav-item";
import { usePathname } from "next/navigation";
import UserDetails from "../user-details";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/user-api";
import Link from "next/link";

type NavbarProps = {
    routes: NavRoute[];
};

function Navbar({ routes }: NavbarProps) {
    const {
        data: currentUserInfo,
    } = useQuery({
        queryKey: ["currentUser"],
        queryFn: () => {
            return getCurrentUser();
        },
        staleTime: 5 * 1000,
        
    }) ;

    

    const pathname = usePathname();
    if (pathname === "/") return null;
    return (
        <header
            className={classNames(
                "h-nav bg-surface fixed top-6 rounded-full ps-4 pe-4 inset-x-4 md:ps-5 md:pe-[18px] md:inset-x-6 overflow-hidden",
                "z-50 shadow-sm flex flex-row items-center gap-2 md:gap-4 lg:gap-6 xl:gap-8 transition-all"
            )}>
            <Link href={'/'}><Image
                className="hidden md:inline-block"
                src="/images/nav-logo.svg"
                alt="HLVN Logo"
                width={92}
                height={53}
            /></Link>
            <nav className="h-[62px] bg-background rounded-full p-2">
                <ul className="h-full relative flex flex-row gap-0 md:gap-2 lg:gap-4 xl:gap-6 transition-all">
                    {routes.map((route) => (
                        <NavItem key={route.href} active={pathname.includes(route.href)} {...route} />
                    ))}
                </ul>
            </nav>
            <div className="ms-auto">
                <UserDetails name={currentUserInfo?.data?.name} email={currentUserInfo?.data?.email} />
            </div>
        </header>
    );
}

export default Navbar;
