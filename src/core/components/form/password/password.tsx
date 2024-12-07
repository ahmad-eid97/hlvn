import React from "react";
import { Input as AntInput, InputProps as AntInputProps } from "antd";
import ComponentThemeProvider from "../../component-theme-provider";
import FormItemWrapper from "@/core/components/form/form-item-wrapper";
import { FormItemWrapperProps } from "@/core/components/form/form-item-wrapper/form-item-wrapper";

type InputProps = Omit<AntInputProps, "name"> & FormItemWrapperProps;

function Password(props: InputProps) {
    return (
        <ComponentThemeProvider>
            <FormItemWrapper {...props}>
                <AntInput.Password {...props} required={false} />
            </FormItemWrapper>
        </ComponentThemeProvider>
    );
}

export default Password;
