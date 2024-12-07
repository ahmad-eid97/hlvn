export type CostItem<T> = {
    label: string;
    value: T;
};
export type CostDetail = {
    label: string;
    value: {
        cost_per_patient: CostItem<number>;
        cost_per_group: CostItem<number>;
    };
};

export type Alternative = {
    number_patients: CostItem<number>;
    drug_direct: CostDetail;
    labs_cost: CostDetail;
    radiology_cost: CostDetail;
    other_investigation_cost: CostDetail;
    hospital_service_cost: CostDetail;
    medical_supplies_cost: CostDetail;
    other_medical_staff_cost: CostDetail;
    total_cost: CostDetail;
    other_bulk_cost: CostItem<number>;
};

type CostCalculationResult = {
    message: string;
    result: Alternative[];
};

export default CostCalculationResult;
