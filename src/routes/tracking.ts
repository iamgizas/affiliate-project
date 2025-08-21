import { Router } from "express";
import { trackClick, trackSale } from "../controllers/trackingController";

const router = Router()

router.post("/click", trackClick)
router.post("/sale", trackSale)

export default router