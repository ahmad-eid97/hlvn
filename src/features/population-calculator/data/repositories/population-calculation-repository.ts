import ApiClient from "@api-client";
import PopulationCalculationResult from "../../domain/models/population-calculation-result";
import PopulationCalculation from "../../domain/models/population-calculation";
import HistoryResult from "@core/domain/types/history-result";

class PopulationCalculationRepository {
    private static cleanData(data: PopulationCalculation) {
        return {
            ...data,
            groups: data.groups?.map((group) => ({
                ...group,
                subgroups: group.subgroups?.filter((subgroup) => subgroup),
            })),
        };
    }

    static async calculate(data: PopulationCalculation): Promise<PopulationCalculationResult> {
        const res = await ApiClient.post("/population-calc/calculate", this.cleanData(data));

        return {
            message: res.data.message,
            data: res.data.data,
            result: res.data.data,
        };
    }

    static async save(data: PopulationCalculation): Promise<{ message: string }> {
        const res = await ApiClient.post("/population-calc/save-draft", this.cleanData(data));

        return {
            message: res.data.message,
        };
    }
    static async edit(data: PopulationCalculation): Promise<{ message: string }> {
      const idInputElement = document.getElementById('idInput') as HTMLInputElement;
      if (!idInputElement || !idInputElement.value) {
          console.error('ID input element not found or has no value');
      }
        const res = await ApiClient.put(`/population-calc/update-calculate/${idInputElement.value}`, this.cleanData(data));
        return {
            message: res.data.message,
        };
    }

    static async getHistory(id: number): Promise<HistoryResult<PopulationCalculation, any[]>> {
        const res = await ApiClient.get(`/history/show/${id}`);
        const data = res.data.data;
        return {
            initialValues: data,
            result: data?.["groups"] ?? [],
        };
    }
}

export default PopulationCalculationRepository;
