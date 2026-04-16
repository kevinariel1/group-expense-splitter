import express from "express";

const router = express.Router();

router.get('/list', (req, res) => {
    res.json({message: "This is the group list"})  
});

export default router;