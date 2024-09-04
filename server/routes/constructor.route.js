import {Router} from "express";
import {constructorRouter} from "../controllers/constructor.controller.js";

const router=Router();

router.route("/").post(constructorRouter);



export default router;
