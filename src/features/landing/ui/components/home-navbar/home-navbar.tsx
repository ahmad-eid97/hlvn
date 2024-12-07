"use client";

import React, { useEffect, useState } from "react";
import styles from "./home-navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import HamburgerButton from "../hamburger-button";
import Cookies from "js-cookie";
import { message } from "antd";
import { useRouter } from "next/navigation";

type HomeNavbarProps = {
    routes: Array<{
        name: string;
        href: string;
    }>;
};

function HomeNavbar({ routes }: HomeNavbarProps) {
    const [hash, setHash] = useState("");
    const [isStuck, setStuck] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (Cookies.get("token")) {
            setIsAuth(true);
        }
    }, []);

    useEffect(() => {
        setHash(window.location.hash);

        const handleScroll = () => {
            setStuck(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const router = useRouter();
    const handleLogOut = () => {
        Cookies.remove("token");
        message.success("Logout Successfully");
        setTimeout(() => {
            router.replace("/login");
        }, 2000);
    };
    return (
        <>
            <header
                className={classNames(styles.homeNavbar, {
                    [styles.stuck]: isStuck,
                })}
                aria-expanded={isOpen}>
                <div className={styles.content}>
                    <Image src="/images/home-nav-logo.svg" alt="HLVN Logo" width={92} height={53} />
                    <div onClick={() => setOpen((prev) => !prev)} className={styles.hamburger}>
                        <HamburgerButton open={isOpen} />
                    </div>
                    <nav className={styles.nav}>
                        <ul className={styles.navList} aria-expanded={isOpen}>
                            {routes?.map((route, index) => (
                                <li key={index}>
                                    <Link
                                        className={styles.navItem}
                                        aria-selected={hash === route.href}
                                        href={route.href}
                                        onClick={() => {
                                            setHash(route.href);
                                            setOpen(false);
                                        }}>
                                        {route.name}
                                    </Link>
                                </li>
                            ))}
                            {isAuth ? (
                                <li>
                                    <button onClick={handleLogOut} className={classNames(styles.navItem, styles.final)}>
                                        Logout
                                    </button>
                                </li>
                            ) : (
                                <li>
                                    <Link className={classNames(styles.navItem, styles.final)} href="/login">
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
            <div className={styles.navSpacer} />
        </>
    );
}

export default HomeNavbar;
