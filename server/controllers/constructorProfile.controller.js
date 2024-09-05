import { Constructor } from "../models/constructor.model.js"; // Adjust the path as needed
import { Complaint } from "../models/complaint.model.js";

// Fetch constructor details by id
export const constructorProfile = async (req, res) => {
  try {
    // Find the constructor by ID and populate the complaints field
    const constructor = await Constructor.findById(req.params.id).populate('complaints'); 
    
    if (!constructor) {
      return res.status(404).json({ message: 'Constructor not found' });
    }
    
    // Send the constructor data along with populated complaints
    res.json({
      constructor,
      complaints: constructor.complaints
    });
    console.log(constructor.complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
