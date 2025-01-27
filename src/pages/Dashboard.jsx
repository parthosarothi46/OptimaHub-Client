import { useAuth } from "@/context/AuthProvider";
import AdminDashboard from "./AdminDashboard";
import HRDashboard from "./HRDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

const Dashboard = () => {
  const { user } = useAuth(); // Get user data from context

  // Check the role of the user
  if (user?.role === "admin") {
    return <AdminDashboard />;
  }

  if (user?.role === "hr") {
    return <HRDashboard />;
  }

  if (user?.role === "employee") {
    return <EmployeeDashboard />;
  }

  return <div>Access Denied</div>; // If no valid role, show access denied message
};

export default Dashboard;
