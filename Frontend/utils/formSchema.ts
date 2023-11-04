import * as z from "zod";
import { phoneNumberRegExp, urlRegex } from "./regex";

export const formSignUpSchema = z.object({
  username: z.string().min(6, "Username must contain at least 6 character(s)"),
  email: z
    .string()
    .min(10, "Email must contain at least 10 character(s)")
    .max(30)
    .email(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 character(s)"),
  re_password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 character(s)"),
  telephone: z.string().refine((value) => phoneNumberRegExp.test(value), {
    message: "Invalid phone number",
  }),
  firstName: z.string(),
  lastName: z.string(),
  addressLine: z.string(),
  photos: z.string().refine((value) => urlRegex.test(value), {
    message: "Invalid Url"
  }),
});

export const validationSignUpSchema = z
  .object({
    username: formSignUpSchema.shape.username,
    email: formSignUpSchema.shape.email,
    password: formSignUpSchema.shape.password,
    re_password: formSignUpSchema.shape.re_password,
  })
  .strict()
  .refine((data) => data.password === data.re_password, {
    path: ["re_password"],
    message: "Passwords do not match",
  });

export const formLoginSchema = z.object({
  username: z.string().min(1),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 character(s)"),
});

export const formPersonalSchema = z.object({
  username: formSignUpSchema.shape.username,
  email: formSignUpSchema.shape.email,
  firstName: formSignUpSchema.shape.firstName,
  lastName: formSignUpSchema.shape.lastName,
  addressLine: formSignUpSchema.shape.addressLine,
  telephone: formSignUpSchema.shape.telephone,
  photos: formSignUpSchema.shape.photos
}).strict()

export const formResetPasswordSchema = z.object({
  old_password: formSignUpSchema.shape.password,
  new_password: formSignUpSchema.shape.password,
  re_password: formSignUpSchema.shape.re_password
}).strict().refine((data) => data.new_password === data.re_password, {
  path: ["re_password"],
  message: "Passwords do not match",
})

export const formForgotPasswordSchema = z.object({
  email: formSignUpSchema.shape.email,
  new_password: formSignUpSchema.shape.password,
  re_password: formSignUpSchema.shape.re_password
}).strict().refine((data) => data.new_password === data.re_password, {
  path: ["re_password"],
  message: "Passwords do not match",
})

export const formValidateEmailSchema = z.object({
  email: formSignUpSchema.shape.email,
}).strict()