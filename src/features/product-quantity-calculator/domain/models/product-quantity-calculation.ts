type ProductQuantityCalculation = {
    drag_name: string;
    units_per_pack: number;
    units_per_pack_type: string;
    unit_concentration: number;
    unit_concentration_type: string;
    unit_solvent_size: number;
    is_pack_can_divided: number;
    how_do_you_calculate_dose: string;
    dose: number;
    dose_unit: string;
    average_weight: number;
    average_body_surface: number;
    every: number;
    administration_frequency: string;
    for: number;
    for_type: string;
    administration_duration: string;
    id: number;
};

export default ProductQuantityCalculation;
