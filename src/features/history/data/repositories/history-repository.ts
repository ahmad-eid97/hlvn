import HistoryItem from "../../domain/models/history-item";
import ApiClient from "@api-client";

class HistoryRepository {
    static async getAll(params: {
        search: string;
        calculator: string;
        startDate: string;
        endDate: string;
    }): Promise<HistoryItem[]> {
        const res = await ApiClient.get("/history", {
            params: {
                type: params.calculator || "all",
                search: params.search,
                date_from: params.startDate,
                date_to: params.endDate,
            },
        });
        return res.data["data"];
    }

    static async get<T>(id: number): Promise<T> {
        const res = await ApiClient.get(`/history/${id}`);
        return res.data["data"];
    }

    static async delete(id: number): Promise<{
        message: string;
    }> {
        await ApiClient.delete(`/history/delete/${id}`);

        return {
            message: "History item deleted successfully",
        };
    }
}

export default HistoryRepository;
