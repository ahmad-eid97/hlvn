import React from "react";
import { Input, IconButton } from "@components/form";
import { TrashIcon } from "@icons";

type PatientSubgroupProps = {
    parentIndex: number;
    index: number;
    countIndex: number;
    isEdit?: boolean;
    onDelete?: () => void;
};

function PatientSubgroup({ parentIndex, index, countIndex, onDelete, isEdit }: PatientSubgroupProps) {
    return (
        <div className="bg-lynch-100 border-lynch-200 rounded-lg p-4 mb-2.5 flex flex-row justify-between items-end">
            <div className="form-container-2 -mb-5 [&_label]:!text-sm [&_label]:!font-normal">
                {isEdit && (
                    <Input
                        name={["groups", parentIndex, "subgroups", index, "id"]}
                        label={`Sub-Group id ${index + 1}`}
                        placeholder="id"
                        hidden
                    />
                )}
                <Input
                    name={["groups", parentIndex, "subgroups", index, "subgroup_name"]}
                    label={`Sub-Group ${countIndex + 1}`}
                    placeholder="Subgroup Name"
                />
                <Input
                    name={["groups", parentIndex, "subgroups", index, "percentage"]}
                    label="Percentage"
                    placeholder="0"
                    addonAfter="%"
                    type="number"
                    min={1}
                    max={100}
                />
            </div>
            {!isEdit && (
                <IconButton onClick={onDelete}>
                    <TrashIcon className="stroke-orient-800" />
                </IconButton>
            )}
        </div>
    );
}

export default PatientSubgroup;
