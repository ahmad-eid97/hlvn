"use client"

import React from "react";
import Avatar from "../avatar";
import { MenuDotsIcon } from "@/core/icons";
import Link from "next/link";

type UserDetailsProps = {
    image?: string;
    name: string;
    email: string;
};

function UserDetails({ image = "/images/avatar-placeholder.svg", name, email }: UserDetailsProps) {
    return (
        <Link href="/profile/settings"
            role="button"
            className="h-[62px] min-w-[62px] rounded-full p-2 flex flex-row justify-end items-center bg-background hover:bg-lynch-100">
            <Avatar src={image} size={46} />
            <div className="flex flex-row items-center gap-4 overflow-hidden transition-all w-[0px] mx-0 lg:w-full lg:mx-2">
                <div>
                    <p className="text-base text-text-primary">{name}</p>
                    <p className="text-sm text-text-tertiary">{email}</p>
                </div>
                <MenuDotsIcon className="fill-orient-800" />
            </div>
        </Link>
    );
}

export default UserDetails;
