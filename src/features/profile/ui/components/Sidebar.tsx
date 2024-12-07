"use client";
import ComponentThemeProvider from "@/core/components/component-theme-provider";
import { Tabs } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
const Sidebar = () => {
  const routes = [
    {
      icon: "/icons/profile/account.svg",
      label: "Account Settings",
      link: "/profile/settings",
      key: "settings"
    },
    {
      icon: "/icons/profile/subs.svg",
      label: "Subscription",
      link: "/profile/subscription",
      key: "subscription"
    },
    {
      icon: "/icons/profile/contact.svg",
      label: "Contact Us",
      link: "/profile/contact",
      key: "contact"
    },
    {
      icon: "/icons/profile/FAQ.svg",
      label: "FAQ",
      link: "/profile/faq",
      key: "faq"
    },
    {
      icon: "/icons/profile/logout.svg",
      label: "Logout",
      key: "5"
    }
  ];

  const router = useRouter();
  const pathname = usePathname();
 
  const [activeKey, setActiveKey] = useState("/profile/settings");
  useEffect(() => {
    const currentRoute = routes.find(route => route.link === pathname);
    if (currentRoute) {
      setActiveKey(currentRoute.key);
    }
  }, [pathname]);

  const handleTabClick = (key) => {
    if (key === "5") {
      Cookies.remove("token");
      router.push("/");
      return;
    }
    const route = routes.find(route => route.key === key);
    if (route && route.link) {
      router.push(route.link);
    }
  };

  return (
    <ComponentThemeProvider>
      <Tabs
      tabBarGutter={2}
        tabPosition="right"
        className="[&_.ant-tabs-nav-list]:bg-white [&_.ant-tabs-nav-list]:border [&_.ant-tabs-nav-list]:border-[#DCDEE0] [&_.ant-tabs-nav-list]:rounded-[8px] [&_.ant-tabs-nav-list]:w-[337px] [&_.ant-tabs-nav-list]:pb-[15px] h-fit [&_.ant-tabs-nav-list]:py-[15px] [&_.ant-tabs-content-holder]:!flex-[unset] "
        activeKey={activeKey}
        onTabClick={handleTabClick}
      >
        {routes.map((route) => (
          <Tabs.TabPane
            key={route.key}
            tab={
              <div  className="flex flex-row items-center gap-4 w-full">
                <img src={route.icon} alt={route.label} />
                <span className={
                  `${route.label === "Logout" ? "text-red-500" : "text-[#0A5D7F]"}`
                }>{route.label}</span>
              </div>
            }
          >
          </Tabs.TabPane>
        ))}
      </Tabs>
    </ComponentThemeProvider>
  );
};

export default Sidebar;