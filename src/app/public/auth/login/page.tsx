import { Card, Typography } from "antd";
import LoginForm from "./form";

const { Title } = Typography;

export default function Page() {
  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "0 auto",
        marginTop: 100,
        boxShadow:
          "0 5px 15px rgba(0,0,0,0.05), 0 15px 35px -5px rgba(0,0,0,0.05)",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Sign in
      </Title>
      <LoginForm />
    </Card>
  );
}
