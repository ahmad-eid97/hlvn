"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import CostCalculationRepository from "../../data/repositories/cost-calculation-repository";
import { CostCalculatorPage } from "@features/cost-calculator";
import { useParams } from "next/navigation";
import LoadingContainer from "@components/loading-container";

function NewCostCalculatorPage() {
    const { id } = useParams();

    const historyQuery = useQuery({
        queryKey: ["history", id],
        queryFn: () => CostCalculationRepository.getHistory(Number(id)),
    });

    return (
        <LoadingContainer loading={historyQuery.isLoading}>
            {historyQuery.isLoading ? null : <CostCalculatorPage isEdit={true} initialResult={historyQuery.data?.result} initialData={historyQuery?.data} />}
        </LoadingContainer>
    );
}

export default NewCostCalculatorPage;
