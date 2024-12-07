import React from "react";
import { Radio as AntRadio, RadioProps as AntRadioProps } from "antd";
import ComponentThemeProvider from "@components/component-theme-provider";
import classNames from "classnames";
import FormItemWrapper from "../form-item-wrapper";
import { FormItemWrapperProps } from "../form-item-wrapper/form-item-wrapper";

type RadioProps = Omit<AntRadioProps, "name"> & FormItemWrapperProps;

function Radio(props: RadioProps) {
    return (
        <ComponentThemeProvider>
            <FormItemWrapper {...props} >
                <AntRadio.Group >
                    <AntRadio
                        {...props}
                        className={classNames(
                            "h-full",
                            "[&_.ant-radio-inner]:!border-[1px] [&_.ant-radio-inner]:!border-orient-700 [&_.ant-radio-inner]:!border-opacity-40",
                            "[&_.ant-radio-checked_.ant-radio-inner]:!border-opacity-100 [&_.ant-radio-checked_.ant-radio-inner]:after:!bg-orient-700",
                            props.className
                        )}
                    />
                </AntRadio.Group>
            </FormItemWrapper>
        </ComponentThemeProvider>
    );
}

export default Radio;
