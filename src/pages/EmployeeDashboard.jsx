import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { CalendarIcon, Loader2, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import PaymentHistory from "@/components/shared/PaymentHistory";
import useaxiosInstance from "@/utils/axiosInstance";

const taskOptions = [
  { value: "Sales", label: "Sales" },
  { value: "Support", label: "Support" },
  { value: "Content", label: "Content" },
  { value: "Paper-work", label: "Paper Work" },
];

export default function EmployeeDashboard() {
  const axiosInstance = useaxiosInstance();
  const [form, setForm] = useState({
    task: "Sales",
    hoursWorked: "",
    date: new Date(),
  });
  const [editData, setEditData] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: workRecords = [], isLoading } = useQuery({
    queryKey: ["workRecords"],
    queryFn: async () => {
      const response = await axiosInstance.get("/work-records");
      return response.data;
    },
  });

  const addTaskMutation = useMutation({
    mutationFn: (newTask) => axiosInstance.post("/work-records", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workRecords"] });
      setForm({ task: "Sales", hoursWorked: "", date: new Date() });
      toast.success("Task added successfully");
    },
    onError: () => {
      toast.error("Failed to add task");
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: (updatedTask) =>
      axiosInstance.put(`/work-records/${editData?._id}`, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workRecords"] });
      setSheetOpen(false);
      setEditData(null);
      toast.success("Task updated successfully");
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/work-records/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workRecords"] });
      toast.success("Task deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!form.hoursWorked || isNaN(Number(form.hoursWorked))) {
      toast.error("Please enter valid hours worked");
      return;
    }
    addTaskMutation.mutate({
      ...form,
      date: form.date.toISOString(),
    });
  };

  const handleEditTask = (task) => {
    setEditData({ ...task, date: new Date(task.date).toISOString() });
    setSheetOpen(true);
  };

  const handleUpdateTask = () => {
    if (!editData?.hoursWorked || isNaN(Number(editData.hoursWorked))) {
      toast.error("Please enter valid hours worked");
      return;
    }
    editTaskMutation.mutate(editData);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Work Sheet</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAddTask}
            className="grid gap-6 mb-6 md:grid-cols-4"
          >
            <div className="space-y-2">
              <Label htmlFor="task">Task Type</Label>
              <Select
                value={form.task}
                onValueChange={(value) => setForm({ ...form, task: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  {taskOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Hours Worked</Label>
              <Input
                id="hours"
                type="number"
                placeholder="Hours Worked"
                value={form.hoursWorked}
                onChange={(e) =>
                  setForm({ ...form, hoursWorked: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(form.date)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.date}
                    onSelect={(date) => date && setForm({ ...form, date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button
                type="submit"
                className="w-full"
                disabled={addTaskMutation.isPending}
              >
                {addTaskMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Task
              </Button>
            </div>
          </form>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workRecords.map((record) => (
                    <TableRow key={record._id}>
                      <TableCell>{record.task}</TableCell>
                      <TableCell>{record.hoursWorked}</TableCell>
                      <TableCell>{formatDate(new Date(record.date))}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditTask(record)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              deleteTaskMutation.mutate(record._id)
                            }
                            disabled={deleteTaskMutation.isPending}
                          >
                            {deleteTaskMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Edit Task</SheetTitle>
            <SheetDescription>
              Make changes to the task here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-task">Task Type</Label>
              <Select
                value={editData?.task}
                onValueChange={(value) =>
                  setEditData(editData ? { ...editData, task: value } : null)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  {taskOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-hours">Hours Worked</Label>
              <Input
                id="edit-hours"
                type="number"
                value={editData?.hoursWorked}
                onChange={(e) =>
                  setEditData(
                    editData
                      ? { ...editData, hoursWorked: e.target.value }
                      : null
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editData
                      ? formatDate(new Date(editData.date))
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={editData ? new Date(editData.date) : new Date()}
                    onSelect={(date) =>
                      setEditData(
                        editData
                          ? {
                              ...editData,
                              date: date?.toISOString() || editData.date,
                            }
                          : null
                      )
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              onClick={handleUpdateTask}
              disabled={editTaskMutation.isPending}
            >
              {editTaskMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <PaymentHistory />
    </div>
  );
}
