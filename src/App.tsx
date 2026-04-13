import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "leaflet/dist/leaflet.css";
import Login from "./Pages/Login";
import SelectLocation from "./component/SelectLocation";
function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/select-location' element={<SelectLocation />} />
      </Routes>
    </>
  );
}

export default App;