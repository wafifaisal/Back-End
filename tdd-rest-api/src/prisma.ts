import { PrismaClient } from "@prisma/client";

export default new PrismaClient({ log: ["query", "info", "error", "warn"] });
