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

export const rows = [
  { id: "TRX001", amount: 1500.0, status: "Completed", date: "2024-10-28" },
  { id: "TRX002", amount: 842.5, status: "Pending", date: "2024-11-01" },
  { id: "TRX003", amount: 300.0, status: "Failed", date: "2024-10-22" },
  { id: "TRX004", amount: 1200.0, status: "Completed", date: "2024-10-19" },
  { id: "TRX005", amount: 960.75, status: "Pending", date: "2024-11-03" },
  { id: "TRX006", amount: 450.0, status: "Completed", date: "2024-10-31" },
  { id: "TRX007", amount: 1020.0, status: "Failed", date: "2024-11-02" },
  { id: "TRX008", amount: 785.4, status: "Completed", date: "2024-10-25" },
  { id: "TRX009", amount: 630.0, status: "Pending", date: "2024-10-29" },
  { id: "TRX010", amount: 1499.99, status: "Completed", date: "2024-11-05" },
  { id: "TRX011", amount: 715.5, status: "Completed", date: "2024-10-20" },
  { id: "TRX012", amount: 230.0, status: "Failed", date: "2024-10-18" },
  { id: "TRX013", amount: 899.0, status: "Pending", date: "2024-10-26" },
  { id: "TRX014", amount: 1050.0, status: "Completed", date: "2024-10-27" },
  { id: "TRX015", amount: 395.8, status: "Failed", date: "2024-11-04" },
  { id: "TRX016", amount: 678.9, status: "Completed", date: "2024-11-06" },
  { id: "TRX017", amount: 1542.0, status: "Pending", date: "2024-10-24" },
  { id: "TRX018", amount: 120.0, status: "Failed", date: "2024-10-30" },
  { id: "TRX019", amount: 810.0, status: "Completed", date: "2024-10-21" },
  { id: "TRX020", amount: 660.6, status: "Completed", date: "2024-10-23" },
  { id: "TRX021", amount: 300.3, status: "Pending", date: "2024-10-17" },
  { id: "TRX022", amount: 980.0, status: "Completed", date: "2024-11-07" },
  { id: "TRX023", amount: 250.0, status: "Failed", date: "2024-11-08" },
  { id: "TRX024", amount: 1199.99, status: "Completed", date: "2024-11-09" },
  { id: "TRX025", amount: 340.0, status: "Pending", date: "2024-11-10" },
  { id: "TRX026", amount: 750.0, status: "Completed", date: "2024-11-11" },
  { id: "TRX027", amount: 615.5, status: "Failed", date: "2024-11-12" },
  { id: "TRX028", amount: 980.0, status: "Completed", date: "2024-11-13" },
  { id: "TRX029", amount: 400.0, status: "Pending", date: "2024-11-14" },
  { id: "TRX030", amount: 1380.0, status: "Completed", date: "2024-11-15" },
  { id: "TRX031", amount: 520.0, status: "Failed", date: "2024-11-16" },
  { id: "TRX032", amount: 785.0, status: "Completed", date: "2024-11-17" },
  { id: "TRX033", amount: 690.0, status: "Pending", date: "2024-11-18" },
  { id: "TRX034", amount: 105.0, status: "Failed", date: "2024-11-19" },
  { id: "TRX035", amount: 1225.0, status: "Completed", date: "2024-11-20" },
  { id: "TRX036", amount: 990.0, status: "Pending", date: "2024-11-21" },
  { id: "TRX037", amount: 400.0, status: "Failed", date: "2024-11-22" },
  { id: "TRX038", amount: 875.0, status: "Completed", date: "2024-11-23" },
  { id: "TRX039", amount: 645.5, status: "Pending", date: "2024-11-24" },
  { id: "TRX040", amount: 760.0, status: "Completed", date: "2024-11-25" },
  { id: "TRX041", amount: 1340.0, status: "Failed", date: "2024-11-26" },
  { id: "TRX042", amount: 590.0, status: "Completed", date: "2024-11-27" },
  { id: "TRX043", amount: 450.0, status: "Pending", date: "2024-11-28" },
  { id: "TRX044", amount: 705.5, status: "Completed", date: "2024-11-29" },
  { id: "TRX045", amount: 880.0, status: "Failed", date: "2024-11-30" },
  { id: "TRX046", amount: 300.0, status: "Completed", date: "2024-12-01" },
  { id: "TRX047", amount: 660.0, status: "Pending", date: "2024-12-02" },
  { id: "TRX048", amount: 1100.0, status: "Failed", date: "2024-12-03" },
  { id: "TRX049", amount: 1320.0, status: "Completed", date: "2024-12-04" },
  { id: "TRX050", amount: 475.0, status: "Pending", date: "2024-12-05" },
  { id: "TRX051", amount: 900.0, status: "Completed", date: "2024-12-06" },
  { id: "TRX052", amount: 250.0, status: "Failed", date: "2024-12-07" },
  { id: "TRX053", amount: 1060.0, status: "Completed", date: "2024-12-08" },
  { id: "TRX054", amount: 310.0, status: "Pending", date: "2024-12-09" },
  { id: "TRX055", amount: 830.0, status: "Completed", date: "2024-12-10" },
];
