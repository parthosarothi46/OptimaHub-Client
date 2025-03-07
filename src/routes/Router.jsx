import Mainlayout from "@/layouts/Mainlayout";
import ContactUs from "@/pages/ContactUs";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/pages/Dashboard";
import EmployeeDetail from "@/components/shared/EmployeeDetail";
import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import MyProfile from "@/pages/MyProfile";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="profile" element={<MyProfile />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee/:id"
          element={
            <PrivateRoute>
              <EmployeeDetail />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
