import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Grid2X2, List } from "lucide-react";

export default function AdminDashboard() {
  const [view, setView] = useState("table");
  const queryClient = useQueryClient();

  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery({
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

  if (isLoading) return <div>Loading employees...</div>;
  if (isError)
    return (
      <div>
        Error loading employees.{" "}
        <Button onClick={() => queryClient.invalidateQueries(["employees"])}>
          Retry
        </Button>
      </div>
    );

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Welcome, Admin! Here you can oversee the system and manage roles.
          </p>
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() => setView(view === "table" ? "grid" : "table")}
              variant="outline"
            >
              {view === "table" ? (
                <Grid2X2 className="mr-2" />
              ) : (
                <List className="mr-2" />
              )}
              {view === "table" ? "Grid View" : "Table View"}
            </Button>
          </div>
          {view === "table" ? (
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Fire</TableHead>
                    <TableHead>Salary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee._id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.designation}</TableCell>
                      <TableCell>
                        <Select
                          value={employee.role || ""}
                          onValueChange={(value) =>
                            handleRoleChange(employee._id, value)
                          }
                          disabled={employee.isFired}
                        >
                          <SelectTrigger className="w-[180px]">
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
            </ScrollArea>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <Card key={employee._id}>
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
                          (employee.newSalary = Number.parseInt(e.target.value))
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
