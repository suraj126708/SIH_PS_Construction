import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MapboxExample from "./components/MapLocationSelection";
<<<<<<< HEAD
// import Forum from "./pages/Forum";
// import ConstructorAccount from "./pages/ConstructionAcount";
// import HeapMap from "./components/HeapMap";
import Fnew from "./components/fnew";

=======
import Forum from "./pages/Forum.jsx";
import ConstructorAccount from "./pages/ConstructionAcount.jsx";
import MapComponent from "./components/HeapMap.jsx";
import ConstructorForm from "./pages/Constructor.jsx";
>>>>>>> c535e779701f559d0730cc9dc1d93f5ce95a9446
function App() {
  return (
    <div className="App">
      {/* <MapboxExample /> */}
      {/* <Forum /> */}
<<<<<<< HEAD
      {/* <ConstructorAccount /> */}
      {/* <HeapMap /> */}
      <Fnew />
=======
      <Router>
      <Routes>
        <Route path="/api/constructorprofile/:id" element={<ConstructorAccount />} />
        <Route path="/api/complaint" element={<Forum />} />
        <Route path="/MapComponent" element={<MapComponent />} />
        <Route path="/api/constructorform" element={<ConstructorForm/>} />

        {/* Add other routes as needed */}
      </Routes>
    </Router>

>>>>>>> c535e779701f559d0730cc9dc1d93f5ce95a9446
    </div>
  );
}

export default App;
