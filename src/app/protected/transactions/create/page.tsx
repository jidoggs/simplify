import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  message,
  Card,
} from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { routeLinks } from "../../../../common/routes/route-links";

const { Title } = Typography;
const { Option } = Select;

export default function Page() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    const formattedData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };

    console.log("New Transaction:", formattedData);
    message.success("Transaction created successfully!");
    form.resetFields();

    // Simulate navigation or API call
    setTimeout(() => navigate(routeLinks.protected.transactions.list), 1000);
  };

  return (
    <Card
      title={<Title level={3}>Create Transaction</Title>}
      style={{
        maxWidth: 500,
        margin: "0 auto",
        marginTop: 40,
        boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          status: "Completed",
          date: dayjs(),
        }}
      >
        <Form.Item
          label="Transaction ID"
          name="id"
          rules={[{ required: true, message: "Please enter a transaction ID" }]}
        >
          <Input placeholder="e.g. TRX001" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter an amount" }]}
        >
          <InputNumber
            prefix="$"
            min={0}
            style={{ width: "100%" }}
            placeholder="e.g. 1500.00"
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select status">
            <Option value="Completed">Completed</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Failed">Failed</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Transaction
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
