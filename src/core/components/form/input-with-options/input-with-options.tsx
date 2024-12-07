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
    };

function InputWithOptions(props: InputWithOptionsProps) {
    return (
        <ComponentThemeProvider>
            <FormItemWrapper {...props}>
                {/* @ts-ignore */}
                <InputWithOptionsInner {...props} />
            </FormItemWrapper>
        </ComponentThemeProvider>
    );
}

function InputWithOptionsInner({
  value: outerValue,
  onChange,
  options,
  dropdownRender,
  ...props
}) {
  const [value, setValue] = useState("");
  const [parsedData, setParsedData] = useState<{ id: string | null; type: string | null; num_patient: string }>({
      id: null,
      type: null,
      num_patient: "",
  }); // Make `type` nullable
  const [inputFocused, setInputFocused] = useState(false);
  const isError = props["aria-invalid"];

  useEffect(() => {
      try {
          const parsed = JSON.parse(outerValue || "{}");
          setValue(outerValue || "");
          setParsedData({
              id: parsed.id || null,
              type: parsed.type || null,
              num_patient: parsed.num_patient || "",
          });
      } catch {
          setValue("");
          setParsedData({ id: null, type: null, num_patient: "" });
      }
  }, [outerValue]);

  const handleSelectChange = (selectedValue) => {
      setValue(selectedValue);
      onChange?.(selectedValue);

      try {
          const parsed = JSON.parse(selectedValue);
          setParsedData({
              id: parsed.id || null,
              type: parsed.type || null,
              num_patient: parsed.num_patient || "",
          });
      } catch {
          setParsedData({ id: null, type: null, num_patient: "" });
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
                  value={parsedData.num_patient}
                  onChange={(e) => {
                      const updatedNumPatient = e.target.value;
                      setParsedData((prev) => ({
                          ...prev,
                          num_patient: updatedNumPatient,
                      }));
                      onChange?.(
                          JSON.stringify({
                              ...parsedData,
                              num_patient: updatedNumPatient,
                          })
                      );
                  }}
                  disabled={parsedData.id !== null} // Disable input if `id` is `null`
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


export default InputWithOptions;
