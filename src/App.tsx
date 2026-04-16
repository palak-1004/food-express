import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "leaflet/dist/leaflet.css";
import Login from "./Pages/Login";
import SelectLocation from "./component/SelectLocation";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import HelpPage from "./Pages/HelpPage";
import CategoryFiltered from "./Pages/CategoryFiltered";
import RestaurantDetail from "./Pages/RestaurantDetail";
import CartPopup from "./component/CartPopup";

function App() {
  return (
    <>
      <CartPopup />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/select-location' element={<SelectLocation />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/help' element={<HelpPage />} />
        <Route path='/category/:categoryName' element={<CategoryFiltered />} />
        <Route path='/restaurant/:id' element={<RestaurantDetail />} />
      </Routes>
    </>
  );
}

export default App;