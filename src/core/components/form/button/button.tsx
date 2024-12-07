import React from "react";
import ComponentThemeProvider from "@/core/components/component-theme-provider";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import classNames from "classnames";
import { colors } from "@/core/theme";

type ButtonProps = AntButtonProps & {
    success?: boolean;
};

function Button(props: ButtonProps) {
    return (
        <ComponentThemeProvider color={props.success ? colors.emerald[800] : undefined}>
            <AntButton
                {...props}
                className={classNames(
                    {
                        "min-w-[81px]": props.size === "small",
                        "min-w-[133px]": props.size !== "small",
                        "border-[2px]": props.type === "default",
                    },
                    props.className
                )}
                type={props.type ?? "primary"}
            />
        </ComponentThemeProvider>
    );
}

export default Button;
