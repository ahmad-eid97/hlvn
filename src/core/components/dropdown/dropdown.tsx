import React from "react";
import ComponentThemeProvider from "@components/component-theme-provider";
import { Dropdown as AntDropDown, DropdownProps as AntDropdownProps } from "antd";

type DropdownProps = AntDropdownProps;

function Dropdown(props: DropdownProps) {
    return (
        <ComponentThemeProvider>
            <AntDropDown {...props} />
        </ComponentThemeProvider>
    );
}

export default Dropdown;
