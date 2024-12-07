"use client";

import React from "react";
import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from "antd";
import FormItemWrapper, { FormItemWrapperProps } from "@/core/components/form/form-item-wrapper/form-item-wrapper";
import ComponentThemeProvider from "@/core/components/component-theme-provider";

type SwitchProps = FormItemWrapperProps &
    AntSwitchProps & {
        labelPosition?: "top" | "inline";
    };

function Switch(props: SwitchProps) {
    return (
        <ComponentThemeProvider>
            <FormItemWrapper {...props} label={props.labelPosition === "inline" ? " " : props.label}>
                <InnerSwitch {...props} />
            </FormItemWrapper>
        </ComponentThemeProvider>
    );
}

function InnerSwitch(props: SwitchProps) {
    return (
        <div className="flex items-center gap-2 w-full ">
            <AntSwitch {...props} />
            {props.labelPosition === "inline" && (
                <p className="text-sm font-medium text-text-primary w-full block line-clamp-2">{props.label}</p>
            )}
        </div>
    );
}

export default Switch;
