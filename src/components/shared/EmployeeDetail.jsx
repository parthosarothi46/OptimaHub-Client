import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router";
import axiosInstance from "@/utils/axiosInstance";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeDetail = () => {
  const { id } = useParams();
  const [selectedMonth, setSelectedMonth] = useState("");

  // Fetch employee details
  const { data: employee, isLoading: isEmployeeLoading } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/employees/${id}/details`);
      return data;
    },
  });

  // Fetch work records
  const { data: workRecords, isLoading: isWorkRecordsLoading } = useQuery({
    queryKey: ["workRecords", id, selectedMonth],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/hr/work-records", {
        params: { employeeId: id, month: selectedMonth },
      });
      return data;
    },
  });

  // Derived state for total work hours
  const totalWorkHours = useMemo(() => {
    return (
      workRecords?.reduce((sum, record) => sum + record.hoursWorked, 0) || 0
    );
  }, [workRecords]);

  // Chart data for salaries over time
  const chartData = useMemo(() => {
    if (!workRecords) return {};
    return {
      labels: workRecords.map((record) => record.date.slice(0, 7)), // Format as YYYY-MM
      datasets: [
        {
          label: "Work Hours",
          data: workRecords.map((record) => record.hoursWorked),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [workRecords]);

  if (isEmployeeLoading || isWorkRecordsLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{employee?.employee?.name}</h1>
      <div className="mb-6 flex items-center space-x-4">
        <img
          src={employee?.employee?.photo}
          alt={`${employee?.employee?.name}'s Photo`}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p>Designation: {employee?.employee?.designation}</p>
          <p>Email: {employee?.employee?.email}</p>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="month" className="block mb-2 font-medium">
          Filter by Month:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month.toString().padStart(2, "0")}>
              {new Date(0, month - 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold">
          Total Work Hours: {totalWorkHours}
        </h2>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Work Hours Over Time</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default EmployeeDetail;
