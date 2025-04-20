import { useEffect, useState } from "react";
import { Button, Typography, Space, Row, Col, Layout, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { columns } from "./helper";
import { CheckedBoxTable } from "../../../../common/components/CustomTable";
import { routeLinks } from "../../../../common/routes/route-links";
import useTransaction from "../../../../common/hooks/useTransaction";
import FilterModal from "../../../../common/components/FilterModal";
import { usePagination } from "../../../../common/hooks/usePagination";
import { useDebounce } from "../../../../common/hooks/useDebounce";

const { Title } = Typography;
const { Content } = Layout;
const { Search } = Input;

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterParams, setFilterParams] = useState({
    dateRange: [] as string[],
    searchText: "",
    status: "",
  });

  const search = useDebounce(filterParams.searchText, 600);

  const date = {
    end: filterParams.dateRange[1],
    start: filterParams.dateRange[0],
  };
  const pagination = usePagination({ itemsPerPage: 15 });
  const query = {
    status: filterParams.status,
    search,
    date: filterParams.dateRange[1] ? JSON.stringify(date) : "",
    page: pagination.currentPage,
    limit: pagination.itemsPerPage,
  };

  const navigate = useNavigate();
  const { getTransactionsRQ } = useTransaction({
    canGetTransactions: true,
    ...query,
  });

  useEffect(() => {
    if (getTransactionsRQ.data?.count) {
      pagination.handleTotalItems(getTransactionsRQ.data?.count);
    }
  }, [getTransactionsRQ.data?.count]);

  const handleApplyFilters = () => {
    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    setFilterParams({
      dateRange: [],
      searchText: "",
      status: "",
    });
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

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterHandler("searchText", e.target.value);
  };

  return (
    <Content style={{ padding: "1rem" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4}>Transactions</Title>
        </Col>
        <Col>
          <Space>
            <Search
              placeholder="Search by Transaction ID or Amount"
              allowClear
              value={filterParams.searchText}
              onChange={searchHandler}
              style={{ width: "100%" }}
            />
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
          dataSource={getTransactionsRQ.data?.data}
          loading={getTransactionsRQ.isFetching}
          pagination={{
            current: pagination.currentPage,
            pageSize: pagination.itemsPerPage,
            total: getTransactionsRQ.data?.count || 0,
            onChange: (page) => {
              pagination.handlePageChange({ selected: page });
            },
          }}
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
