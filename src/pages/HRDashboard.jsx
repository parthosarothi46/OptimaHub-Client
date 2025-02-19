import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useAxiosInstance from "@/utils/axiosInstance";
import { LoadingState } from "@/components/shared/LoadingState";
import { motion } from "framer-motion";
import EmployeeTable from "@/components/shared/EmployeeTable";
import WorkRecordTable from "@/components/shared/WorkRecordTable";
import PaymentModalHR from "@/components/shared/PaymentModalHR";

export default function HRDashboard() {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({ month: "", year: "" });
  const [filters, setFilters] = useState({ employeeId: "", month: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    setPaymentDetails({
      month: currentDate.toLocaleString("default", { month: "long" }),
      year: currentDate.getFullYear().toString(),
    });
  }, []);

  const { data: employees, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/hr/employees");
      return data;
    },
  });

  const {
    data: workRecords,
    isLoading: isLoadingWorkRecords,
    error: workRecordsError,
  } = useQuery({
    queryKey: ["workRecords"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/hr/work-records");
      return data;
    },
  });

  const toggleVerifiedStatus = useMutation({
    mutationFn: async (employeeId) => {
      await axiosInstance.patch(`/employees/${employeeId}/toggle-verify`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

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
      setIsPaymentModalOpen(false);
    },
  });

  const handlePayClick = (employee) => {
    setSelectedEmployee(employee);
    setIsPaymentModalOpen(true);
  };

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

  const filteredEmployees = employees?.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWorkRecords = workRecords?.filter((record) => {
    const matchesEmployee =
      !filters.employeeId || record.employeeId === filters.employeeId;
    const matchesMonth =
      !filters.month ||
      new Date(record.date).toLocaleString("default", { month: "long" }) ===
        filters.month;
    return matchesEmployee && matchesMonth;
  });

  if (isLoadingEmployees || isLoadingWorkRecords) return <LoadingState />;

  if (workRecordsError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load work records: {workRecordsError.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">HR Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Manage employees and track work record progress efficiently.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="employees">Employee Management</TabsTrigger>
          <TabsTrigger value="workrecords">Work Record Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Employee Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 relative">
                <Input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <EmployeeTable
                employees={filteredEmployees}
                onToggleVerify={(id) => toggleVerifiedStatus.mutate(id)}
                onPayClick={handlePayClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="workrecords">
          <Card>
            <CardHeader>
              <CardTitle>Work Record Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkRecordTable
                workRecords={filteredWorkRecords}
                employees={employees}
                filters={filters}
                setFilters={setFilters}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <PaymentModalHR
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        employee={selectedEmployee}
        paymentDetails={paymentDetails}
        setPaymentDetails={setPaymentDetails}
        onSubmit={handlePaymentSubmit}
      />
    </div>
  );
}
