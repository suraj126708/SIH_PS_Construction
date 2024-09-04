import { Constructor } from "../models/constructor.model.js"; // Adjust the path as needed
import { Complaint } from "../models/complaint.model.js"; // Adjust the path as needed

const checkComplaintLocation = async (complaintId) => {
  try {
    // Fetch the complaint
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) throw new Error('Complaint not found');

    // Extract latitude and longitude from the nested location field
    const { lat: latitude, lng: longitude } = complaint.location;
    console.log(`latitude: ${latitude} longitude: ${longitude}`);

    // Fetch all constructors and their projects
    const constructors = await Constructor.find();

    let matched = false;

    // Check each constructor's projects
    for (const constructor of constructors) {
      for (const project of constructor.projects) {
        const { latitude1, longitude1, latitude2, longitude2 } = project.boundaries;

        // Check if the complaint coordinates are within the project boundaries
        if (
          latitude >= Math.min(latitude1, latitude2) &&
          latitude <= Math.max(latitude1, latitude2) &&
          longitude >= Math.min(longitude1, longitude2) &&
          longitude <= Math.max(longitude1, longitude2)
        ) {
          // Add the complaint to the constructor's profile
          await Constructor.findByIdAndUpdate(
            constructor._id,
            { $push: { complaints: complaintId } } // Add complaint ID to constructor profile
          );
          matched = true;
          break;
        }
      }
      if (matched) {
        console.log("constructor matched");
        break ;
      } // Exit outer loop if a match is found
    }

    if (!matched) {
      console.log('No constructor project matched the complaint coordinates');
    }

  } catch (error) {
    console.error('Error checking complaint location', error);
  }
};

export { checkComplaintLocation };
