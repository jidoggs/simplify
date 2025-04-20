import React from "react";
import { Avatar, Breadcrumb } from "antd";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";

const generateBreadCrumbs = (
  path: string
): Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] => {
  const pathArrSplit = path.split("/").slice(2);
  const pathArr =
    pathArrSplit[0] === "loans" ? pathArrSplit.slice(1) : pathArrSplit;

  const separator: BreadcrumbSeparatorType = {
    type: "separator",
    separator: "/",
  };
  const routes = [];
  for (let i = 0; i < pathArr.length; i++) {
    const val: Partial<BreadcrumbItemType & BreadcrumbSeparatorType> = {};
    const tempTitle = pathArr[i].split("%20").join(" ");
    val.title = tempTitle[0].toUpperCase() + tempTitle.substring(1);
    val.href = "/app/" + pathArr.slice(0, i + 1).join("/");
    routes.push(separator);
    routes.push(val);
  }

  return routes.slice(0, routes.length - 1);
};

const AppHeader: React.FunctionComponent = () => {
  const pathname = useLocation().pathname;
  const crumbs = generateBreadCrumbs(pathname);

  return (
    <div className="">
      <div className="top py-1 px-5 flex w-full justify-between items-center bg-white z-10 top-0">
        <Breadcrumb items={[...crumbs]} separator={""} />
        <div className="gap-x-2.5 flex items-center">
          <div className="cursor-pointer flex items-center gap-x-2.5 py-1.5 flex-1">
            <Avatar
              size={40}
              icon={
                <span className="flex items-center justify-center flex-1 h-full">
                  {/* <Profile size="22" className="stroke-white" /> */}
                </span>
              }
            />
            <div className="flex flex-col">
              <p className="font-semibold text-sm mb-0.5">Mark Green</p>
              <p className="font-normal !text-xs !text-gray-mist-body">User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
