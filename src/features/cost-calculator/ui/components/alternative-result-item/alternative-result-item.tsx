import React from "react";
import { Input } from "@components/form";

type AlternativeResultItemProps = {
    label: string;
    value: number;
};

function AlternativeResultItem(props: AlternativeResultItemProps) {
    return (
        <div className="-mb-6 [&_label]:!font-normal">
            <Input
                label={props.label}
                value={String(props.value)}
                disabled
                className="!bg-white !text-text-primary !cursor-default"
            />
        </div>
    );
}

export default AlternativeResultItem;
