import PopulationGroup from "./PopulationGroup";

type PopulationCalculationResult = {
    message: string;
    data: {
        id: number;
        organization_name: string;
        total_population: number;
        group_label: string;
        subgroup_label: string;
        groups: PopulationGroup[];
    };
    result:any
};

export default PopulationCalculationResult;
