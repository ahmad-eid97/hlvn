import React from "react";
import PopulationGroup from "../../../domain/models/PopulationGroup";

type PopulationItemProps = {
    value: PopulationGroup;
};

function PopulationItem({ value }: PopulationItemProps) {
    return (
        <div className="bg-border-tertiary border-border-primary border-[1px] rounded-lg flex flex-col px-1.5 pt-3 pb-0">
            <p className="text-base text-text-secondary font-medium mb-1 px-2">{value.group_name}</p>
            <p className="text-base text-orient-800 font-semibold mb-3 px-2">{value.num_patient}</p>
            {value.subgroups?.map((subgroup) => (
                <div key={subgroup.id} className="p-2 rounded-md bg-lynch-200 mb-2">
                    <p className="text-sm text-text-secondary font-medium mb-1">{subgroup.subgroup_name}</p>
                    <p className="text-base text-orient-800 font-semibold">{subgroup.num_patient}</p>
                </div>
            ))}
        </div>
    );
}

export default PopulationItem;
