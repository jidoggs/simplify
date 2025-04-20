import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

export type LoginFormType = z.infer<typeof loginSchema>;

export const resolver = zodResolver(loginSchema);

export const defaultValues = {
  email: "",
  password: "",
  remember: false,
};
