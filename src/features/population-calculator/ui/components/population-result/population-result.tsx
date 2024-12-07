import React from "react";
import PopulationItem from "../population-item";
import PopulationGroup from "../../../domain/models/PopulationGroup";

type PopulationResultProps = {
    value: PopulationGroup[];
};

function PopulationResult({ value }: PopulationResultProps) {
    return (
        <div className="grid grid-cols-3 md:grid-cols-2 xl:justify-between gap-4 lg:gap-5">
            {value?.map((group: any) => <PopulationItem key={group.id} value={group} />)}
        </div>
    );
}

export default PopulationResult;
