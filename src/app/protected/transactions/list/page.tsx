import { useState } from "react";
import { columns, rows } from "./helper";
import { CheckedBoxTable } from "../../../../common/components/CustomTable";
import { DatePicker, Input, Select, Button, Modal, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { routeLinks } from "../../../../common/routes/route-links";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleApplyFilters = () => {
    console.log({ dateRange, searchText, status });
    // Apply your actual filtering logic here
    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    setDateRange([]);
    setSearchText("");
    setStatus("");
    message.success("Filters reset");
  };

  const handleAddTransaction = () => {
    navigate(routeLinks.protected.transactions.create);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="flex gap-2">
          <Button type="default" onClick={() => setIsModalOpen(true)}>
            Filter
          </Button>
          <Button type="primary" onClick={handleAddTransaction}>
            Add Transaction
          </Button>
        </div>
      </div>

      <Modal
        title="Filter Transactions"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="reset" onClick={handleResetFilters}>
            Reset
          </Button>,
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="apply" type="primary" onClick={handleApplyFilters}>
            Apply Filters
          </Button>,
        ]}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <RangePicker
            style={{ width: "100%" }}
            // value={dateRange.length ? dateRange.map((d) => d && new Date(d)) : null}
            onChange={(_, dateStrings) => setDateRange(dateStrings)}
          />
          <Search
            placeholder="Search transactions"
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%" }}
          />
          <Select
            placeholder="Select status"
            allowClear
            value={status || undefined}
            style={{ width: "100%" }}
            onChange={(value) => setStatus(value)}
          >
            <Option value="success">Success</Option>
            <Option value="pending">Pending</Option>
            <Option value="failed">Failed</Option>
          </Select>
        </Space>
      </Modal>

      <div className="h-[calc(100vh-180px)] scroll-bar">
        <CheckedBoxTable columns={columns} dataSource={rows || []} />
      </div>
    </div>
  );
}

export default Page;
