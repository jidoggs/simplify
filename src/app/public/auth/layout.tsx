import { Layout, Flex } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export default function PageLayout() {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "auto",
        padding: "24px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
      }}
    >
      <Content style={{ width: "100%", maxWidth: "1200px" }}>
        <Flex
          vertical
          align="center"
          justify="center"
          gap={32}
          style={{
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Flex>
      </Content>
    </Layout>
  );
}
