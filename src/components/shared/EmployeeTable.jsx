import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router";

const EmployeeTable = ({ employees, onToggleVerify, onPayClick }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead className="w-[100px]">Verified</TableHead>
            <TableHead className="w-[150px]">Bank Account</TableHead>
            <TableHead className="w-[100px]">Salary</TableHead>
            <TableHead className="w-[100px]">Pay</TableHead>
            <TableHead className="w-[100px]">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees?.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>
                <Button
                  variant={employee.isVerified ? "default" : "destructive"}
                  size="sm"
                  onClick={() => onToggleVerify(employee._id)}
                >
                  {employee.isVerified ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
              <TableCell>{employee.bankAccountNo}</TableCell>
              <TableCell>${employee.salary}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPayClick(employee)}
                  disabled={!employee.isVerified}
                >
                  Pay Request
                </Button>
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
    </div>
  );
};

export default EmployeeTable;
