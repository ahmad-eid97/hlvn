import React from "react";

type CalculationItemProps = {
    index: number;
    label: string;
    value: string;
};

function CalculationItem({ index, label, value }: CalculationItemProps) {
    return (
        <li className="bg-surface border-[1px] border-border-tertiary px-3 py-4 rounded-md">
            <p className="text-base font-medium text-text-secondary mb-1.5">
                {index + 1}. {label}:
            </p>
            <p className="text-base font-semibold text-orient-700">{value}</p>
        </li>
    );
}

export default CalculationItem;
