import { ColumnsType } from "antd/es/table";

export const columns: ColumnsType<any> = [
  {
    title: "Transaction ID",
    dataIndex: "id",
    width: 200,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 200,
    render: (value) => (
      <>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value)}
      </>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 200,
    render: (value) => {
      let color = "";
      let text = value;

      switch (value) {
        case "Completed":
          color = "green";
          text = "Completed";
          break;
        case "Pending":
          color = "orange";
          text = "Pending";
          break;
        case "Failed":
          color = "red";
          text = "Failed";
          break;
        default:
          color = "gray";
          text = "Unknown";
          break;
      }

      return <span style={{ color }}>{text}</span>;
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    width: 200,
  },
];
