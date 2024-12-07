"use client";

import React, { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import CalculationPageContainer from "@components/calculation-page-container2";
import { CombineFormItems, FormHooks, Input, Select, Switch } from "@components/form";
import ProductQuantityCalculationRepository from "../../data/repositories/product-quantity-calculation-repository";
import ProductQuantityCalculation from "../../domain/models/product-quantity-calculation";

type ProductQuantityCalculatorPageProps = {
    initialValues?: ProductQuantityCalculation;
    initialResult?: any[];
    isEdit?: boolean;
};

function ProductQuantityCalculatorPage({ initialValues, initialResult, isEdit }: ProductQuantityCalculatorPageProps) {
    const [form] = FormHooks.useForm();
    const initialResultRef = useRef<any[]>();

    const calculateMutation = useMutation({
        mutationFn: (data: ProductQuantityCalculation) => ProductQuantityCalculationRepository.calculate(data),
    });

    const saveMutation = useMutation({
        mutationFn: (data: ProductQuantityCalculation) => ProductQuantityCalculationRepository.save(data),
    });
    const editMutation = useMutation({
        mutationFn: (data: ProductQuantityCalculation) => ProductQuantityCalculationRepository.edit(data),
    });

    useEffect(() => {
        form.setFieldsValue({
            unit_concentration_type: "mg per ml",
            how_do_you_calculate_dose: "fixed dose",
            dose_unit: "mg",
            administration_frequency: "day/s",
            for_type: "num_of_cycles",
            administration_duration: "day/s",
        });
    }, [form]);

    useEffect(() => {
        if (!initialValues) return;

        form.setFieldsValue(initialValues);
    }, [form, initialValues]);

    useEffect(() => {
        if (!initialResult) return;

        initialResultRef.current = initialResult;
    }, [initialResult]);

    const onClear = () => {
        calculateMutation.reset();
        initialResultRef.current = undefined;
    };

    const onFinish = (values: ProductQuantityCalculation) => {
        onClear();
        calculateMutation.mutate(values);
    };

    const onSave = async (values: ProductQuantityCalculation) => {
        onClear();
        saveMutation.mutate(values);
    };
    const onEdit = async (values: ProductQuantityCalculation) => {
        editMutation.mutate(values);
    };

    const unitsPerPackType = FormHooks.useWatch("units_per_pack_type", form);
    const howDoseCalculated = FormHooks.useWatch("how_do_you_calculate_dose", form);
    const ForType = FormHooks.useWatch("for_type", form);

    const isUnitSolventSizeDisabled =
        !unitsPerPackType || unitsPerPackType === "tablets" || unitsPerPackType === "capsules";
    const isSinglePerPack = unitsPerPackType === "solution" || unitsPerPackType === "bottles";
    const isAverageWeightDisabled = howDoseCalculated !== "dose per weight";
    const isAverageBodySurfaceDisabled = howDoseCalculated !== "dose per surface area";
    const isAdministrationDurationDisabled = ForType !== "num_of_cycles";
    const isTypeLife = ForType === "life";

    return (
        <CalculationPageContainer
            form={form}
            onCalculate={onFinish}
            onSave={onSave}
            onEdit={onEdit}
            isEdit={isEdit}
            title="Products Quantity Calculator Result"
            result={calculateMutation.data?.result ?? initialResultRef.current}
            loading={calculateMutation.isPending || saveMutation.isPending}>
            <section>
                <div className="form-container-2">
                {isEdit && <Input label="id" name="id" hidden id="idInput" defaultValue={initialValues?.id}/>}
                    <Input label="Calculation Name" name="calculator_name" required placeholder="Calculation Name" />
                </div>
            </section>
            <section>
                <h1>Pack Content</h1>
                <div className="form-container-3">
                    <Input label="Drug Trade Name" name="drag_name" required />
                    <CombineFormItems label="Units per Pack">
                        <Input
                            label="Units per Pack"
                            name="units_per_pack"
                            type="number"
                            required
                            min={1}
                            disabled={isSinglePerPack}
                        />
                        <Select
                            label="Type"
                            name="units_per_pack_type"
                            required
                            placeholder="Packaging"
                            options={[
                                {
                                    value: "vials",
                                    label: "Vials",
                                },
                                {
                                    value: "ampoules",
                                    label: "Ampoules",
                                },
                                {
                                    value: "bottles",
                                    label: "Bottle",
                                },
                                {
                                    value: "solution",
                                    label: "Solution",
                                },
                                {
                                    value: "tablets",
                                    label: "Tablets",
                                },
                                {
                                    value: "capsules",
                                    label: "Capsules",
                                },
                            ]}
                            onSelect={(v) => {
                                if (v === "solution" || v === "bottles") {
                                    form.setFieldValue("units_per_pack", 1);
                                }
                            }}
                        />
                    </CombineFormItems>
                    <CombineFormItems label="Unit Concentration/Strength">
                        <Input
                            label="Unit Concentration/Strength"
                            name="unit_concentration"
                            type="number"
                            step="any"
                            required
                            min={1}
                        />
                        <Select
                            label="Type"
                            name="unit_concentration_type"
                            placeholder="Enter Unit"
                            onChange={(v) => {
                                form.setFieldValue("dose_unit", v.split(" ")[0] ?? "mg");
                            }}
                            options={[
                                {
                                    value: "mg",
                                    label: "mg",
                                },
                                {
                                    value: "mg per ml",
                                    label: "mg per ml",
                                },
                                {
                                    value: "mg per tablets/capsules",
                                    label: "mg per tablets/capsules",
                                },
                                {
                                    value: "mcg",
                                    label: "mcg",
                                },
                                {
                                    value: "ml",
                                    label: "ml",
                                },
                                {
                                    value: "mcg per ml",
                                    label: "mcg per ml",
                                },
                                {
                                    value: "IU",
                                    label: "iu",
                                },
                            ]}
                        />
                    </CombineFormItems>
                </div>
                <div className="form-container-2">
                    <Input
                        label="Unit/Solvent Size (ml)"
                        name="unit_solvent_size"
                        type="number"
                        min={1}
                        required={!isUnitSolventSizeDisabled}
                        disabled={isUnitSolventSizeDisabled}
                    />
                    <Switch
                        label="Pack can be divided in dispensing/administration?"
                        name="is_pack_can_divided"
                        labelPosition="inline"
                    />
                </div>
            </section>
            <section>
                <h1>Protocol Inputs</h1>
                <div className="form-container-2">
                    <Select
                        label="How do you calculate dose?"
                        name="how_do_you_calculate_dose"
                        placeholder="Dose per weight"
                        options={[
                            {
                                value: "fixed dose",
                                label: "Fixed dose",
                            },
                            {
                                label: "Dose per weight",
                                value: "dose per weight",
                            },
                            {
                                label: "Dose per surface area",
                                value: "dose per surface area",
                            },
                        ]}
                    />
                    <CombineFormItems label="Dose">
                        <Input label="Dose" name="dose" step="any" required type="number" />
                        <Select
                            label="Unit"
                            placeholder="mg"
                            name="dose_unit"
                            options={[
                                {
                                    value: "mg",
                                    label: "mg",
                                },
                                {
                                    value: "ml",
                                    label: "ml",
                                },
                                {
                                    value: "mcg",
                                    label: "mcg",
                                },
                                {
                                    value: "iu",
                                    label: "iu",
                                },
                            ]}
                        />
                    </CombineFormItems>
                    <Input
                        label="Average weight per patient"
                        name="average_weight"
                        type="number"
                        disabled={isAverageWeightDisabled}
                        required={!isAverageWeightDisabled}
                        min={1}
                    />
                    <Input
                        label="Average body surface area per patient"
                        name="average_body_surface"
                        type="number"
                        disabled={isAverageBodySurfaceDisabled}
                        required={!isAverageBodySurfaceDisabled}
                        min={1}
                    />
                </div>
                <div className="form-container-3">
                    <Input label="Every" name="every" type="number" step="any" min={1} required />
                    <Select
                        label="Administration Frequency in"
                        name="administration_frequency"
                        options={[
                            {
                                value: "hour/s",
                                label: "Hour/s",
                            },
                            {
                                value: "day/s",
                                label: "Day/s",
                            },
                            {
                                value: "week/s",
                                label: "Week/s",
                            },
                            {
                                value: "month/s",
                                label: "Month/s",
                            },
                        ]}
                    />
                    <CombineFormItems label="For">
                        <Input label="For" name="for" type="number" required min={1} disabled={isTypeLife} />
                        <Select
                            label="Type"
                            name="for_type"
                            options={[
                                {
                                    value: "num_of_cycles",
                                    label: "Number of cycles",
                                },
                                {
                                    value: "life",
                                    label: "Life",
                                },
                            ]}
                            onSelect={(v) => {
                                if (v === "life") form.setFieldValue("for", 1);
                            }}
                        />
                    </CombineFormItems>
                </div>
                <div className="form-container-2">
                    <Select
                        label="Administration duration / Cycle duration"
                        name="administration_duration"
                        disabled={isAdministrationDurationDisabled}
                        required={!isAdministrationDurationDisabled}
                        options={[
                            {
                                value: "hour/s",
                                label: "Hour/s",
                            },
                            {
                                value: "day/s",
                                label: "Day/s",
                            },
                            {
                                value: "week/s",
                                label: "Week/s",
                            },
                            {
                                value: "month/s",
                                label: "Month/s",
                            },
                        ]}
                    />
                </div>
            </section>
        </CalculationPageContainer>
    );
}

export default ProductQuantityCalculatorPage;
