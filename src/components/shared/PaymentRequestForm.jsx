import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useaxiosInstance from "@/utils/axiosInstance";

export function PaymentRequestForm() {
  const axiosInstance = useaxiosInstance();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    employeeId: "",
    salary: "",
    month: "",
    year: "",
  });

  const createPaymentRequest = useMutation({
    mutationFn: async (data) => {
      await axiosInstance.post("/payroll", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      toast.success("Payment request created.");
      setFormData({ employeeId: "", salary: "", month: "", year: "" });
    },
    onError: () => {
      toast.error("Failed to create payment request.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPaymentRequest.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="employeeId">Employee ID</Label>
        <Input
          id="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={(e) =>
            setFormData({ ...formData, employeeId: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="salary">Salary</Label>
        <Input
          id="salary"
          placeholder="Salary"
          type="number"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="month">Month</Label>
        <Input
          id="month"
          placeholder="Month (1-12)"
          type="number"
          min="1"
          max="12"
          value={formData.month}
          onChange={(e) => setFormData({ ...formData, month: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          placeholder="Year"
          type="number"
          min={new Date().getFullYear()}
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={createPaymentRequest.isLoading}
      >
        {createPaymentRequest.isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Payment Request"
        )}
      </Button>
    </form>
  );
}
