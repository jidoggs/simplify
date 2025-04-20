import React from "react";
import { Table } from "antd";
import { TableProps } from "antd/lib";
import { Loader } from "../Loader";

interface CustomAntdTableProps<T>
  extends Omit<TableProps<T>, "pagination" | "title"> {
  tableTitle?: string | null | React.ReactNode;
  pageSize?: number;
  currentPage?: number;
  tabs?: React.ReactNode;
  searchPanel?: React.ReactNode;
}

export const CheckedBoxTable = <T extends object>({
  loading,
  ...props
}: CustomAntdTableProps<T>) => {
  return (
    <div className="bg-white  h-full overflow-auto">
      <Table
        {...props}
        pagination={false}
        sticky={true}
        scroll={{ x: "max-content" }}
        rowKey={"id"}
        loading={
          typeof loading === "boolean"
            ? { spinning: loading, indicator: <Loader /> }
            : loading
        }
      />
    </div>
  );
};

