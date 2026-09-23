import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.js";

const createCrudRouter = (Model, sort) => {
  const router = Router();

  router.get("/", async (req, res) => {
    res.json(await Model.find().sort(sort));
  });

  router.post("/", ...protect, adminOnly, async (req, res) => {
    res.status(201).json(await Model.create(req.body));
  });

  router.put("/:id", ...protect, adminOnly, async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ message: "খুঁজে পাওয়া যায়নি" });
    }

    res.json(item);
  });

  router.delete("/:id", ...protect, adminOnly, async (req, res) => {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: "মুছে ফেলা হয়েছে" });
  });

  return router;
};

export default createCrudRouter;
