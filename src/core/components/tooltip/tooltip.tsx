import React from "react";
import ComponentThemeProvider from "@components/component-theme-provider";
import { Tooltip as AntTooltip, TooltipProps as AntTooltipProps } from "antd";

type TooltipProps = AntTooltipProps;

function Tooltip(props: TooltipProps) {
    return (
        <ComponentThemeProvider>
            <AntTooltip {...props} arrow={props.arrow ?? false} />
        </ComponentThemeProvider>
    );
}

export default Tooltip;
