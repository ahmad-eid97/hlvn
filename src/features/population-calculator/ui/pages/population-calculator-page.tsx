"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, FormHooks, Input } from "@components/form";
import CalculationPageContainer from "@components/calculation-page-container";
import PopulationCalculationRepository from "../../data/repositories/population-calculation-repository";
import PopulationCalculation from "../../domain/models/population-calculation";
import PatientGroup from "../components/patient-group";
import PopulationResult from "../components/population-result";

type PopulationCalculatorPageProps = {
    initialValues?: PopulationCalculation;
    initialResult?: any[];
    isEdit?: boolean;
};

function PopulationCalculatorPage({ isEdit, initialValues, initialResult }: PopulationCalculatorPageProps) {
    const [groupCount, setGroupCount] = useState(1);
    const [form] = FormHooks.useForm();
    const initialResultRef = useRef<any[]>();

    const calculateMutation = useMutation({
        mutationFn: (data: PopulationCalculation) => PopulationCalculationRepository.calculate(data),
    });

    const saveMutation = useMutation({
        mutationFn: (data: PopulationCalculation) => PopulationCalculationRepository.save(data),
    });

    useEffect(() => {
        if (!initialValues) return;

        setGroupCount(initialValues.groups?.length ?? 1);

        setTimeout(() => {
            form.setFieldsValue(initialValues);
        });
    }, [form, initialValues]);

    useEffect(() => {
        if (!initialResult) return;

        initialResultRef.current = initialResult;
    }, [initialResult]);

    const onClear = () => {
        calculateMutation.reset();
        initialResultRef.current = undefined;
    };

    const onFinish = (values: PopulationCalculation) => {
        onClear();
        calculateMutation.mutate(values);
    };

    const onSave = async (values: PopulationCalculation) => {
        onClear();
        saveMutation.mutate(values);
    };

    return (
        <CalculationPageContainer
            form={form}
            onCalculate={onFinish}
            onSave={onSave}
            isEdit={isEdit ? isEdit : false}
            title="Population Calculation Result"
            result={initialValues?.groups}
            renderResult={({ results }) => <PopulationResult value={results} />}
            loading={calculateMutation.isPending || saveMutation.isPending}>
              <section>
                <div className="form-container-2">
                {isEdit && <Input label="id" name="id" hidden id="idInput" defaultValue={initialValues?.id}/>}
                    <Input label="Calculation Name" name="calculator_name" required placeholder="Calculation Name" />
                </div>
            </section>
            <section>
                <h1>Population Calculator</h1>
                <div className="card-group-sm pt-4 px-4 mb-8">
                    <div className="-mb-2 form-container-2">
                        <Input name="organization_name" label="Organization Name" required />
                        <Input
                            name="total_population"
                            label="Total number population/patients before Classification"
                            type="number"
                            min={1}
                            required
                        />
                        <Input name="group_label" label="Groups classified based on" required />
                        <Input name="subgroup_label" label="Sub-groups classified based on" />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {Array.from({ length: groupCount }).map((_, index) => (
                        <PatientGroup
                            key={index}
                            index={index}
                            isEdit={isEdit}
                            initialSubGroupIdsLength={initialValues?.groups?.[index]?.subgroups?.length}
                        />
                    ))}
                </div>
                {!isEdit && (
                    <div className="py-4">
                        <Button onClick={() => setGroupCount((prev) => prev + 1)}>Add another group</Button>
                    </div>
                )}
            </section>
        </CalculationPageContainer>
    );
}

export default PopulationCalculatorPage;
