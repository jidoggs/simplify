import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Typography,
  Card,
} from "antd";
import dayjs from "dayjs";
import useTransaction from "../../../../common/hooks/useTransaction";

const { Title } = Typography;
const { Option } = Select;

export default function Page() {
  const [form] = Form.useForm();

  const { createTransactionRQ } = useTransaction();

  const handleSubmit = async (values: any) => {
    try {
      const formattedData = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
      };

      const response = await createTransactionRQ.mutateAsync({
        data: formattedData,
      });
      if (response) {
        form.resetFields();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      title={<Title level={3}>Create Transaction</Title>}
      style={{
        maxWidth: 800,
        margin: "0 auto",
        marginTop: 40,
        boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
      }}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please enter an amount" },
            {
              type: "number",
              min: 0.01,
              message: "Amount must be a positive number",
            },
          ]}
        >
          <InputNumber
            prefix="$"
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
          rules={[
            { required: true, message: "Please select a date" },
            {
              validator: (_, value) =>
                value && value.isAfter(dayjs())
                  ? Promise.reject(new Error("Date cannot be in the future"))
                  : Promise.resolve(),
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={createTransactionRQ.isPending}
          >
            Create Transaction
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
