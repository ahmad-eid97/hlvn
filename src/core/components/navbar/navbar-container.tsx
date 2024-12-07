import React from "react";
import Navbar from "./navbar";
import { NavRoute } from "./types";

type NavbarContainerProps = {
    routes: NavRoute[];
    children: React.ReactNode;
};

function NavbarContainer({ routes, children }: NavbarContainerProps) {
    return (
        <div className="min-h-[99vh]">
            <Navbar routes={routes} />
            <div className="!pt-nav px-4 md:px-6 py-6">{children}</div>
        </div>
    );
}

export default NavbarContainer;
