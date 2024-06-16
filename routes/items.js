import express from "express";
import cors from "cors";
import {
  addItem,
  deleteItem,
  getItem,
  updateItem,
  getSingleItem,
} from "../controllers/itemsController.js";
import { upload } from "../middlewares/upload.js";
const router = express.Router();

router.use(cors());

router.get("/", getItem);
router.post("/", upload.array("image"), addItem);
router.get("/:id", getSingleItem);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

export default router;
