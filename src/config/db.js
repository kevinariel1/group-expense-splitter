import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

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