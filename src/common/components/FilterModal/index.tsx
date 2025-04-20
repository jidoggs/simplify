import { DatePicker, Input, Select, Button, Modal, Space } from "antd";
import dayjs from "dayjs";
import { FilterModalProps } from "./type";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

const FilterModal = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  filterParams,
  setFilterParams,
}: FilterModalProps) => {
  const dateRange = filterParams.dateRange;

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams("searchText", e.target.value);
  };

  const selectHandler = (value: string) => {
    setFilterParams("status", value);
  };

  return (
    <Modal
      title="Filter Transactions"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="reset" onClick={onReset}>
          Reset
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="apply" type="primary" onClick={onApply}>
          Apply Filters
        </Button>,
      ]}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <RangePicker
          style={{ width: "100%" }}
          value={
            dateRange.length === 2
              ? [dayjs(dateRange[0]), dayjs(dateRange[1])]
              : null
          }
          onChange={(_, dateStrings) =>
            setFilterParams("dateRange", dateStrings)
          }
        />
        <Search
          placeholder="Search by Transaction ID or Amount"
          allowClear
          value={filterParams.searchText}
          onChange={searchHandler}
          style={{ width: "100%" }}
        />
        <Select
          placeholder="Filter by Status"
          allowClear
          value={filterParams.status || undefined}
          style={{ width: "100%" }}
          onChange={selectHandler}
        >
          <Option value="success">Success</Option>
          <Option value="pending">Pending</Option>
          <Option value="failed">Failed</Option>
        </Select>
      </Space>
    </Modal>
  );
};

export default FilterModal;
