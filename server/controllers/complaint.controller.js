import { Complaint } from "../models/complaint.model.js";
import { checkComplaintLocation } from "../utils/checkComplaintLocation.utils.js"; // Import the function

const complaintByUser = async (req, res) => {
  try {
    const { location, image, complaint } = req.body;

    // Create the complaint object
    const complaintData = {
      location, 
      image,
      complaint,
      latitude: location.latitude, // Ensure you have these fields in your request body
      longitude: location.longitude
    };

    // Save the complaint to the database
    const newComplaint = await Complaint.create(complaintData);

    // Check the complaint location and link it to constructor projects
    await checkComplaintLocation(newComplaint._id);

    // Respond with success message
    return res.status(201).json({ message: "Complaint saved and processed successfully" });

  } catch (error) {
    console.error('Error saving complaint', error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export { complaintByUser };
