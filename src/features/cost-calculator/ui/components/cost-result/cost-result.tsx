import React, { useState } from "react";
import AlternativeResult from "../alternative-result";
import Button from "../../../../../core/components/form/button";
import FooterActions from "@components/footer-actions";
import CostCalculationResult, { CostDetail, CostItem } from "../../../domain/models/cost-calculation-result";
import { message } from "antd";

type CostResultProps = {
    onReset?: () => void;
    result: CostCalculationResult["result"];
};

function CostResult({ onReset, result }: CostResultProps) {
    const [isSaved, setIsSaved] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.map((alt, index) => (
                <AlternativeResult
                    key={index}
                    name={`Alternative ${index + 1}`}
                    items={Object.entries(alt).map(([key, item]) => {
                        if (typeof item.value === "object") {
                            const castedItem = item as CostDetail;

                            return {
                                className: key === "total_cost" ? "bg-orient-50" : undefined,
                                label: castedItem.label,
                                value: [
                                    {
                                        label: castedItem.value.cost_per_patient.label,
                                        value: castedItem.value.cost_per_patient.value,
                                    },
                                    {
                                        label: castedItem.value.cost_per_group.label,
                                        value: castedItem.value.cost_per_group.value,
                                    },
                                ],
                            };
                        } else {
                            const castedItem = item as CostItem<number>;

                            if (key === "other_bulk_cost")
                                return {
                                    className: "bg-orient-50",
                                    label: castedItem.label,
                                    value: [
                                        {
                                            label: "",
                                            value: castedItem.value,
                                        },
                                    ],
                                };

                            return {
                                label: castedItem.label,
                                value: castedItem.value,
                            };
                        }
                    })}
                />
            ))}
            <FooterActions
                secondaryActions={
                    <Button onClick={onReset} htmlType="reset" type="default" size="small">
                        Reset
                    </Button>
                }
                primaryActions={
                    <Button
                        disabled={isSaved}
                        onClick={() => {
                            message.success("Cost calculation is saved successfully");
                            setIsSaved(true);
                        }}>
                        {isSaved ? "Done" : "Save"}
                    </Button>
                }
            />
        </div>
    );
}

export default CostResult;
