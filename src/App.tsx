import "./App.css";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Login from "./Pages/Login/Login";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Register from "./Pages/Register/Register";
import Users from "./Pages/Users/Users";
import Base from "./Pages/Dashboard/Base";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Profile/profile";
import Cars from "./Pages/Cars/Cars";
import Notifications from "./Pages/Notifications/Notifications";
import Rentals from "./Pages/Rentals/Rentals";
import MyCars from "./Pages/Cars/MyCars";
import Damages from "./Pages/Damages/Damages";
import DamagesList from "./Pages/Damages/AdminDamages";
import Offers from './Pages/Offers/Offers';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="App">
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/" element={<Base />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/mycars" element={<MyCars />} />
              <Route path="/damages" element={<Damages />} />
              <Route path="/alldamages" element={<DamagesList />} />
              <Route path="/offers" element={<Offers />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AnimatePresence>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
