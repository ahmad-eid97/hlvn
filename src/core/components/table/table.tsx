import React from "react";
import { Table as AntTable, TableProps as AntTableProps } from "antd";
import ComponentThemeProvider from "@components/component-theme-provider";

type TableProps = AntTableProps & {};

function Table(props: TableProps) {
    return (
        <div className="bg-surface p-4 pb-0 rounded-2xl overflow-hidden">
            <div className="rounded-[4px] [&_th]:!py-2 [&_th]:!text-xs [&_.ant-table-selection-column]:!ps-3.5">
                <ComponentThemeProvider>
                    <AntTable
                        {...props}
                        pagination={{
                            size: "small",
                            ...(props.pagination ?? {}),
                        }}
                    />
                </ComponentThemeProvider>
            </div>
        </div>
    );
}

export default Table;
