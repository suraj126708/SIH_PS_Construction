import { Complaint } from "../models/complaint.model.js";


const complaintByUser=async(req,res)=>{

    try{
        const {location,image,complaint}=req.body;
        const Complaintsave= await Complaint.create({
            location,image,complaint
        });

        return res.status(201)
                  .json({ message: "complaint saved successfully" });


    }
    catch(error){
        console.log(error);
    }
}

export {complaintByUser};