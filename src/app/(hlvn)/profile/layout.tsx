"use client";
import Sidebar from "@/features/profile/ui/components/Sidebar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const Layout = ({
    children
}: Readonly<{
    children: React.ReactNode;

}>) => {
    const pathname = usePathname();
    const currentRoute = pathname.split("/")[2];
    
    return (
        <div className={`${currentRoute === "subscription" ? "flex-col" : "flex"} gap-[16px] mx-[164px] relative`}>
            <Sidebar />
            {children}
        </div>
    );
};

export default Layout;
