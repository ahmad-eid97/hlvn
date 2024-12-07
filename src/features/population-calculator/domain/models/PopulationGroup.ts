type PopulationSubGroup = {
    id?: number;
    subgroup_name: string;
    num_patient?: number;
    percentage: number;
};

type PopulationGroup = {
    id?: number;
    group_name: string;
    num_patient?: number;
    percentage: number;
    subgroups: PopulationSubGroup[];
};

export default PopulationGroup;
