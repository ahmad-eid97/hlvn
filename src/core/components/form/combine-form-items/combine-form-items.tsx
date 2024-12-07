"use client";

import React from "react";
import { Space } from "antd";
import classNames from "classnames";

type CombineFormItemsProps = {
    label?: string;
    required?: boolean;
    children: React.ReactNode;
};

function CombineFormItems({ label, required, children }: CombineFormItemsProps) {
    return (
        <div className="w-full relative">
            <label
                className={classNames(
                    "text-base text-text-primary font-medium line-clamp-1",
                    "absolute start-[12.5px] top-[-1px] bg-white w-full z-[2]"
                )}>
                {label}
            </label>
            <Space.Compact
                className={classNames(
                    "w-full [&>*:first-child]:w-full [&_input]:!border-e-0 [&_input]:!min-h-[38px]",
                    "[&_.ant-form-item-label]:w-[10px]"
                )}>
                {children}
            </Space.Compact>
        </div>
    );
}

export default CombineFormItems;
