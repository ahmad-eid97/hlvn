import React, { useState } from "react";
import classNames from "classnames";
import { CheckIcon } from "@icons";
import { Spin } from "antd";
import ComponentThemeProvider from "@components/component-theme-provider";

type StepsProps = {
    value: number;
    onChange?: (value: number) => void;
    steps: string[];
    savedIndexes: Record<number, boolean>;
};

function Steps({ value, onChange, steps, savedIndexes }: StepsProps) {
    const [loadingIndex, setLoadingIndex] = useState<number>();

    return (
        <div className="flex flex-row justify-between">
            {steps.map((step, index) => {
                const isSelected = index === value;
                const isSaved = savedIndexes[index];
                return (
                    <div
                        role="button"
                        className={classNames(
                            "flex flex-row items-center justify-center gap-2.5 px-10",
                            "box-border h-[58px] border-b-[4px] transition-colors",
                            {
                                "text-orient-800 border-orient-800": isSelected,
                                "text-text-secondary border-transparent hover:bg-orient-100": !isSelected,
                            }
                        )}
                        onClick={() => {
                            if (isSelected) return;
                            setLoadingIndex(value);
                            setTimeout(() => {
                                onChange?.(index);
                            });
                            setTimeout(() => {
                                setLoadingIndex(undefined);
                            }, 500);
                        }}
                        key={step}>
                        {loadingIndex === index ? (
                            <div className="w-[21px] h-[21px] rounded-full flex items-center justify-center">
                                <ComponentThemeProvider>
                                    <Spin size="small" />
                                </ComponentThemeProvider>
                            </div>
                        ) : (
                            <div
                                className={classNames(
                                    "w-[21px] h-[21px] border-[1px] rounded-full",
                                    "flex items-center justify-center",
                                    {
                                        "border-orient-800 bg-orient-800": isSaved,
                                        "border-text-secondary bg-transparent": !isSaved,
                                    }
                                )}>
                                {isSaved && <CheckIcon />}
                            </div>
                        )}
                        <p className="text-xl font-semibold">{step}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Steps;
