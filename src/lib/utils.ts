import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import ENV from "../../config/ENV";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomNum():number {
  const min = 2000;
  const max = 20000;

  return Math.floor(Math.random() * (max - min) + min);
}

export function bytesToMb(bytes:number):number {
  const MB = 1048576;
  return bytes / MB
} 

export function getUEImageURL(path:string):string{
return `${ENV.SUPABASE_URL}/storage/v1/object/public/${ENV.UE_BUCKET}/${path}`
}