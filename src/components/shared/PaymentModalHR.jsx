import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PaymentModalHR = ({
  isOpen,
  onClose,
  employee,
  paymentDetails,
  setPaymentDetails,
  onSubmit,
}) => {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Payment Request for {employee.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="month" className="text-right">
              Month
            </Label>
            <Select
              value={paymentDetails.month}
              onValueChange={(value) =>
                setPaymentDetails({ ...paymentDetails, month: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">
              Year
            </Label>
            <Input
              id="year"
              type="number"
              value={paymentDetails.year}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, year: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={onSubmit}>Submit Payment</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModalHR;
