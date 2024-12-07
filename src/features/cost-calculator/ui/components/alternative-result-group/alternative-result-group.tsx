import React from "react";
import { AlternativeResultItemValue } from "../alternative-result/alternative-result";
import AlternativeResultItem from "../alternative-result-item";
import classNames from "classnames";

type AlternativeResultGroupProps = {
    className?: string;
    label: string;
    value: AlternativeResultItemValue[];
};

function AlternativeResultGroup(props: AlternativeResultGroupProps) {
    return (
        <div className={classNames("bg-border-tertiary border-[1px] border-[#F0F0F0] p-2 rounded-lg", props.className)}>
            <p className="text-text-primary text-lg font-semibold mb-3.5">{props.label}</p>
            <div className="flex flex-col gap-3.5">
                {props.value.map((item, index) =>
                    typeof item.value === "number" ? (
                        <AlternativeResultItem key={index} {...item} value={item.value} />
                    ) : (
                        <AlternativeResultGroup key={index} {...item} value={item.value}
                        className="bg-white border-border-primary"
                        />
                    )
                )}
            </div>
        </div>
    );
}

export default AlternativeResultGroup;
