import { Layout, Flex } from "antd";
import { Outlet } from "react-router-dom";

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
      <Flex
        align="center"
        justify="center"
        gap={32}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      >
        <Outlet />
      </Flex>
    </Layout>
  );
}
