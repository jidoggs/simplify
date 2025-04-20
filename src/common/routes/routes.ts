import { routeLinks } from "./route-links";
import { RouteType } from "./type";

export const routes: RouteType[] = [
  {
    path: routeLinks.auth.login,
    pagePath: ["public", "auth", "login"],
    access: "public",
  },
  {
    path: routeLinks.protected.transactions.list,
    pagePath: ["protected", "transactions", "list"],
    access: "loggedin",
  },
  {
    path: routeLinks.protected.transactions.create,
    pagePath: ["protected", "transactions", "create"],
    access: "loggedin",
  },
];
