import { Constructor } from "../models/constructor.model.js";

const constructorRouter = async (req, res) => {
  try {
    const { name, email, password, projects } = req.body;

    // Create a new constructor document in MongoDB
    const constructorData = await Constructor.create({
      name,
      email,
      password,
      projects
    });

    // Send a success response
    return res.status(202).json({ message: "Constructor data saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error saving constructor data" });
  }
};

export { constructorRouter };
