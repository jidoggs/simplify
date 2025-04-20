import { Layout as AntLayout } from "antd";
import SideNav from "../../common/components/SideNav";
import AppHeader from "../../common/components/AppHeader";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <AntLayout className="!bg-white">
      <div className="h-screen flex w-full">
        <SideNav />
        <AntLayout className="flex flex-col relative min-h-screen overflow-y-scroll w-full">
          <div className="sticky top-0 z-10 bg-white">
            <AppHeader />
          </div>
          <div className="w-full px-5 py-2.5">
            <Outlet />
          </div>
        </AntLayout>
      </div>
    </AntLayout>
  );
}
