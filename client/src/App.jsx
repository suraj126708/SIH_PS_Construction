import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import MapboxExample from "./components/MapLocationSelection";
// import Forum from "./pages/Forum";
// import ConstructorAccount from "./pages/ConstructionAcount";
// import HeapMap from "./components/HeapMap";
import Fnew from "./components/fnew";
import Forum from "./pages/Forum.jsx";
import ConstructorAccount from "./pages/ConstructionAcount.jsx";
import MapComponent from "./components/HeapMap.jsx";
import ConstructorForm from "./pages/Constructor.jsx";

function App() {
  return (
    <div className="App">
      {/* <MapboxExample /> */}
      {/* <Forum /> */}
      {/* <ConstructorAccount /> */}
      {/* <HeapMap /> */}
      <Fnew />
      <Router>
        <Routes>
          <Route
            path="/api/constructorprofile/:id"
            element={<ConstructorAccount />}
          />
          <Route path="/api/complaint" element={<Forum />} />
          <Route path="/MapComponent" element={<MapComponent />} />
          <Route path="/api/constructorform" element={<ConstructorForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
