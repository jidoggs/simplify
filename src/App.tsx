import { Navigate, Route, Routes } from "react-router-dom";
import { generateRoute } from "./common/routes/generate-route";
import { routes } from "./common/routes/routes";
import { routeLinks } from "./common/routes/route-links";

function App() {
  return (
    <Routes>
      <Route>{routes.map((route) => generateRoute(route))}</Route>
      <Route
        path="/"
        element={<Navigate to={routeLinks.auth.login} replace />}
      />
      <Route path="*" element={<p>NOT FOUND</p>} />
    </Routes>
  );
}

export default App;
