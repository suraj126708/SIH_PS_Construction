// src/components/ConstructorForm.js

import React, { useState } from 'react';
import axios from 'axios';

const ConstructorForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [projects, setProjects] = useState([
    { name: '', status: 'ongoing', boundaries: { latitude1: '', longitude1: '', latitude2: '', longitude2: '' } }
  ]);
  const [message, setMessage] = useState('');

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const handleBoundaryChange = (index, boundary, value) => {
    const newProjects = [...projects];
    newProjects[index].boundaries[boundary] = value;
    setProjects(newProjects);
  };

  const handleAddProject = () => {
    setProjects([...projects, { name: '', status: 'ongoing', boundaries: { latitude1: '', longitude1: '', latitude2: '', longitude2: '' } }]);
  };

  const handleDeleteProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/constructors', {
        name,
        email,
        password,
        projects
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting constructor data', error);
      setMessage('Error saving constructor data');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Constructor Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-medium">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-medium">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="password" className="text-lg font-medium">Password:</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12l3-3m0 0l-3-3m3 3H6M2.5 12C4 8 6.9 6 12 6c3.2 0 5.8 2.2 6.9 4m-8 6c-1.4-1.7-2.5-3.3-3.4-4.7m7.9 2.6c.7-.6 1.4-1.2 2-1.8M12 12c-.8-.8-1.6-1.6-2.6-2.2M15 12l-3 3m0 0l3 3m-3-3H6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.5 12C3 8 5.9 6 11 6c3.2 0 5.8 2.2 6.9 4m-8 6c-1.4-1.7-2.5-3.3-3.4-4.7m7.9 2.6c.7-.6 1.4-1.2 2-1.8M12 12c-.8-.8-1.6-1.6-2.6-2.2M15 12l-3 3m0 0l3 3m-3-3H6" />
              </svg>
            )}
          </button>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className="border border-gray-300 p-4 mb-4 rounded relative">
              <button
                type="button"
                onClick={() => handleDeleteProject(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <div className="flex flex-col mb-2">
                <label htmlFor={`projectName-${index}`} className="font-medium">Project Name:</label>
                <input
                  id={`projectName-${index}`}
                  type="text"
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor={`status-${index}`} className="font-medium">Status:</label>
                <select
                  id={`status-${index}`}
                  value={project.status}
                  onChange={(e) => handleProjectChange(index, 'status', e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="flex flex-col">
                  <label htmlFor={`latitude1-${index}`} className="font-medium">Boundary Latitude 1:</label>
                  <input
                    id={`latitude1-${index}`}
                    type="number"
                    value={project.boundaries.latitude1}
                    onChange={(e) => handleBoundaryChange(index, 'latitude1', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`longitude1-${index}`} className="font-medium">Boundary Longitude 1:</label>
                  <input
                    id={`longitude1-${index}`}
                    type="number"
                    value={project.boundaries.longitude1}
                    onChange={(e) => handleBoundaryChange(index, 'longitude1', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`latitude2-${index}`} className="font-medium">Boundary Latitude 2:</label>
                  <input
                    id={`latitude2-${index}`}
                    type="number"
                    value={project.boundaries.latitude2}
                    onChange={(e) => handleBoundaryChange(index, 'latitude2', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`longitude2-${index}`} className="font-medium">Boundary Longitude 2:</label>
                  <input
                    id={`longitude2-${index}`}
                    type="number"
                    value={project.boundaries.longitude2}
                    onChange={(e) => handleBoundaryChange(index, 'longitude2', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProject}
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Another Project
          </button>
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-lg font-medium">{message}</p>}
    </div>
  );
};

export default ConstructorForm;
