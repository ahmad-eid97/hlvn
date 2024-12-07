import { log } from "console";
import ProductQuantityCalculation from "../../domain/models/product-quantity-calculation";
import ProductQuantityCalculationResult from "../../domain/models/product-quantity-calculation-result";
import ApiClient from "@api-client";
import HistoryResult from "@core/domain/types/history-result";

class ProductQuantityCalculationRepository {
    static productQuantityResultLabels = {
        protocol_check: "Regimen / protocol check",
        cycle_length: "Cycle length",
        num_of_doses_required_regimen: "Number of doses required per regimen /year",
        num_of_doses_per_pack: "Number of doses per pack",
        required_units_per_regimen_or_year_per_patient: "Required units per regimen/year per patient",
        required_units_per_regimen_or_year_per_patient_title: "Required units per regimen/year per patient:",
        required_packs_per_regimen_or_year_per_patient: "Required packs per regimen/year per patient",
    };

    private static formatData(data: ProductQuantityCalculation) {
        data.units_per_pack = data.units_per_pack ?? 0;
        data.unit_concentration = data.unit_concentration ?? 0;
        data.unit_solvent_size = data.unit_solvent_size ?? 0;
        data.dose = data.dose ?? 0;
        data.average_weight = data.average_weight ?? 0;
        data.average_body_surface = data.average_body_surface ?? 0;
        data.every = data.every ?? 0;
        data.for = data.for ?? 0;
        data.is_pack_can_divided = data.is_pack_can_divided ? 1 : 0;

        return data;
    }

    private static getFormattedResult(data: any) {
        return Object.entries(data ?? {})
            .filter(([key]) => !key.includes("id"))
            .map(([key, val]) => ({
                label: this.productQuantityResultLabels[key],
                value: `${val}`,
            }))
            .filter(({ label }) => label);
    }

    static async calculate(data: ProductQuantityCalculation): Promise<ProductQuantityCalculationResult> {
        const formattedData = this.formatData(data);

        const res = await ApiClient.post("/quantity-calc/calculate", formattedData);
        const body = res.data ?? {};

        return {
            message: body.message,
            result: this.getFormattedResult(body.data),
        };
    }

    static async save(data: ProductQuantityCalculation): Promise<{ message: string }> {
        const formattedData = this.formatData(data);

        await ApiClient.post("/quantity-calc/save-draft", formattedData);

        return {
            message: "Draft saved successfully!",
        };
    }
    static async edit(data: ProductQuantityCalculation): Promise<{ message: string }> {
      const idInputElement = document.getElementById('idInput') as HTMLInputElement;
      if (!idInputElement || !idInputElement.value) {
          console.error('ID input element not found or has no value');
      }
      const formattedData = this.formatData(data);
      await ApiClient.put(`/quantity-calc/update-calculate/${idInputElement.value}`, formattedData);
  
      return {
          message: "Updated successfully!",
      };
  }
  

    static async getHistory(id: number): Promise<HistoryResult<ProductQuantityCalculation, any[]>> {
        const res = await ApiClient.get(`/history/show/${id}`);
        const { results, ...data } = res.data["data"];

        return {
            initialValues: data,
            result: this.getFormattedResult(results),
        };
    }
}

export default ProductQuantityCalculationRepository;
