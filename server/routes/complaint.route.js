import {Router} from "express";
import {complaintByUser} from "../controllers/complaint.controller.js";

const router=Router();

router.route("/").post(complaintByUser);



export default router;

