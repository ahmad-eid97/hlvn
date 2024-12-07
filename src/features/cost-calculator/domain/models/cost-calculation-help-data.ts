type CostCalculationHelpData = {
    population_calculator: Array<{
        id: number;
        name: string;
        num_patient: number;
        type: string;
    }>;
    quantity_calculator: Array<{
      calculator_name: string;
      id: number;
        results: {
            drug_name: string;
            cycle_length: string;
            id: number;
            num_of_doses_per_pack: number;
            num_of_doses_required_regimen: number;
            protocol_check: string;
            quantity_calculator_id: number;
            required_packs_per_regimen_or_year_per_patient: number;
            required_units_per_regimen_or_year_per_patient_title: string;
            required_units_per_regimen_or_year_per_patient_value: number;
        };
    }>;
};

export default CostCalculationHelpData;
