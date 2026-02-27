import express from "express";

const router = express.Router();

router.get("/sign-up", (req, res) => {
    res.send("This is sign up route")
});

export default router;
