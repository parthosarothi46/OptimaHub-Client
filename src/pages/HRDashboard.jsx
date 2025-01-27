import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router";

const HRDashboard = () => {
  const queryClient = useQueryClient();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({ month: "", year: "" });
  const [filters, setFilters] = useState({ employeeId: "", month: "" });

  // Fetch employees from API
  const fetchEmployees = async () => {
    const { data } = await axiosInstance.get("/employees");
    return data;
  };

  // Fetch work records from API
  const fetchWorkRecords = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const { data } = await axiosInstance.get("/hr/work-records", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  };

  // Fetch employees and work records using react-query
  const { data: employees, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const { data: workRecords, isLoading: isLoadingWorkRecords } = useQuery({
    queryKey: ["workRecords"],
    queryFn: fetchWorkRecords,
  });

  // Toggle employee verification status
  const toggleVerifiedStatus = useMutation({
    mutationFn: async (employeeId) => {
      await axiosInstance.patch(`/employees/${employeeId}/toggle-verify`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // Create payment request for employee
  const createPaymentRequest = useMutation({
    mutationFn: async ({ employeeId, month, year, salary }) => {
      await axiosInstance.post(`/payroll`, {
        employeeId,
        month,
        year,
        salary,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // Handle clicking pay button
  const handlePayClick = (employee) => {
    setSelectedEmployee(employee);
  };

  // Handle form submission for payment request
  const handlePaymentSubmit = () => {
    if (selectedEmployee) {
      createPaymentRequest.mutate({
        employeeId: selectedEmployee._id,
        month: paymentDetails.month,
        year: paymentDetails.year,
        salary: selectedEmployee.salary,
      });
    }
  };

  // Filter work records based on selected filters
  const filteredWorkRecords = workRecords?.filter((record) => {
    const matchesEmployee =
      !filters.employeeId || record.employeeId === filters.employeeId;
    const matchesMonth =
      !filters.month ||
      new Date(record.date).toLocaleString("default", { month: "long" }) ===
        filters.month;

    return matchesEmployee && matchesMonth;
  });

  if (isLoadingEmployees || isLoadingWorkRecords) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">HR Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Bank Account</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Pay</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>
                      <Button
                        variant={
                          employee.isVerified ? "default" : "destructive"
                        }
                        size="sm"
                        onClick={() =>
                          toggleVerifiedStatus.mutate(employee._id)
                        }
                      >
                        {employee.isVerified ? "✅" : "❌"}
                      </Button>
                    </TableCell>
                    <TableCell>{employee.bankAccount}</TableCell>
                    <TableCell>${employee.salary}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePayClick(employee)}
                            disabled={!employee.isVerified}
                          >
                            Pay
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create Payment Request</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="month" className="text-right">
                                Month
                              </Label>
                              <Input
                                id="month"
                                value={paymentDetails.month}
                                onChange={(e) =>
                                  setPaymentDetails({
                                    ...paymentDetails,
                                    month: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="year" className="text-right">
                                Year
                              </Label>
                              <Input
                                id="year"
                                type="number"
                                value={paymentDetails.year}
                                onChange={(e) =>
                                  setPaymentDetails({
                                    ...paymentDetails,
                                    year: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <Button onClick={handlePaymentSubmit}>
                            Submit Payment
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <Link to={`/employee/${employee._id}`}>
                        <Button variant="secondary" size="sm">
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Record Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <Select
              value={filters.employeeId}
              onValueChange={(value) =>
                setFilters({ ...filters, employeeId: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map((employee) => (
                  <SelectItem key={employee._id} value={employee._id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.month}
              onValueChange={(value) =>
                setFilters({ ...filters, month: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Hours Worked</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkRecords?.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>{record.employeeId}</TableCell>
                    <TableCell>{record.task}</TableCell>
                    <TableCell>{record.hoursWorked}</TableCell>
                    <TableCell>
                      {new Date(record.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRDashboard;
