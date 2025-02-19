import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Confirm Payment
          </h2>
          <div className="mb-6">
            <p className="text-gray-600">
              Are you sure you want to make a payment for{" "}
              <span className="font-semibold">{request.employeeName}</span>?
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Salary: </strong>${request.salary}
            </p>
            <p className="text-gray-600">
              <strong>Month/Year: </strong>
              {request.month} {request.year}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="card"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Card Details
              </label>
              <CardElement
                id="card"
                className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                options={{
                  hidePostalCode: true,
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
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-150 ${
                  isProcessing && "opacity-50 cursor-not-allowed"
                }`}
              >
                {isProcessing ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
