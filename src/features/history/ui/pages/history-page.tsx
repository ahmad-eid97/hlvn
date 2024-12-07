"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import HistoryRepository from "../../data/repositories/history-repository";
import Table from "@components/table";
import classNames from "classnames";
import { MenuDotsIcon, SearchIcon, TrashIcon } from "@icons";
import { Input, RangePicker, Select } from "@components/form";
import debounce from "@utils/debounce";
import Link from "next/link";
import Dropdown from "@components/dropdown";
import { Modal } from "antd";

const { confirm } = Modal;

function HistoryPage() {
    const [params, setParams] = useState({
        search: "",
        calculator: "",
        startDate: "",
        endDate: "",
    });

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["history", params],
        queryFn: () => HistoryRepository.getAll(params),
        placeholderData: (prev) => prev,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => HistoryRepository.delete(id),
        onMutate: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ["history", params],
                })
                .then(() => query.refetch());
        },
    });

    const onSearch = (value: string) => {
        setParams((prev) => ({ ...prev, search: value }));
    };

    const onSearchDebounce = debounce(onSearch, 500);

    const onSearchChange = (e) => {
        const value = e.target.value;
        if (value.length === 0) onSearch(value);
        onSearchDebounce(value);
    };

    const onDeleteHistoryItem = (id: number) => {
        confirm({
            title: "Are you sure you want to delete this item?",
            onOk: () => deleteMutation.mutateAsync(id),
        });
    };

    return (
        <div>
            <div className="flex flex-row items-center gap-4">
                <Input
                    placeholder="Search"
                    suffix={<SearchIcon className="stroke-orient-800" />}
                    onChange={onSearchChange}
                />
                <Select
                    placeholder="Calculator"
                    allowClear
                    onChange={(v) => setParams((prev) => ({ ...prev, calculator: v }))}
                    options={[
                        {
                            value: "Quantity",
                        },
                        {
                            value: "Population",
                        },
                        {
                            value: "Direct Cost",
                            label: "Cost",
                        },
                    ]}
                />
                <RangePicker
                    onChange={(v) =>
                        setParams((prev) => ({
                            ...prev,
                            startDate: v?.[0] ? `${v?.[0].format("YYYY-MM-DD")}` : "",
                            endDate: v?.[1] ? `${v?.[1].format("YYYY-MM-DD")}` : "",
                        }))
                    }
                />
            </div>
            <Table
                columns={[
                    {
                        title: "Id",
                        dataIndex: "id",
                        render: (value, row) => {
                            switch (row.type) {
                                case "Quantity":
                                    return <Link href={`/quantity-calculator/${value}`}>{value}</Link>;
                                case "Population":
                                    return <Link href={`/population-calculator/${value}`}>{value}</Link>;
                                case "Direct Cost":
                                    return <Link href={`/cost-calculator/${value}`}>{value}</Link>;
                                default:
                                    return value;
                            }
                        },
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        title: "Type",
                        dataIndex: "type",
                        render: (value) => value.split(" ")?.[1] || value,
                        sorter: (a, b) => a.type.localeCompare(b.type),
                    },
                    {
                        title: "Date",
                        dataIndex: "created_at",
                        render: (value) => value.split("T")[0],
                        sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        width: "15%",
                        render: (value, row) => (
                            <div className="flex flex-row justify-between items-center">
                                <div
                                    className={classNames(
                                        "w-fit px-3 py-2 -my-2 rounded-lg text-text-primary capitalize",
                                        {
                                            "bg-success": value === "completed",
                                            "bg-warning": value === "draft",
                                        }
                                    )}>
                                    {value}
                                </div>
                                <div role="button">
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    className: "group",
                                                    key: "delete",
                                                    label: "Delete",
                                                    danger: true,
                                                    icon: (
                                                        <TrashIcon className="stroke-danger group-hover:stroke-white transition-all" />
                                                    ),
                                                    onClick: () => onDeleteHistoryItem(row.id),
                                                },
                                            ],
                                        }}>
                                        <MenuDotsIcon className="fill-orient-700" />
                                    </Dropdown>
                                </div>
                            </div>
                        ),
                    },
                ]}
                dataSource={query.data}
                loading={query.isLoading || query.isPending}
                // rowSelection={{
                //     type: "checkbox",
                // }}
            />
        </div>
    );
}

export default HistoryPage;
