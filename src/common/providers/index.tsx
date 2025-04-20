import React from "react";
import StyledComponentsRegistry from "./AntdRegistry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {
  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StyledComponentsRegistry>
  );
}

export default Providers;
