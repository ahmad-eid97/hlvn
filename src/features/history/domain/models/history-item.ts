type HistoryItem = {
    id: number;
    name: string;
    type: "Quantity" | "Population" | "Cost";
    status: "draft" | "completed";
    created_at: string;
};

export default HistoryItem;
