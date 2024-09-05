import { Constructor } from "../models/constructor.model.js"; // Adjust the path as needed
import { Complaint } from "../models/complaint.model.js"; // Adjust the path as needed

const checkComplaintLocation = async (complaintId) => {
  try {
    // Fetch the complaint
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) throw new Error('Complaint not found');
    console.log("This is a complaint");

    // Extract latitude and longitude from the nested location field
    const { lat: latitude, lng: longitude } = complaint.location;
    const { image } = complaint; // Assuming image field exists in the complaint model
    console.log(`Latitude: ${latitude} Longitude: ${longitude}`);

    // Fetch all constructors and their projects
    const constructors = await Constructor.find();

    let matchedConstructors = [];

    // Check each constructor's projects
    for (const constructor of constructors) {
      let hasMatchedProject = false;

      for (const project of constructor.projects) {
        const { latitude1, longitude1, latitude2, longitude2 } = project.boundaries;

        // Check if the complaint coordinates are within the project boundaries
        if (
          latitude >= Math.min(latitude1, latitude2) &&
          latitude <= Math.max(latitude1, latitude2) &&
          longitude >= Math.min(longitude1, longitude2) &&
          longitude <= Math.max(longitude1, longitude2)
        ) {
          // Add the complaint ID to the constructor's profile
          await Constructor.findByIdAndUpdate(
            constructor._id,
            { $push: { complaints: complaintId } } // Add only complaint ID
          );
          hasMatchedProject = true;
        }
      }

      if (hasMatchedProject) {
        matchedConstructors.push(constructor._id);
        console.log(`Constructor with ID ${constructor._id} matched`);
      }
    }

    if (matchedConstructors.length === 0) {
      console.log('No constructor project matched the complaint coordinates');
    } else {
      console.log(`Matched constructors: ${matchedConstructors}`);
    }

  } catch (error) {
    console.error('Error checking complaint location', error);
  }
};

export { checkComplaintLocation };
