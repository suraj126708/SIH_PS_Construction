import { Constructor } from "../models/constructor.model.js"


const constructorRouter=async(req,res)=>{

    try{
        const {username,email,password,projects}=req.body;

        const constructorData= await Constructor.create({
            username,email,password,projects
        });

        return res.status(202)
                  .json({ message: "constructor data saved successfully" });

    }
    catch(error){
        console.log(error);
    }
}

export {constructorRouter};