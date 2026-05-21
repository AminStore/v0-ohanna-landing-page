import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ohannaRouter from "./ohanna";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ohannaRouter);

export default router;
