"use client";

import React from "react";
import { Select as AntSelect, SelectProps as AntSelectProps } from "antd";
import FormItemWrapper, { FormItemWrapperProps } from "@/core/components/form/form-item-wrapper/form-item-wrapper";
import ComponentThemeProvider from "@/core/components/component-theme-provider";
import classNames from "classnames";
import { ArrowDownIcon } from "@/core/icons";

type SelectProps = Omit<AntSelectProps, "name"> &
    FormItemWrapperProps & {
        combined?: boolean;
    };

function Select(props: SelectProps) {
    return (
        <ComponentThemeProvider>
            <FormItemWrapper {...props}>
                <AntSelect
                    {...props}
                    className={classNames(
                        {
                            "[&_.ant-select-selection-item]:!font-medium !font-medium": !props.combined,
                            "[&_.ant-select-selection-item]:!font-semibold !font-semibold": props.combined,
                        },
                        props.className
                    )}
                    popupMatchSelectWidth={props.popupMatchSelectWidth ?? false}
                    suffixIcon={props.suffixIcon ?? <ArrowDownIcon className="stroke-orient-800" />}
                />
            </FormItemWrapper>
        </ComponentThemeProvider>
    );
}

export default Select;
