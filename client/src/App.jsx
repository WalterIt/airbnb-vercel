import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/auth/Login";
import Layout from "./components/layout/Layout";
import Register from "./pages/auth/Register";
import { UserContextProvider } from "./UserContext";
import axios from "axios";
import Profile from "./pages/Profile";
import Places from "./pages/Places";
import PlacesForm from "./components/form/PlacesForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Place from "./pages/Place";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const url = import.meta.env.VITE_API_IMG_URL;

function App() {
  return (
    <UserContextProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<Place />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/bookings/:id" element={<Booking />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
