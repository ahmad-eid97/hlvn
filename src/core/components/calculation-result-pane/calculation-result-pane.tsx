import React from "react";
import classNames from "classnames";
import EmptyPane from "@/core/components/calculation-result-pane/empty-pane";
import { CalculatorIcon } from "@/core/icons";
import CalculationItem from "@/core/components/calculation-result-pane/calculation-item";

type CalculationResultPaneProps = {
    className?: string;
    title?: string;
    results?: any[];
    renderResult?: ({ results }: { results: any[] }) => React.ReactNode;
};

function CalculationResultPane({ className, title, results, renderResult }: CalculationResultPaneProps) {
    return (
        <div
            className={classNames(
                "sticky top-nav h-screen-with-nav-footer-actions md:max-w-[512px] flex flex-col",
                className
            )}>
            <div className="flex flex-row gap-1.5">
                <CalculatorIcon className="stroke-orient-800 relative top-0.5 min-w-[24px]" />
                <h1 className="text-lg font-semibold text-orient-800">{title}</h1>
            </div>
            {!results || results?.length === 0 ? (
                <EmptyPane />
            ) : (
                <div className="h-full flex flex-col overflow-hidden">
                    <div className="mt-6 mb-4 card-group-sm px-4 py-2">
                        <p className="text-sm font-semibold">Result</p>
                    </div>
                    <ol className="bg-orient-50 rounded-t-lg px-3 py-4 h-full overflow-auto flex flex-col gap-2.5">
                        {renderResult
                            ? renderResult({ results })
                            : results?.map((result, index) => (
                                  <CalculationItem
                                      index={index}
                                      key={result.label}
                                      label={result.label}
                                      value={result.value}
                                  />
                              ))}
                    </ol>
                </div>
            )}
        </div>
    );
}

export default CalculationResultPane;
