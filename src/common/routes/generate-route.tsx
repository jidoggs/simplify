import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import Loader from "../components/Loader";
import { RouteType } from "./type";
import { getLayoutForPath } from "./generate-layout";
import { loadAppPage } from "./helper";
import AuthGuard from "../components/AuthGuard";

const PageSuspense = ({ children }: { children: ReactNode }) => {
  return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};

export const generateRoute = ({ path, pagePath, access }: RouteType) => {
  const Layout = getLayoutForPath(pagePath);
  const Component = loadAppPage(pagePath);

  const PageContent = (
    <PageSuspense>
      <Component />
    </PageSuspense>
  );

  let WrappedLayout = (
    <PageSuspense>
      <Layout />
    </PageSuspense>
  );

  if (access === "loggedin") {
    WrappedLayout = <AuthGuard>{WrappedLayout}</AuthGuard>;
  }

  return (
    <Route key={`${path}`} element={WrappedLayout}>
      <Route path={path} element={PageContent} />
    </Route>
  );
};
