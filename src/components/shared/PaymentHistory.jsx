import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useaxiosInstance from "@/utils/axiosInstance";

export default function PaymentHistory() {
  const axiosInstance = useaxiosInstance();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentHistory", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get("/payment-history", {
        params: { page: currentPage, limit: 5 },
      });
      return response.data;
    },
    keepPreviousData: true, // Retain previous data while fetching new data
  });

  const handleNextPage = () => {
    if (data && currentPage < (data?.totalPages || 1)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : isError ? (
          <p className="text-red-500">Failed to load payment history.</p>
        ) : data?.data?.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{payment.month}</TableCell>
                    <TableCell>{payment.year}</TableCell>
                    <TableCell>{payment.salary}</TableCell>
                    <TableCell>{payment.transactionId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {data.totalPages || 1}
              </span>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === (data?.totalPages || 1)}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <p>No payment history available.</p>
        )}
      </CardContent>
    </Card>
  );
}
