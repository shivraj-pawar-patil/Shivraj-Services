import { z } from "zod";
export const userSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  gender: z
    .string()
    .refine((value) => ["male", "female"].includes(value.toLowerCase()), {
      message: 'Gender must be either "male" or "female"',
    }),
  location: z.string().min(2, {
    message: "Location should be at least 2 characters",
  }),
  phone_no: z
    .string()
    .min(10, {
      message: "Number should be at least 10 characters",
    })
    .max(10, {
      message: "Number should be at most 10 characters",
    }),
});

export type TUserSchema = z.infer<typeof userSchema>;
