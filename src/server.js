import express from 'express';
import { config } from "dotenv";
import { connectDB, disconnectDB} from "./config/db.js";

//Import routes
import groupsRoutes from "./routes/groupsRoutes.js"

config();
connectDB();

const app = express()

// API Routes
app.use('/groups', groupsRoutes)

app.get('/', (req, res) => {
    res.json({message: "Welcome to the Home Page"})
})

const PORT = 5001;

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    })
})

process.on("uncaughtException", async (err) => {
    console.error(`Error: ${err.message}`);
    await disconnectDB();
    process.exit(1);
})

process.on("SIGTERM", async () => {
    console.error("SIGTERM received");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    })
    
})

// CATEGORIES
// Auth & Users - SignUp, SignIn, Profile, Search Users 
// Groups - Create Group, Get Group Details, Add Member
// Expenses - Add Expense, Get Group Expense, Update Expense, Delete Expense
// Balances - Get Raw Balances, Get Simplified Balances
// Settlements - Record Payment