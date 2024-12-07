import React from "react";

type CostTitleGroupProps = {
    title: string;
    children: React.ReactNode;
};

function CostTitleGroup({ title, children }: CostTitleGroupProps) {
    return (
        <div className="card border-[1px] border-border-tertiary p-4 pt-7 flex flex-col gap-4">
            <p className="text-lg font-semibold px-[19px]">{title}</p>
            {children}
        </div>
    );
}

export default CostTitleGroup;
