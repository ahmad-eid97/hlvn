"use client";

import React from "react";
import Link from "next/link";
import { InputWithOptions } from "@components/form";
import { InputWithOptionsProps } from "@components/form/input-with-options/input-with-options";
import { InfoIcon } from "@icons";
import Tooltip from "@components/tooltip";
import InputWithOptions2 from "@/core/components/form/input-with-options2";

type CostInputWithOptionsProps = InputWithOptionsProps & {
    link: {
        label: string;
        href: string;
    };
    infoMessage?: string;
    isTwo?: boolean;
    pricePer?: string;
};

function CostInputWithOptions(props: CostInputWithOptionsProps) {
    return props.isTwo ? (
        <InputWithOptions2
            pricePer={props.pricePer === "units" ? "units" : "packs"}
            name={props.name}
            label={
                <span className="relative">
                    {props.label}
                    <span className="absolute -end-6 top-[0.5px]">
                        <Tooltip title={props.infoMessage} placement="topLeft">
                            <InfoIcon />
                        </Tooltip>
                    </span>
                </span>
            }
            type={props.type}
            rules={[
                {
                    validator: async (_, value) => {
                        const parsed = JSON.parse(value || "{}");
                        if (!parsed.number_of_packs_units) {
                            return Promise.reject(new Error("Please provide a valid number of packs/units."));
                        }
                        return Promise.resolve();
                    },
                },
            ]}
            min={1}
            options={props.options}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Link
                        href={props.link.href}
                        className="mx-[1px] mt-3 h-[38px] px-3 flex items-center font-semibold hover:bg-[#1f1f1f0a] rounded-md">
                        {props.link.label}
                    </Link>
                </>
            )}
        />
    ) : (
        <InputWithOptions
            name={props.name}
            label={
                <span className="relative">
                    {props.label}
                    <span className="absolute -end-6 top-[0.5px]">
                        <Tooltip title={props.infoMessage} placement="topLeft">
                            <InfoIcon />
                        </Tooltip>
                    </span>
                </span>
            }
            type={props.type}
            rules={
                props.required
                    ? [
                          {
                              required: true,
                              message: `Please enter ${props.label}`,
                          },
                      ]
                    : undefined
            }
            min={1}
            options={props.options}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Link
                        href={props.link.href}
                        className="mx-[1px] mt-3 h-[38px] px-3 flex items-center font-semibold hover:bg-[#1f1f1f0a] rounded-md">
                        {props.link.label}
                    </Link>
                </>
            )}
        />
    );
}

export default CostInputWithOptions;
