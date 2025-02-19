import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid2X2, List, Search } from "lucide-react";
import { toast } from "sonner";
import useAxiosInstance from "@/utils/axiosInstance";
import { motion } from "framer-motion";
import { LoadingState } from "@/components/shared/LoadingState";
import Payroll from "@/components/shared/Payroll";

export default function AdminDashboard() {
  const axiosInstance = useAxiosInstance();
  const [view, setView] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await axiosInstance.get("/employees");
      return response.data;
    },
  });

  const fireOrReactivateMutation = useMutation({
    mutationFn: ({ _id, isFired }) =>
      axiosInstance.patch(`/employees/${_id}/fire`, { isFired }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee status updated successfully!");
    },
    onError: (error) =>
      toast.error(
        error.response?.data?.message || "Failed to update employee status"
      ),
  });

  const changeRoleMutation = useMutation({
    mutationFn: ({ _id, role }) =>
      axiosInstance.patch(`/employees/${_id}/change-role`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Role updated successfully!");
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to update role"),
  });

  const updateSalaryMutation = useMutation({
    mutationFn: ({ _id, salary }) =>
      axiosInstance.patch(`/employees/${_id}/update-salary`, { salary }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Salary updated successfully!");
    },
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to update salary"),
  });

  const handleFireOrReactivateEmployee = (_id, isFired) => {
    fireOrReactivateMutation.mutate({ _id, isFired: !isFired });
  };

  const handleRoleChange = (_id, newRole) => {
    changeRoleMutation.mutate({ _id, role: newRole });
  };

  const handleSalaryUpdate = (_id, currentSalary, newSalary) => {
    if (newSalary > currentSalary) {
      updateSalaryMutation.mutate({ _id, salary: newSalary });
    } else {
      toast.error("Salary can only be increased!");
    }
  };

  const filteredEmployees = employees?.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingState />;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Welcome, Admin! Here you can oversee the system and manage roles.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setView(view === "table" ? "grid" : "table")}
                variant="outline"
                className="w-full sm:w-auto"
              >
                {view === "table" ? (
                  <Grid2X2 className="mr-2" />
                ) : (
                  <List className="mr-2" />
                )}
                {view === "table" ? "Grid View" : "Table View"}
              </Button>
            </div>
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {view === "table" ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead className="w-[200px]">Designation</TableHead>
                    <TableHead className="w-[150px]">Role</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[200px]">Salary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees?.map((employee) => (
                    <TableRow key={employee._id}>
                      <TableCell className="font-medium">
                        {employee.name}
                      </TableCell>
                      <TableCell>{employee.designation}</TableCell>
                      <TableCell>
                        <Select
                          value={employee.role || ""}
                          onValueChange={(value) =>
                            handleRoleChange(employee._id, value)
                          }
                          disabled={employee.isFired}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employee">Employee</SelectItem>
                            <SelectItem value="hr">HR</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleFireOrReactivateEmployee(
                              employee._id,
                              employee.isFired
                            )
                          }
                          variant={employee.isFired ? "outline" : "destructive"}
                          size="sm"
                          disabled={fireOrReactivateMutation.isLoading}
                        >
                          {fireOrReactivateMutation.isLoading
                            ? "Processing..."
                            : employee.isFired
                            ? "Reactivate"
                            : "Fire"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            placeholder={`$${employee.salary}`}
                            className="w-24"
                            onChange={(e) =>
                              (employee.newSalary = Number.parseInt(
                                e.target.value
                              ))
                            }
                          />
                          <Button
                            onClick={() =>
                              handleSalaryUpdate(
                                employee._id,
                                employee.salary,
                                employee.newSalary
                              )
                            }
                            size="sm"
                            disabled={updateSalaryMutation.isLoading}
                          >
                            {updateSalaryMutation.isLoading
                              ? "Updating..."
                              : "Update"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEmployees?.map((employee) => (
                <motion.div
                  key={employee._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{employee.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>Designation: {employee.designation}</p>
                      <p>Salary: ${employee.salary}</p>
                      <Select
                        value={employee.role}
                        onValueChange={(value) =>
                          handleRoleChange(employee._id, value)
                        }
                        disabled={employee.isFired}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() =>
                          handleFireOrReactivateEmployee(
                            employee._id,
                            employee.isFired
                          )
                        }
                        variant={employee.isFired ? "outline" : "destructive"}
                        className="w-full"
                        disabled={fireOrReactivateMutation.isLoading}
                      >
                        {fireOrReactivateMutation.isLoading
                          ? "Processing..."
                          : employee.isFired
                          ? "Reactivate"
                          : "Fire"}
                      </Button>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          placeholder={`$${employee.salary}`}
                          className="flex-grow"
                          onChange={(e) =>
                            (employee.newSalary = Number.parseInt(
                              e.target.value
                            ))
                          }
                        />
                        <Button
                          onClick={() =>
                            handleSalaryUpdate(
                              employee._id,
                              employee.salary,
                              employee.newSalary
                            )
                          }
                          disabled={updateSalaryMutation.isLoading}
                        >
                          {updateSalaryMutation.isLoading
                            ? "Updating..."
                            : "Update"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Payroll />
    </div>
  );
}
