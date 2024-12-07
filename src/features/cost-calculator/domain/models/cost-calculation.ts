type DrugDirect = {
    drug_administration_regimen: string;
    drug_trade_name: string;
    number_of_packs_units: number;
    packs_units_dose: number;
    price_type: string;
    price: number;
};

type Lab = {
    lab: string;
    frequency_per_year: number;
    cost_per_item: number;
    occurance: number;
};

type Radiology = {
    radiology: string;
    frequency_per_year: number;
    cost_per_item: number;
    occurance: number;
};

type OtherInvestigation = {
    other_investigation: string;
    frequency_per_year: number;
    cost_per_item: number;
    occurance: number;
};

type HospitalService = {
    item_name: string;
    frequency_per_year: number;
    cost_per_item: number;
    occurance: number;
};

type MedicalSupply = {
    name_of_medical_supply: string;
    quantity_needed: number;
    unit_price: number;
};

type OtherMedicalStaff = {
    item_name: string;
    level: string;
    number_of_item_needed: number;
    fees_per_one_item: number;
};

type OtherBulk = {
    item_name: string;
    description: string;
    cost_per_item: number;
};

type Alternative = {
    number_patients: number;
    drug_directs: DrugDirect[];
    labs: Lab[];
    radiologies: Radiology[];
    other_investigations: OtherInvestigation[];
    hospital_services: HospitalService[];
    medical_supplies: MedicalSupply[];
    other_medical_staffs: OtherMedicalStaff[];
    other_bulk: OtherBulk;
    patients:string;
};

type CostCalculation = {
    number_alternatives: number;
    alternatives: Alternative[];
};

export default CostCalculation;
