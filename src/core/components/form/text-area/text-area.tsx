import React from "react";
import FormItemWrapper from "../form-item-wrapper";
import { Input as AntInput } from "antd";
import ComponentThemeProvider from "@components/component-theme-provider";
import { FormItemWrapperProps } from "@components/form/form-item-wrapper/form-item-wrapper";
import { TextAreaProps as AntTextAreaProps } from "antd/es/input";

type TextAreaProps = Omit<AntTextAreaProps, "name"> & FormItemWrapperProps;

function TextArea(props: TextAreaProps) {
    return (
        <ComponentThemeProvider>
            <FormItemWrapper {...props}>
                <AntInput.TextArea {...props} required={false} />
            </FormItemWrapper>
        </ComponentThemeProvider>
    );
}

export default TextArea;
