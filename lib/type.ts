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
  type: z
    .string()
    .refine(
      (value) =>
        [
          "Dacryocystitis",
          "Cataract",
          "Pterygium",
          "Spectacles",
          "Follow-up",
        ].includes(value),
      {
        message:
          'Type must be ["Dacryocystitis", "Cataract", "Pterygium", "Spectacles", "Follow-up"]',
      }
    ),
});

export type TUserSchema = z.infer<typeof userSchema>;

export const userInfoSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  location: z.string().min(2, {
    message: "Location should be at least 2 characters",
  }),
  age: z.string().optional(),
  date: z.date().optional(),
  delevery_date: z.date().optional(),
  totalAmount: z.string().optional(),
  advance: z.string().optional(),
  balance: z.string().optional(),
  glass_type: z
    .string()
    .refine(
      (value) =>
        [
          "Bifocal",
          "Kryptok",
          "Executive",
          "D Bifocal",
          "Photogrey",
          "SP",
          "Resilens",
          "High Index",
          "Ar.Coating",
          "Progressive",
          "Constant Use",
          "Near Only",
          "For Distnace Only",
          "Blue Cut Blue Coating",
          "Blue Cut Hmc",
          "Hc kt",
          "Cr pg",
          "Pg glass",
        ].includes(value),
      {
        message: `Type must be [
            "Bifocal",
            "Kryptok",
            "Executive",
            "D Bifocal",
            "Photogrey",
            "SP",
            "Resilens",
            "High Index",
            "Ar.Coating",
            "Progressive",
            "Constant Use",
            "Near Only",
            "For Distnace Only",
            "Blue Cut Blue Coating",
            "Blue Cut Hmc",
            "Hc kt",
            "Cr pg",
            "Pg glass",
          ]`,
      }
    ),
  rSPHu: z.string().optional(),
  rCYLu: z.string().optional(),
  rAXISu: z.string().optional(),
  rVISIONu: z.string().optional(),
  rSPHb: z.string().optional(),
  rCYLb: z.string().optional(),
  rAXISb: z.string().optional(),
  rVISIONb: z.string().optional(),
  lSPHu: z.string().optional(),
  lCYLu: z.string().optional(),
  lAXISu: z.string().optional(),
  lVISIONu: z.string().optional(),
  lSPHb: z.string().optional(),
  lCYLb: z.string().optional(),
  lAXISb: z.string().optional(),
  lVISIONb: z.string().optional(),
});

export type TUserInfoSchema = z.infer<typeof userInfoSchema>;
