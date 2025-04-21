import { usuarios } from "@prisma/client";

export type User = Omit<usuarios, "password" | "createdAt">;