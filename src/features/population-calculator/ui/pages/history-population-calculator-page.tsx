"use client";

import React, { useEffect } from "react";
import PopulationCalculatorPage from "./population-calculator-page";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingContainer from "@components/loading-container";
import PopulationCalculationRepository from "@features/population-calculator/data/repositories/population-calculation-repository";
import { message } from "antd";

function HistoryPopulationCalculatorPage() {
    const { id } = useParams();

    const historyQuery = useQuery({
        queryKey: ["history", id],
        queryFn: () => PopulationCalculationRepository.getHistory(Number(id)),
    });

    useEffect(() => {
        if (historyQuery.isError || (historyQuery.data?.initialValues && !historyQuery.data?.initialValues.groups))
            message.error("Calculation not found!");
    }, [historyQuery.data?.initialValues, historyQuery.isError]);

    return (
        <LoadingContainer loading={historyQuery.isLoading}>
            <PopulationCalculatorPage
                initialValues={historyQuery.data?.initialValues}
                initialResult={historyQuery.data?.result}
                isEdit={true}
            />
        </LoadingContainer>
    );
}

export default HistoryPopulationCalculatorPage;
