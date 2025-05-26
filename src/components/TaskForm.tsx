import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle, Save } from "lucide-react";

interface TaskFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (task: TaskData) => void;
  initialData?: TaskData;
  mode?: "create" | "edit";
  isEditing?: boolean;
  onSubmit?: (task: TaskData) => void;
}

export interface TaskData {
  id?: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status?: "todo" | "inProgress" | "completed";
}

const TaskForm = ({
  isOpen = true,
  onClose = () => {},
  onSave = () => {},
  initialData = {
    title: "",
    description: "",
    priority: "medium" as const,
    status: "todo" as const,
  },
  mode = "create",
  isEditing = false,
  onSubmit = () => {},
}: TaskFormProps) => {
  const [taskData, setTaskData] = useState<TaskData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value: "low" | "medium" | "high") => {
    setTaskData((prev) => ({ ...prev, priority: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Use onSubmit if provided, otherwise fall back to onSave
    if (typeof onSubmit === "function") {
      onSubmit(taskData);
    } else {
      onSave(taskData);
    }

    if (mode === "create" && !isEditing) {
      setTaskData({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {mode === "create" ? "Create New Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Task Title
            </Label>
            <Input
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Priority</Label>
            <RadioGroup
              value={taskData.priority}
              onValueChange={handlePriorityChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label
                  htmlFor="low"
                  className="cursor-pointer flex items-center"
                >
                  <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                  Low
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label
                  htmlFor="medium"
                  className="cursor-pointer flex items-center"
                >
                  <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                  Medium
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label
                  htmlFor="high"
                  className="cursor-pointer flex items-center"
                >
                  <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                  High
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {mode === "create" ? (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Task
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
