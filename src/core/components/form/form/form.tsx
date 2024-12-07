import React from "react";
import { Form as AntForm, FormProps as AntFormProps } from "antd";

type FormProps<T> = AntFormProps<T>;

function Form<T = Record<string, any>>(props: FormProps<T>) {
    // @ts-ignore
    return <AntForm {...props} layout={props.layout ?? "vertical"} />;
}

export const FormHooks = AntForm;

export default Form;
