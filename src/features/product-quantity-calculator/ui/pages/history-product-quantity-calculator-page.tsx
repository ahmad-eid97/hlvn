"use client";

import React, { useEffect } from "react";
import ProductQuantityCalculatorPage from "./product-quantity-calculator-page";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductQuantityCalculationRepository from "@features/product-quantity-calculator/data/repositories/product-quantity-calculation-repository";
import LoadingContainer from "@components/loading-container";
import { message } from "antd";

function HistoryProductQuantityCalculatorPage() {
    const { id } = useParams();

    const historyQuery = useQuery({
        queryKey: ["history", id],
        queryFn: () => ProductQuantityCalculationRepository.getHistory(Number(id)),
    });

    useEffect(() => {
        if (historyQuery.isError || (historyQuery.data?.initialValues && !historyQuery.data?.initialValues.drag_name))
            message.error("Calculation not found!");
    }, [historyQuery.data?.initialValues, historyQuery.isError]);

    return (
        <LoadingContainer loading={historyQuery.isLoading}>
            <ProductQuantityCalculatorPage
                initialValues={historyQuery.data?.initialValues}
                initialResult={historyQuery.data?.result}
                isEdit={true}
            />
        </LoadingContainer>
    );
}

export default HistoryProductQuantityCalculatorPage;
