"use client";

import React, { useEffect, useState } from "react";
import { FormItemWrapper } from "@components/form";
import { Input, Select, InputProps as AntInputProps, SelectProps } from "antd";
import ComponentThemeProvider from "@components/component-theme-provider";
import classNames from "classnames";
import { FormItemWrapperProps } from "@components/form/form-item-wrapper/form-item-wrapper";
import { ArrowDownIcon } from "@icons";

export type InputWithOptionsProps = Omit<AntInputProps, "name"> &
    FormItemWrapperProps & {
        options: SelectProps["options"];
        dropdownRender?: SelectProps["dropdownRender"];
        pricePer: "units" | "packs";
    };

function InputWithOptions2(props: InputWithOptionsProps) {
    return (
        <ComponentThemeProvider>
            <FormItemWrapper {...props}>
                {/* @ts-ignore */}
                <InputWithOptionsInner2 {...props} />
            </FormItemWrapper>
        </ComponentThemeProvider>
    );
}

function InputWithOptionsInner2({
    value: outerValue,
    onChange,
    options,
    dropdownRender,
    pricePer,
    ...props
}) {
    const [value, setValue] = useState("");
    const [parsedData, setParsedData] = useState<{
        id: string | null;
        number_of_packs_units: number | null;
    }>({
        id: null,
        number_of_packs_units: null,
    });
    const [inputFocused, setInputFocused] = useState(false);
    const isError = props["aria-invalid"];

    useEffect(() => {
        try {
            const parsed = JSON.parse(outerValue || "{}");
            setValue(outerValue || "");
            setParsedData({
                id: parsed.id || null,
                number_of_packs_units: parsed.number_of_packs_units || null,
            });
        } catch {
            setValue("");
            setParsedData({ id: null, number_of_packs_units: null });
        }
    }, [outerValue, pricePer]); // Ensure pricePer triggers re-render when it changes.

    const handleSelectChange = (selectedValue: string) => {
        setValue(selectedValue);
        onChange?.(selectedValue);

        try {
            const parsed = JSON.parse(selectedValue);
            const calculatedValue =
                pricePer === "units"
                    ? parsed.results.required_units_per_regimen_or_year_per_patient_value
                    : parsed.results.required_packs_per_regimen_or_year_per_patient;

            setParsedData({
                id: parsed.id || null,
                number_of_packs_units: calculatedValue || null,
            });

            onChange?.(
                JSON.stringify({
                    id: parsed.id || null,
                    number_of_packs_units: calculatedValue ,
                })
            );
        } catch {
            setParsedData({ id: null, number_of_packs_units: null });
        }
    };

    return (
        <div
            className={classNames(
                "relative isolate w-full transition-all bg-white rounded-lg",
                "border-[1px] border-border-primary hover:border-orient-800",
                {
                    "border-orient-800 shadow-[0_0_0_2px_rgba(3,55,61,0.33)]": inputFocused,
                    "border-[#ff4d4f] hover:border-[#ffa39e]": isError,
                }
            )}
        >
            <div className="!absolute top-0 bottom-0 start-[1px] end-10 z-[2] flex flex-row items-center">
                <Input
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    className="!bg-white"
                    variant="borderless"
                    required
                    type="number"
                    min={1}
                    id="numInput"
                    value={parsedData.number_of_packs_units || ""}
                    onChange={(e) => {
                        const updatedValue = parseFloat(e.target.value) || null;
                        setParsedData((prev) => ({
                            ...prev,
                            number_of_packs_units: updatedValue,
                        }));
                        onChange?.(
                            JSON.stringify({
                                ...parsedData,
                                number_of_packs_units: updatedValue,
                            })
                        );
                    }}
                    disabled={parsedData.id !== null}
                    {...props}
                />
                <div className="h-full w-[1px] bg-border-primary" />
            </div>
            <Select
                variant="borderless"
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="Select an option"
                options={options}
                onSelect={handleSelectChange}
                dropdownRender={dropdownRender}
                suffixIcon={<ArrowDownIcon className="stroke-orient-800" />}
            />
        </div>
    );
}

export default InputWithOptions2;
