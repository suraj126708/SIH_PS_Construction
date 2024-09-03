import {Router} from "express";
import {complaintByUser} from "../controllers/complaint.controller.js";

const router=Router();

router.route("/constructor").post(complaintByUser);



export default router;
