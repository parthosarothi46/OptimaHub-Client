import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useaxiosInstance from "@/utils/axiosInstance";

// Stripe public key
const stripePromise = loadStripe(
  "pk_test_51QmbclAgjwdD8FfG7JTqCDmFY3gSzHpT0xmoL4bi5OBoFNiSzdHLf1PsKW1WuLrIlXZhZglvaw9hCAarTKePGMzc000r6FF6jY"
); // Replace with your own public key

const Payroll = () => {
  const [payrollRequests, setPayrollRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const axiosInstance = useaxiosInstance();

  // Fetch payroll requests
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

      // Remove the paid request from the list
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Payroll Requests</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Salary</th>
            <th className="border border-gray-300 px-4 py-2">Month</th>
            <th className="border border-gray-300 px-4 py-2">Payment Date</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {payrollRequests?.length > 0 ? (
            payrollRequests.map((request) => (
              <tr key={request._id} className="border-b">
                <td className="border border-gray-300 px-4 py-2">
                  {request.employeeName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${request.salary}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.month} {request.year}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.paymentDate || "Pending"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handlePayClick(request)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    disabled={request.status === "Paid"}
                  >
                    {request.status === "Paid" ? "Paid" : "Pay"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No payroll requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedRequest && (
        <Elements stripe={stripePromise}>
          <PaymentModal
            request={selectedRequest}
            onPaymentSuccess={handlePaymentSuccess}
            onClose={() => setIsModalOpen(false)}
          />
        </Elements>
      )}
    </div>
  );
};

const PaymentModal = ({ request, onPaymentSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      alert("Error: " + error.message);
      setIsProcessing(false);
      return;
    }

    // Call backend to complete payment with the token
    const paymentDetails = { token: token.id };

    onPaymentSuccess(paymentDetails);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Confirm Payment</h2>
        <p>
          Are you sure you want to make a payment for {request.employeeName}?
        </p>
        <p className="mt-2">
          <strong>Salary: </strong>${request.salary}
        </p>
        <p className="mt-2">
          <strong>Month/Year: </strong>
          {request.month} {request.year}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="card"
              className="block text-sm font-medium text-gray-700"
            >
              Card Details
            </label>
            <CardElement
              id="card"
              className="mt-2 p-2 border border-gray-300 rounded-md"
              options={{
                hidePostalCode: true, // Hide postal code
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                  },
                },
              }}
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded ${
                isProcessing && "opacity-50"
              }`}
            >
              {isProcessing ? "Processing..." : "Confirm Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payroll;
