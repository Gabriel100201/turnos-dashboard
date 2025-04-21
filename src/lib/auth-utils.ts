import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'SECRET_KEY');

export async function getSession() {
  try {
    const token = (await cookies()).get("session-token")?.value;
    if (!token) return null;

    const verified = await jwtVerify(token, JWT_SECRET).catch(() => null);
    if (!verified || !verified.payload) return null;

    const payload = verified.payload;
    if (typeof payload.id !== 'number') return null;

    const user = await prisma.usuarios.findUnique({
      where: { id: payload.id },
      select: { id: true, mail: true, nombre: true },
    });

    if (!user) return null;

    return {
      user,
      expires: new Date((payload.exp as number) * 1000),
    };
  } catch (error) {
    console.log("Error en getSession:", error);
    return null;
  }
}
