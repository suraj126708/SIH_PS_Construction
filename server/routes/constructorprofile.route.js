import {Router} from "express";
import { constructorProfile } from "../controllers/constructorProfile.controller.js";

const router=Router();

router.route("/:id").get(constructorProfile);



export default router;

