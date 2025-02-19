import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAxiosInstance from "@/utils/axiosInstance";
import { motion } from "framer-motion";
import PayrollTable from "./PayrollTable";
import PaymentModal from "./PaymentModal";

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);

export default function Payroll() {
  const [payrollRequests, setPayrollRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const axiosInstance = useAxiosInstance();

  const { data, isLoading } = useQuery({
    queryKey: ["payrollRequests"],
    queryFn: async () => {
      const response = await axiosInstance.get("/payroll-requests");
      return response.data;
    },
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      setPayrollRequests(data);
    }
  }, [data]);

  const handlePayClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    const { employeeId, salary, month, year } = selectedRequest;
    try {
      await axiosInstance.post("/payroll-payment", {
        employeeId,
        salary,
        month,
        year,
        paymentDetails,
      });

      setPayrollRequests((prev) =>
        prev.filter(
          (request) =>
            !(
              request.employeeId === employeeId &&
              request.month === month &&
              request.year === year
            )
        )
      );

      setIsModalOpen(false);
      alert("Payment Successful!");
    } catch (error) {
      alert("Payment failed. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 sm:p-6 lg:p-8"
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center">
        Payroll Dashboard
      </h1>
      <PayrollTable
        payrollRequests={payrollRequests}
        handlePayClick={handlePayClick}
      />
      {isModalOpen && selectedRequest && (
        <Elements stripe={stripePromise}>
          <PaymentModal
            request={selectedRequest}
            onPaymentSuccess={handlePaymentSuccess}
            onClose={() => setIsModalOpen(false)}
          />
        </Elements>
      )}
    </motion.div>
  );
}
