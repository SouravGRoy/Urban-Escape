import { bytesToMb } from "@/lib/utils";
import * as yup from "yup"

export const homeSchema = yup
  .object({
    title: yup.string().required().min(5).max(50),
    country: yup.string().required().min(5).max(50),
    state: yup.string().required().min(5).max(50),
    city: yup.string().required().min(5).max(50),
    price: yup.number().required().typeError("Amount should be number"),
    description: yup.string().required().min(10).max(20000),
    categories: yup.mixed<Array<string> | []>()
    .test("categories" , "Please select at least one category",(data:any)=>{const isValid = data?.length >= 1 
    return isValid;
    }),
    image: yup.mixed().test("image", "Only JPEG , PNG , WEBP images are allowed", (file:any)=>{
        const isValid = file?.type == "image/jpeg" || file?.type == "image/png" || file?.type == "image/webp"
        return isValid
    })
    .test("imageSize", "Image must be less than 2 MB",(file:any)=>{
        const isValid = bytesToMb(file?.size) <= 2
        return isValid
    }),
  })
  .required();

  export type AddHomeType = yup.InferType<typeof homeSchema>
