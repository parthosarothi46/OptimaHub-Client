import Mainlayout from "@/layouts/Mainlayout";
import ContactUs from "@/pages/ContactUs";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/pages/Dashboard";
import EmployeeDetail from "@/components/shared/EmployeeDetail";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
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
      <Route path="contact" element={<ContactUs />} />
    </Routes>
  );
};

export default Router;
