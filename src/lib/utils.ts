import { jwtDecode } from 'jwt-decode';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TokenPayload } from "@/types/token"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const decodeToken = (token: string): TokenPayload => {
  return jwtDecode<TokenPayload>(token);
};
