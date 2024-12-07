import React from "react";
import { Tabs as AntTabs, TabsProps as AntTabsProps } from "antd";
import classNames from "classnames";
import ComponentThemeProvider from "@components/component-theme-provider";

type TabsProps = AntTabsProps;

function Tabs(props: TabsProps) {
    const isWithoutChildren = !props.items?.[0]?.children;
    return (
        <ComponentThemeProvider>
            <AntTabs
                {...props}
                className={classNames(
                    "",
                    {
                        "[&_.ant-tabs-nav]:!mb-0": isWithoutChildren,
                    },
                    props.className
                )}
            />
        </ComponentThemeProvider>
    );
}

export default Tabs;
