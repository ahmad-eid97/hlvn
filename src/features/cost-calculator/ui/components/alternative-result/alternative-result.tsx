import React from "react";
import { Form } from "@components/form";
import AlternativeResultItem from "../alternative-result-item";
import AlternativeResultGroup from "../alternative-result-group";

export type AlternativeResultItemValue = {
    className?: string;
    label: string;
    value: number | AlternativeResultItemValue[];
};

type AlternativeResultProps = {
    name: string;
    items: AlternativeResultItemValue[];
};

function AlternativeResult({ name, items }: AlternativeResultProps) {
    return (
        <div className="p-4 bg-[#FCFCFC] border-[1px] border-border-tertiary rounded-lg">
            <p className="h-10 max-w-[350px] w-[90%] mx-auto bg-lynch-500 text-white text-xl font-semibold flex items-center justify-center rounded-xl">
                {name}
            </p>
            <Form className="mt-8 p-2 bg-surface border-[1px] border-border-primary rounded-lg flex flex-col gap-10">
                {items.map((item, i) =>
                    typeof item.value === "number" ? (
                        <AlternativeResultItem key={i} {...item} value={item.value} />
                    ) : (
                        <AlternativeResultGroup key={i} {...item} value={item.value as AlternativeResultItemValue[]} />
                    )
                )}
            </Form>
        </div>
    );
}

export default AlternativeResult;
