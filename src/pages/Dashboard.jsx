import { useAuth } from "@/context/AuthProvider";
import AdminDashboard from "./AdminDashboard";
import HRDashboard from "./HRDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import useaxiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/shared/LoadingState";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosInstance = useaxiosInstance();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("User email is missing.");
      const response = await axiosInstance.get(`/auth/user/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) return <LoadingState />;

  if (userData?.role === "admin") {
    return <AdminDashboard />;
  }

  if (userData?.role === "hr") {
    return <HRDashboard />;
  }

  if (userData?.role === "employee") {
    return <EmployeeDashboard />;
  }

  // If no valid role, show access denied message
  return <div>Access Denied</div>;
};

export default Dashboard;
