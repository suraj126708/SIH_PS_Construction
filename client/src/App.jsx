import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import MapboxExample from "./components/MapLocationSelection";
import Forum from "./pages/Forum.jsx";
import ConstructorAccount from "./pages/ConstructionAcount.jsx";
import MapComponent from "./components/HeapMap.jsx";
import ConstructorForm from "./pages/Constructor.jsx";
import HeroPage from "./pages/HeroPage.jsx";

function App() {
  return (
    <div className="App">
      {/* <MapboxExample /> */}
      {/* <Forum /> */}
      <Router>
        <Routes>
          <Route
            path="/api/constructorprofile/:id"
            element={<ConstructorAccount />}
          />
          <Route path="/api/complaint" element={<Forum />} />
          <Route path="/MapComponent" element={<MapComponent />} />
          <Route path="/api/constructorform" element={<ConstructorForm />} />
          <Route path="/" element={<HeroPage />} />

          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
