import React from "react";
import { NavRoute } from "./types";
import Link from "next/link";

type NavItemProps = NavRoute & {
    active: boolean;
};

function NavItem({ href, label, active }: NavItemProps) {
    return (
        <li className="h-full rounded-full overflow-hidden min-w-[87px]">
            <Link
                aria-selected={active}
                className="h-full px-4 flex items-center bg-background hover:bg-lynch-100 aria-selected:bg-orient-100 aria-selected:text-orient-800 transition-colors"
                href={href}>
                <p className="line-clamp-2 text-base leading-4 text-center">{label}</p>
            </Link>
        </li>
    );
}

export default NavItem;
