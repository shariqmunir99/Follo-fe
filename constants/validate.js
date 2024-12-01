import { z } from "zod";


export const signupSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(25, { message: "Username must be less than 25 characters long" }),

  email: z
    .string()
    .email({ message: "Please provide a valid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),

  cpassword: z
    .string()
    .min(8, { message: "Confirm password must be at least 8 characters long" }),
})
  .superRefine((data, ctx) => {
    if (data.password !== data.cpassword) {
      ctx.addIssue({
        path: ['cpassword'],
        message: "Passwords don't match",
        code: z.ZodIssueCode.custom,
      });
    }
  });
  export const signinSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email" }),
  
    password: z
      .string()
      .min(8, { message: "Invalid password" })
      .regex(/[a-zA-Z]/, { message: "Invalid password" })
      .regex(/[0-9]/, { message: "Invalid password" }),
  });
