import { motion } from "framer-motion";

const PayrollTable = ({ payrollRequests, handlePayClick }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Month
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Payment Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {payrollRequests?.length > 0 ? (
            payrollRequests.map((request, index) => (
              <motion.tr
                key={request._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    {request.employeeName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm ">${request.salary}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm ">
                    {request.month} {request.year}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    {request.paymentDate || "Pending"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handlePayClick(request)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      request.status === "Paid"
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={request.status === "Paid"}
                  >
                    {request.status === "Paid" ? "Paid" : "Pay"}
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center">
                No payroll requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollTable;
