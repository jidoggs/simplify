import { ReactNode } from "react";

function AuthGuard({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default AuthGuard;
