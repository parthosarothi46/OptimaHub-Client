import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import useaxiosInstance from "@/utils/axiosInstance";

export function EmployeeDetails({ employee, onClose }) {
  const axiosInstance = useaxiosInstance();
  const { data: details, isLoading } = useQuery({
    queryKey: ["employeeDetails", employee._id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/employees/${employee._id}/details`
      );
      return response.data;
    },
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          {/* DialogTitle is required for screen readers */}
          <DialogTitle>Details for {employee.name}</DialogTitle>

          {/* DialogDescription provides additional accessible information */}
          <DialogDescription>
            Here are the details and salary records for {employee.name}.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        ) : (
          <div className="space-y-4">
            <p>
              <strong>Email:</strong> {details.employee.email}
            </p>
            <p>
              <strong>Designation:</strong> {details.employee.designation}
            </p>
            <p>
              <strong>Bank Account:</strong> {details.employee.bankAccountNo}
            </p>
            <h3 className="text-lg font-semibold">Salary Records:</h3>
            <ul className="space-y-2">
              {details.salaryRecords.map((record) => (
                <li key={record._id}>
                  {formatDate(new Date(record.year, record.month - 1))} - $
                  {record.salary}
                </li>
              ))}
            </ul>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
