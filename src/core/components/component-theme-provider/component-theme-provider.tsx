"use client";

import React from "react";
import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import { colors } from "@/core/theme";

type ComponentThemeProviderProps = {
    color?: string;
    children: React.ReactNode;
};

function ComponentThemeProvider({ children, color }: ComponentThemeProviderProps) {
    color ??= colors.orient[800];
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
            Select: {
                colorTextPlaceholder: colors.text.placeholder,
                colorTextBase: color,
                colorText: color,
                colorIcon: color,
                controlHeight: 38,
            },
            Input: {
                controlHeight: 38,
            },
            DatePicker: {
                colorTextPlaceholder: colors.text.placeholder,
                colorTextBase: color,
                colorText: color,
                colorIcon: color,
                controlHeight: 38,
            },
            Button: {
                fontSize: 14,
                controlHeight: 40,
                controlHeightSM: 40,
                borderRadius: 8,
                borderRadiusSM: 8,
                fontWeight: 600,
                primaryShadow: "0",
                defaultShadow: "",
                paddingInline: "24px",
                paddingInlineSM: "16px",
                defaultBorderColor: color,
                defaultColor: color,
            },
            Form: {
                labelColor: colors.text.primary,
                verticalLabelMargin: "1px",
            },
            Table: {
                headerBg: colors.lynch[100],
                fontSize: 14,
                controlItemBgActive: colors.orient[50],
                controlItemBgActiveHover: colors.orient[100],
            },
            Pagination: {
                itemSizeSM: 28,
            },
            Radio: {
                colorPrimary: colors.white,
                radioSize: 20,
                dotSize: 10,
            },
            Tooltip: {
                colorBgSpotlight: "#FCFCFC",
                colorTextLightSolid: colors.lynch[700],
                borderRadius: 8,
                boxShadowSecondary: "0px 0px 10px 0px #00000059",
                fontSize: 16,
                paddingXS: 10,
                paddingSM: 10,
            },
        },
    };
    return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}

export default ComponentThemeProvider;
