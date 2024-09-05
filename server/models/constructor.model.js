import mongoose from 'mongoose';

// Define the schema for project boundaries
const ProjectBoundarySchema = new mongoose.Schema({
  latitude1: {
    type: Number,
    required: true
  },
  longitude1: {
    type: Number,
    required: true
  },
  latitude2: {
    type: Number,
    required: true
  },
  longitude2: {
    type: Number,
    required: true
  }
});

// Define the schema for individual projects
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    required: true
  },
  boundaries: {
    type: ProjectBoundarySchema,
    required: true
  }
});

// Define the schema for constructor details with embedded projects
const ConstructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  projects: [ProjectSchema], // Use the ProjectSchema
  complaints: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint' // Reference to the Complaint model
  }]
});

// Create the model from the schema
export const Constructor = mongoose.model('Constructor', ConstructorSchema);
