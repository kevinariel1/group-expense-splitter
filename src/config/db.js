import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
})

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed");
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log("Database disconnected successfully");
    } catch (error) {
        console.error("Database disconnection failed");
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export { prisma, connectDB, disconnectDB };