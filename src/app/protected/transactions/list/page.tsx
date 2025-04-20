import { useEffect, useState } from "react";
import { Button, message, Typography, Space, Row, Col, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { columns } from "./helper";
import { CheckedBoxTable } from "../../../../common/components/CustomTable";
import { routeLinks } from "../../../../common/routes/route-links";
import useTransaction from "../../../../common/hooks/useTransaction";
import FilterModal from "../../../../common/components/FilterModal";

const { Title } = Typography;
const { Content } = Layout;

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filterParams, setFilterParams] = useState({
    dateRange: [] as string[],
    searchText: "",
    status: "",
  });

  const navigate = useNavigate();
  const { getTransactionsRQ } = useTransaction();

  useEffect(() => {
    if (!getTransactionsRQ.isPending) return;
    getTransactionsRQ.refetch();
  }, [getTransactionsRQ.isPending]);

  const handleApplyFilters = () => {
    const allData = getTransactionsRQ.data?.data || [];

    const filtered = allData.filter((item) => {
      const { dateRange, searchText, status } = filterParams;

      const matchesStatus = status
        ? item.status.toLowerCase() === status.toLowerCase()
        : true;

      const matchesSearch = searchText
        ? item.id.toLowerCase().includes(searchText.toLowerCase()) ||
          item.amount
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        : true;

      const matchesDate =
        dateRange.length === 2
          ? new Date(item.date) >= new Date(dateRange[0]) &&
            new Date(item.date) <= new Date(dateRange[1])
          : true;

      return matchesStatus && matchesSearch && matchesDate;
    });

    setFilteredData(filtered);
    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    setFilterParams({
      dateRange: [],
      searchText: "",
      status: "",
    });
    message.success("Filters reset");
  };

  const handleAddTransaction = () => {
    navigate(routeLinks.protected.transactions.create);
  };

  const filterHandler = (
    key: keyof typeof filterParams,
    value: string | string[]
  ) => {
    setFilterParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Content style={{ padding: "1rem" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4}>Transactions</Title>
        </Col>
        <Col>
          <Space>
            <Button type="default" onClick={() => setIsModalOpen(true)}>
              Filter
            </Button>
            <Button type="primary" onClick={handleAddTransaction}>
              Add Transaction
            </Button>
          </Space>
        </Col>
      </Row>

      <div style={{ height: "calc(100vh - 180px)", overflowY: "auto" }}>
        <CheckedBoxTable
          columns={columns}
          dataSource={
            filteredData.length
              ? filteredData
              : getTransactionsRQ.data?.data || []
          }
          loading={getTransactionsRQ.isFetching}
        />
      </div>

      <FilterModal
        filterParams={filterParams}
        isOpen={isModalOpen}
        onApply={handleApplyFilters}
        onClose={() => setIsModalOpen(false)}
        onReset={handleResetFilters}
        setFilterParams={filterHandler}
      />
    </Content>
  );
}

export default Page;
