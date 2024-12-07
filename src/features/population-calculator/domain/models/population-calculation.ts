import PopulationGroup from "./PopulationGroup";

type PopulationCalculation =  {
    id:number
    organization_name: string;
    total_population: number;
    group_label: string;
    subgroup_label: string;
    groups: PopulationGroup[]
};

export default PopulationCalculation;
