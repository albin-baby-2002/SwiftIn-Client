import { z } from "zod";

export const AdminLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "password is min 8 character long"),
});
