import { PrismaClient } from "@prisma/client";

const primsaClientSingleton = () => {
  return new PrismaClient();
};
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? primsaClientSingleton();

export default prisma;

if (process.env !== "production") {
  globalForPrisma.prisma = prisma;
}
