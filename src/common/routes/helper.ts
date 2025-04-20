import { lazy, ComponentType } from "react";

const appPages = import.meta.glob<{
  default: ComponentType<any>;
}>("../../app/**/page.tsx");

export const loadAppPage = (paths: string | string[]) => {
  const pagePath = `../../app/${
    Array.isArray(paths) ? paths.join("/") : paths
  }/page.tsx`;
  const importer = appPages[pagePath];

  if (!importer) {
    throw new Error(`Page not found: ${pagePath}`);
  }

  return lazy(importer);
};
