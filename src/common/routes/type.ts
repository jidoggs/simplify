export interface RouteType {
  path: string;
  // Component: React.LazyExoticComponent<React.ComponentType<any>>;
  access: "loggedin" | "public";
  pagePath: string | string[];
}
