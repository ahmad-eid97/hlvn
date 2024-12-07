import ApiClient from "@api-client";
import CostCalculation from "../../domain/models/cost-calculation";
import CostCalculationResult, { Alternative } from "../../domain/models/cost-calculation-result";
import CostCalculationHelpData from "../../domain/models/cost-calculation-help-data";
import HistoryResult from "@core/domain/types/history-result";

class CostCalculationRepository {
    static productQuantityResultLabels = {
        number_patients: "Number of patients",
        drug_direct: "Drug direct cost",
        labs_cost: "Labs cost",
        radiology_cost: "Radiology cost",
        other_investigation_cost: "Other investigation cost",
        hospital_service_cost: "Hospital service cost",
        medical_supplies_cost: "Medical supplies cost",
        other_medical_staff_cost: "Other medical staff cost",
        total_cost: "Total cost",
        other_bulk_cost: "Other bulk cost",
        cost_per_patient: "Cost per patient",
        cost_per_group: "Cost per patient group",
    };

    static async formatResult(
        result: Array<Record<string, number | object>>
    ): Promise<CostCalculationResult["result"]> {
        return new Promise((resolve) => {
            const res = result.map((alternative) =>
                Object.entries(alternative).reduce(
                    (acc, [key, val]) => {
                        if (typeof val === "object") {
                            acc[key] = {
                                label: this.productQuantityResultLabels[key],
                                value: {
                                    cost_per_patient: {
                                        label: this.productQuantityResultLabels.cost_per_patient,
                                        value: val["cost_per_patient"],
                                    },
                                    cost_per_group: {
                                        label: this.productQuantityResultLabels.cost_per_group,
                                        value: val["cost_per_group"],
                                    },
                                },
                            };
                        } else {
                            acc[key] = {
                                label: this.productQuantityResultLabels[key],
                                value: val,
                            };
                        }
                        return acc;
                    },
                    {} as CostCalculationResult["result"][0]
                )
            );
            resolve(res);
        });
    }

    static async calculate(data: CostCalculation): Promise<CostCalculationResult> {
        const res = await ApiClient.post("/cost-calc/calculate", data);
        const body = res.data ?? {};

        return {
            message: body.message,
            result: await this.formatResult(body.data),
        };
    }

    static async save(data: CostCalculation): Promise<{ message: string }> {
        await ApiClient.post("/cost-calc/save-draft", data);

        return {
            message: "Draft saved successfully!",
        };
    }
    static async edit(data: CostCalculation): Promise<{ message: string }> {
        await ApiClient.put(`/cost-calc/update-calculate/${window.location.href.split('/')[4]}`, data);

        return {
            message: "Updated successfully!",
        };
    }

    static async getHelpData(): Promise<CostCalculationHelpData> {
        const res = await ApiClient.get("/cost-calc/help-data");
        
        return res.data.data;
    }

    static async getHistory(id: number): Promise<HistoryResult<Alternative[], Alternative[]>> {
        const res = await ApiClient.get(`/history/show/${id}`);
        const data = res.data?.["data"];

        return {
            initialValues: data,
            result: data.alternatives?.map(alt=> ({
                ...alt,
                radiologies: alt.radiology,
                other_investigations: alt.other_investigation,
                other_medical_staffs: alt.other_medical_staff,
            })),
        };
    }
}

export default CostCalculationRepository;
