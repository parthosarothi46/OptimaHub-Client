import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@/utils/axiosInstance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useParams } from "react-router";

const EmployeeDetail = () => {
  const axiosInstance = useAxiosInstance();
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

  // Chart data for work hours over time
  const chartData = useMemo(() => {
    if (!workRecords) return [];
    return workRecords.map((record) => ({
      date: new Date(record.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      hours: record.hoursWorked,
    }));
  }, [workRecords]);

  if (isEmployeeLoading || isWorkRecordsLoading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-12 w-[250px]" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            {employee?.employee?.name}
          </CardTitle>
          <Badge variant="outline">{employee?.employee?.designation}</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={employee?.employee?.photo}
                alt={`${employee?.employee?.name}'s Photo`}
              />
              <AvatarFallback>
                {employee?.employee?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {employee?.employee?.email}
              </p>
              <p>
                <strong>Salary:</strong> ${employee?.employee?.salary}
              </p>
              <p>
                <strong>Bank Account:</strong> {employee?.employee?.bankAccount}
              </p>
              <p>
                <strong>Verified:</strong>{" "}
                {employee?.employee?.isVerified ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
            <div>
              <h2 className="text-lg font-bold">
                Total Work Hours: {totalWorkHours}
              </h2>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="00">All Months</SelectItem>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <SelectItem
                    key={month}
                    value={month.toString().padStart(2, "0")}
                  >
                    {new Date(0, month - 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ChartContainer
            config={{
              hours: {
                label: "Work Hours",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="hours"
                  fill="var(--color-hours)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDetail;
