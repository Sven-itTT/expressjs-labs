import express from "express";

const router = express.Router();

const orders = [];

router.get("/", (req, res) => {
  res.json(orders);
});

router.get("/:id", (req, res) => {
  res.status(404).json({ message: "Order not found" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "POST route: order creation" });
});

router.patch("/:id", (req, res) => {
  res.status(404).json({ message: "Order not found" });
});

export default router;
