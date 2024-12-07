"use client";

import React, { useMemo } from "react";
import { Form as AntForm, FormItemProps } from "antd";
import { Values } from "@rc-component/async-validator";

export type FormItemWrapperProps = Omit<FormItemProps<Values>, "name"> & {
    name?: any;
};

type Rules = FormItemProps<Values>["rules"];

function FormItemWrapper(props: FormItemWrapperProps) {
    const rules = useMemo((): Rules | undefined => {
        if (!props.rules && !props.required) return undefined;

        return [
            props.required
                ? {
                      required: true,
                      message: `please enter ${props.label?.toString().toLowerCase()}`,
                  }
                : {
                      required: false,
                  },
            ...(props.rules ?? []),
        ];
    }, [props.rules, props.required, props.label]);

    return (
        <AntForm.Item
            {...props}
            rules={rules}
            className="[&_.ant-form-item-label]:!pb-1.5 [&_.ant-form-item-label]:!font-medium [&_label]:!line-clamp-1"
        />
    );
}

export default FormItemWrapper;
