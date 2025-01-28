import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { EmployeeDetails } from "./EmployeeDetails";
import useaxiosInstance from "@/utils/axiosInstance";

const axiosInstance = useaxiosInstance();

// Fetch all employees
const fetchEmployees = async () => {
  const response = await axiosInstance.get("/employees");
  return response.data;
};

export function EmployeeList() {
  const queryClient = useQueryClient();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Query to fetch employees
  const {
    data: employees = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    onError: (err) => {
      toast.error("Failed to load employees.");
    },
  });

  // Mutation to toggle verification status of an employee
  const toggleVerification = useMutation({
    mutationFn: async (id) => {
      await axiosInstance.patch(`/employees/${id}/toggle-verify`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      toast.success("Verification status updated.");
    },
    onError: () => {
      toast.error("Failed to update status.");
    },
  });

  // Loading state
  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

  // Error handling for fetchEmployees query
  if (isError) return <div>Error loading employees: {error.message}</div>;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.isVerified ? "Yes" : "No"}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => toggleVerification.mutate(employee._id)}
                    variant="outline"
                    size="sm"
                    disabled={toggleVerification.isLoading}
                  >
                    {toggleVerification.isLoading
                      ? "Processing..."
                      : employee.isVerified
                      ? "Unverify"
                      : "Verify"}
                  </Button>
                  <Button
                    onClick={() => setSelectedEmployee(employee)}
                    variant="outline"
                    size="sm"
                  >
                    View Details
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Display Employee Details modal */}
      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
