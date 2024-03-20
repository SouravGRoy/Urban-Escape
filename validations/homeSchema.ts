import { bytesToMb } from "@/lib/utils";
import * as yup from "yup"

const MAX_FILE_SIZE = 102400; //100KB

const fileTypes = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] as const;
const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName: string): boolean {
  return validFileExtensions["image"].indexOf(fileName.split('.')!.pop()!) > -1;
}

export const homeSchema = yup
  .object({
    title: yup.string().required().min(5).max(50),
    country: yup.string().required().min(5).max(50),
    state: yup.string().required().min(5).max(50),
    city: yup.string().required().min(5).max(50),
    price: yup.number().required().typeError("Amount should be number"),
    categories:
      yup
        .array()
        .of(yup.string())
        .compact()
        .defined()
        .min(1, "You have to select at least one item.")
  })
  .required();

export type AddHomeType = yup.InferType<typeof homeSchema>

