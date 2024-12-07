import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { AddIcon, TrashIcon } from "@icons";
import { Alternative } from "@features/cost-calculator/domain/models/cost-calculation-result";
import { FormInstance } from "antd";

type CostFormGroupProps = {
    form: FormInstance;
    initialResult?: Alternative[];
    isList?: boolean;
    isEdit?: boolean;
    name: any[];
    indexCount?: any;
    renderItems?: ({ index, baseName }: { index: number; baseName: any[] }) => React.ReactNode;
};

function CostFormGroup(props: CostFormGroupProps) {
    const [groupCount, setGroupCount] = useState(props.indexCount || 1);
    const showDelete = groupCount > 1;

    useEffect(() => {
        if (!props.isList || !props.initialResult?.length) {
            setGroupCount(props.indexCount || 1);
            return;
        }
        const list = props.initialResult[props.name[1]][props.name[2]];
        // setGroupCount(list.length > 0 ? list.length : 1);
        setGroupCount(props.indexCount || 1);
    }, [props.initialResult, props.initialResult?.length, props.isList, props.name, props.indexCount]);

    const onAddGroup = () => setGroupCount((prev) => prev + 1);

    const onRemoveGroup = (index: number) => {
        if (groupCount === 1) return;
        if (index < groupCount - 1) {
            for (let i = groupCount - 2; i >= index; i--) {
                const from = [...props.name, i + 1];
                const to = [...props.name, i];
                const values =
                    props.form.getFieldsValue(from)?.alternatives?.[props.name[1]]?.[props.name[2]]?.[i + 1] ?? [];
                console.log({
                    i,
                    from,
                    to,
                    values,
                });
                props.form.setFieldValue(to, values);
                props.form.setFieldValue(from, {});
            }
        } else {
            const from = [...props.name, index];
            props.form.setFieldValue(from, {});
        }

        setGroupCount((prev) => prev - 1);
    };

    return (
        <div
            className={classNames(
                "bg-[#FCFCFC] border-border-primary border-[1px] rounded-lg p-3",
                "flex flex-col gap-6"
            )}>
            {Array.from({ length: groupCount }).map((_, index) => (
                <div key={index}>
                    <div className="bg-border-tertiary border-[#F0F0F0] border-[1px] border-b-0 rounded-t-md pt-4 px-2 [&>div]:-mb-[21px]">
                        {props.renderItems?.({
                            index,
                            baseName: [...props.name, index],
                        })}
                    </div>
                    <div
                        className={classNames(
                            "bg-border-tertiary border-[#F0F0F0] border-[1px] border-t-0 rounded-b-md pb-4 transition-all",
                            {
                                "[h-36px] pt-4": showDelete,
                                "h-[14px]": !showDelete,
                            }
                        )}>
                        <div
                            className={classNames("group h-5 flex items-center gap-1 px-2 transition-all", {
                                "opacity-100": showDelete,
                                "opacity-0 pointer-events-none": !showDelete,
                            })}
                            role="button"
                            onClick={() => onRemoveGroup(index)}>
                            <p className="text-orient-700 group-hover:text-orient-600 group-active:text-orient-900 text-sm font-medium underline underline-offset-3">
                                Remove
                            </p>
                            <TrashIcon className="stroke-orient-700 group-hover:stroke-orient-600 group-active:stroke-orient-900" />
                        </div>
                    </div>
                </div>
            ))}
            {props.isList && (
                <div className="group flex items-center gap-2.5" role="button" onClick={onAddGroup}>
                    <AddIcon className="stroke-orient-700 group-hover:stroke-orient-600 group-active:stroke-orient-900" />
                    <p className="text-orient-700 group-hover:text-orient-600 group-active:text-orient-900 text-sm font-medium underline underline-offset-4">
                        Add
                    </p>
                </div>
            )}
        </div>
    );
}

export default CostFormGroup;
