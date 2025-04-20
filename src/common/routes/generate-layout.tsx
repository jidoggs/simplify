import { ComponentType, lazy } from "react";
import { Outlet } from "react-router-dom";

const layoutModules = import.meta.glob<{ default: ComponentType<any> }>(
  "../../app/**/layout.tsx"
);

export const getLayoutForPath = (
  paths: string | string[]
): React.LazyExoticComponent<ComponentType<any>> | ComponentType<any> => {
  const basePaths = Array.isArray(paths) ? [...paths] : paths.split("/");

  while (basePaths.length > 0) {
    const candidate = basePaths.join("/");
    const match = Object.keys(layoutModules).find((key) =>
      key.endsWith(`${candidate}/layout.tsx`)
    );

    if (match) {
      return lazy(layoutModules[match]);
    }

    basePaths.pop();
  }

  return () => <Outlet />;
};
