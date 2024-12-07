import React, { useEffect, useState } from "react";
import { Input, TextArea } from "@components/form";
import { ArrowDownIcon, PlusIcon } from "@icons";
import PatientSubgroup from "./patient-subgroup";
import classNames from "classnames";

type PatientGroupProps = {
    index: number;
    initialSubGroupIdsLength?: number;
    isEdit?: boolean;
};

function getId(arr: Array<number | null>) {
    return arr.length;
}

function PatientGroup({ index, initialSubGroupIdsLength, isEdit }: PatientGroupProps) {
    const [isDescriptionOpen, setDescriptionOpen] = useState(false);
    const [subGroupIds, setSubGroupIds] = useState<Array<number | null>>([]);
    const filteredSubGroupIds = subGroupIds.filter((id) => id !== null);

    useEffect(() => {
        if (initialSubGroupIdsLength) {
            setSubGroupIds(Array.from({ length: initialSubGroupIdsLength }).map((_, i) => i));
        }
    }, [initialSubGroupIdsLength]);

    const onAddSubGroup = () => {
        setSubGroupIds((prev) => [...prev, getId(prev)]);
    };

    const onDeleteSubGroup = (subIndex: number) => {
        setSubGroupIds((prev) => {
            const copy = [...prev];
            copy[subIndex] = null;
            return copy;
        });
    };

    return (
        <div className="card-group">
            <div className="form-container-2 -mb-3">
                {isEdit && (
                    <Input
                        name={["groups", index, "id"]}
                        label={`Patient Group id ${index + 1}`}
                        placeholder="id"
                        hidden
                    />
                )}
                <Input
                    name={["groups", index, "group_name"]}
                    label={`Patient Group ${index + 1}`}
                    placeholder="Group Name"
                    required
                />
                <Input
                    name={["groups", index, "percentage"]}
                    label="Percentage"
                    placeholder="0"
                    addonAfter="%"
                    required
                    type="number"
                    min={0}
                    max={100}
                />
            </div>
            <div
                role="button"
                className="group flex flex-row items-center gap-2 mb-2 select-none"
                onClick={() => setDescriptionOpen((prev) => !prev)}>
                <p className="text-sm font-medium underline underline-offset-[3px] text-orient-700 group-hover:text-orient-600">
                    Write group description
                </p>
                <ArrowDownIcon
                    className={classNames(
                        "w-[18px] h-[18px] stroke-orient-700 group-hover:stroke-orient-600 transition-transform",
                        {
                            "-scale-100": isDescriptionOpen,
                        }
                    )}
                />
            </div>
            <div
                className={classNames("transition-all overflow-hidden", {
                    "h-0": !isDescriptionOpen,
                    "h-[100px]": isDescriptionOpen,
                })}>
                <TextArea
                    className="!min-h-[100px]"
                    placeholder="Write description..."
                    name={["groups", index, "description"]}
                />
            </div>
            <div className="p-4 mt-3 border-[1px] border-lynch-100 bg-lynch-50 rounded-md group">
                {filteredSubGroupIds.length > 0 ? (
                    <p className="text-sm font-semibold pb-2 mb-3 border-lynch-100 border-b-[1px]">Sub-Groups</p>
                ) : null}
                {filteredSubGroupIds.map((subIndex, countIndex) => (
                    <PatientSubgroup
                        key={subIndex}
                        parentIndex={index}
                        index={subIndex}
                        isEdit={isEdit}
                        countIndex={countIndex}
                        onDelete={() => onDeleteSubGroup(subIndex)}
                    />
                ))}
                {!isEdit && (
                    <div
                        onClick={onAddSubGroup}
                        role="button"
                        className={classNames("flex flex-row items-center", {
                            "-m-4 p-4 group-hover:bg-orient-50": filteredSubGroupIds.length === 0,
                        })}>
                        <PlusIcon className="stroke-orient-700 group-hover:stroke-orient-600" />
                        <p className="text-sm underline underline-offset-[3px] text-orient-700 group-hover:text-orient-600">
                            Add sub-group
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PatientGroup;
