import * as yup from "yup"

// Sign up schema 
export const registerSchema = yup
  .object({
    name: yup.string().required().min(3).max(50),
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(30),
    password_confirmation: yup.string().oneOf([yup.ref("password")], "Confirm Password must match").required(),
  })
  .required();
  
  export type RegisterType = yup.InferType<typeof registerSchema>

// Login schema

export const LoginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(30),
  })
  .required();
  
  export type LoginType = yup.InferType<typeof LoginSchema>

