import React from "react";
import { colors } from "@core/theme";
import { Button, ButtonProps, ConfigProvider, ThemeConfig } from "antd";
import classNames from "classnames";

function LandingButton(props: ButtonProps) {
    const color = "#090955";
    const theme: ThemeConfig = {
        token: {
            colorPrimary: color,
            colorInfo: color,
            fontSize: 16,
            fontFamily: "var(--inter)",
            borderRadius: 8,
            colorTextBase: colors.text.primary,
            colorTextLabel: colors.text.secondary,
            colorTextPlaceholder: colors.text.placeholder,
            colorBorder: colors.border.primary,
        },
        components: {
            Button: {
                controlHeight: 65,
                controlHeightSM: 48,
                controlHeightLG: 67,
                borderRadius: 7,
                borderRadiusSM: 4,
                borderRadiusLG: 8,
                fontWeight: 600,
                primaryShadow: "0",
                defaultShadow: "",
                paddingInline: "34px",
                paddingInlineSM: "25px",
                paddingInlineLG: "42px",
                fontSizeSM: 16,
                fontSizeLG: 24,
                defaultBorderColor: color,
                defaultColor: color,
            },
        },
    };
    return (
        <ConfigProvider theme={theme}>
            <Button
                {...props}
                className={classNames(
                    {
                        "!text-lg md:!text-xl lg:!text-2xl":
                            props.size === "large" && !props.className?.includes("text-"),
                        "!h-[50px] md:!h-[55px] lg:!h-[65px] !px-[24px] md:!px-[36px] lg:!px-[42px]": props.size === "large",
                    },
                    props.className
                )}
            />
        </ConfigProvider>
    );
}

export default LandingButton;
