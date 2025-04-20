import { useState } from "react";
import { Flex, Layout, Button } from "antd";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { menuItems, rootSubmenuKeys } from "./helper";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const { Sider } = Layout;

function SideNav() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [collapsed, setCollapsed] = useState(false);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const { logoutHandler } = useAuth();

  return (
    <Sider
      width={250}
      className="sidebar h-screen"
      breakpoint="lg"
      collapsedWidth="0"
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      style={{ height: "100vh", zIndex: 99 }}
    >
      <Flex vertical className="w-full h-full py-6 justify-between">
        <Flex vertical className="gap-y-12">
          <div className="size-8 bg-gray-400 mx-auto mt-8" />
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={menuItems}
            selectedKeys={[
              (
                menuItems.find((item) =>
                  item ? pathname.startsWith(String(item.key)) : false
                )?.key || pathname
              ).toString(),
            ]}
            onClick={({ key }) => {
              navigate(key);
              if (window.innerWidth <= 1000) setCollapsed(true);
            }}
          />
        </Flex>

        <div className="px-4 pb-4">
          <Button danger type="primary" block onClick={logoutHandler}>
            Logout
          </Button>
        </div>
      </Flex>
    </Sider>
  );
}

export default SideNav;
