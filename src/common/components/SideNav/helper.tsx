import React from "react";
import type { MenuProps } from "antd";

import {
  AccountBookFilled,
  HomeFilled,
  UserOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { routeLinks } from "../../routes/route-links";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const navItems = {
  DASHBOARD: getItem(<span>Dashboard</span>, "#1", <HomeFilled />),
  TRANSACTIONS: getItem(
    <span>Transactions</span>,
    routeLinks.protected.transactions.list,
    <TransactionOutlined />
  ),
  CLIENTS: getItem(<span>Clients</span>, "#2", <UserOutlined />),
  TASKS: getItem(<span>Tasks</span>, "#3", <AccountBookFilled />),
};

export const menuItems = [
  navItems.DASHBOARD,
  navItems.TRANSACTIONS,
  navItems.CLIENTS,
  navItems.TASKS,
];

export const rootSubmenuKeys = ["sub1", "sub2", "sub3"];
