import prisma from "./client";
import { prismaMock } from "./singleton";

export async function getUsers() {
  console.log("Mock dipanggil", prisma == prismaMock);
  return await prisma.user.findMany();
}
