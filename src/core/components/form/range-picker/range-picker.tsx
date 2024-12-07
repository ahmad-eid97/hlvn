import React from "react";
import { DatePicker as AntDatePicker, TimeRangePickerProps as AntDatePickerProps } from "antd";
import ComponentThemeProvider from "../../component-theme-provider";
import FormItemWrapper from "@/core/components/form/form-item-wrapper";
import { FormItemWrapperProps } from "@/core/components/form/form-item-wrapper/form-item-wrapper";
import classNames from "classnames";
import {CalendarIcon} from "@icons";

type InputProps = AntDatePickerProps & FormItemWrapperProps;

function RangePicker(props: InputProps) {
    return (
        <ComponentThemeProvider>
            <FormItemWrapper {...props}>
                <AntDatePicker.RangePicker
                    {...props}
                    className={classNames("!min-h-[38px]", props.className)}
                    required={false}
                    suffixIcon={props.suffixIcon ?? <CalendarIcon className="stroke-orient-800" />}
                />
            </FormItemWrapper>
        </ComponentThemeProvider>
    );
}

export default RangePicker;
