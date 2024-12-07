"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import CostCalculationRepository from "../../data/repositories/cost-calculation-repository";
import CostForm from "../components/cost-form";
import CostResult from "../components/cost-result";
import CostCalculation from "../../domain/models/cost-calculation";
import { Alternative } from "@features/cost-calculator/domain/models/cost-calculation-result";

type CostCalculatorPageProps = {
    initialResult?: Alternative[];
    initialData?: any;
    isEdit?: boolean;
};

function CostCalculatorPage({ isEdit,initialResult,initialData }: CostCalculatorPageProps) {
    const initialResultRef = useRef<any[]>();
    const helpDataQuery = useQuery({
        queryKey: ["cost-calculation-help"],
        staleTime: 1000 * 60,
        queryFn: () => CostCalculationRepository.getHelpData(),
    });

    const calculateMutation = useMutation({
        mutationFn: (data: CostCalculation) => CostCalculationRepository.calculate(data),
    });
    const saveMutation = useMutation({
        mutationFn: (data: CostCalculation) => CostCalculationRepository.save(data),
    });
    const editMutation = useMutation({
        mutationFn: (data: CostCalculation) => CostCalculationRepository.edit(data),
    });

    const errors = {
        ...(calculateMutation.isError ? calculateMutation.error["response"].data.errors : {}),
        ...(saveMutation.isError ? saveMutation.error["response"].data.errors : {}),
    };

    useEffect(() => {
        if (!initialResult) return;

        initialResultRef.current = initialResult;
    }, [initialResult]);

    const onClear = () => {
        calculateMutation.reset();
        initialResultRef.current = undefined;
    };

    const onFinish = (values: CostCalculation) => {
        onClear();
        calculateMutation.mutate(values);
    };

    const onSave = async (values: CostCalculation) => {
        onClear();
        saveMutation.mutate(values);
    };
    const onEdit = async (values: CostCalculation) => {
        editMutation.mutate(values);
    };

    if (calculateMutation.data)
        return (
            <div className="mb-10">
                <CostResult result={calculateMutation.data.result} onReset={() => onClear()} />
            </div>
        );
    else
        return (
            <div className="mb-10">
                <CostForm
                    initialResult={initialResult}
                    initialData={isEdit ? initialData?.initialValues : null}
                    onCalculate={onFinish}
                    onSave={onSave}
                    errors={errors}
                    loading={calculateMutation.isPending || saveMutation.isPending}
                    helpData={helpDataQuery.data}
                    isEdit={isEdit}
                    onEdit={onEdit}
                />
            </div>
        );
}

export default CostCalculatorPage;
