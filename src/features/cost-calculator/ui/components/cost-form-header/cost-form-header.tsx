import React from "react";
import { Input, Select } from "@components/form";
import { ArrowDownIcon } from "@icons";
import Steps from "@components/steps";

type CostFormHeaderProps = {
    currentAlternativeIndex: number;
    numberOfAlternatives: number;
    alternativeMaxLength?: number;
    savedIndexes: Record<number, boolean>;
    onChange?: (value: number) => void;
    isEdit: boolean;
    helpData: any;
};

function CostFormHeader({
    currentAlternativeIndex,
    numberOfAlternatives,
    alternativeMaxLength = 3,
    savedIndexes = {},
    helpData,
    isEdit,
    onChange,
}: CostFormHeaderProps) {
    return (
        <div className="bg-orient-50 rounded-t-lg border-[1px] border-b-0 border-border-tertiary">
            <div className="form-container-4">
                {isEdit && <Input label="id" hidden id="idInput" defaultValue={helpData?.id} />}
                <Input
                    label="Calculation Name"
                    name="calculator_name"
                    required
                    placeholder="name here"
                    initialValue={isEdit ? helpData?.calculator_name : null}
                />
                <Select
                    label="Currency"
                    name="currency"
                    initialValue={isEdit ? helpData?.currency : null}
                    required
                    placeholder="Currency"
                    options={[
                        {
                            value: "EGP",
                            label: "EGP",
                        },
                        {
                            value: "USD",
                            label: "USD",
                        },
                        {
                            value: "EURO",
                            label: "EURO",
                        },
                        {
                            value: "GBP",
                            label: "GBP",
                        },
                        {
                            value: "SAR",
                            label: "SAR",
                        },
                        {
                            value: "AED",
                            label: "AED",
                        },
                    ]}
                />
                <Select
                    label="Type"
                    name="type_calculator"
                    required
                    placeholder="Type"
                    initialValue={isEdit ? helpData?.type_calculator : null}
                    options={[
                        {
                            value: "default",
                            label: "Calculator",
                        },
                        {
                            value: "project",
                            label: "Project",
                        },
                    ]}
                />
                <Select
                    label="Treatment plan alternatives"
                    name="number_alternatives"
                    initialValue={isEdit ? helpData?.number_alternatives : null}
                    required
                    placeholder=""
                    options={Array.from({ length: alternativeMaxLength }, (_, i) => ({
                        value: i + 1,
                        label: i + 1,
                    }))}
                />
            </div>

            <Steps
                value={currentAlternativeIndex}
                steps={Array.from({ length: Math.max(numberOfAlternatives, 1) }).map(
                    (_, index) => `Alternative ${index + 1}`
                )}
                savedIndexes={savedIndexes}
                onChange={onChange}
            />
        </div>
    );
}

export default CostFormHeader;
