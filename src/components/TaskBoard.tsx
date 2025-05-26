import React from "react";
import { Card } from "@/components/ui/card";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "inProgress" | "completed";
  createdAt?: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status?: "todo" | "inProgress" | "completed";
  droppableId?: string;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

const TaskColumn = ({
  title = "To Do",
  tasks = [],
  droppableId = "todo",
  onEdit = () => {},
  onDelete = () => {},
}: TaskColumnProps) => {
  // Map droppableId to a color for the column header
  const getColumnHeaderColor = () => {
    switch (droppableId) {
      case "todo":
        return "bg-blue-100 border-blue-300";
      case "inProgress":
        return "bg-amber-100 border-amber-300";
      case "completed":
        return "bg-green-100 border-green-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  // Import the actual TaskCard component
  import TaskCardComponent from "./TaskCard";

  return (
    <Card className="flex flex-col h-full bg-gray-50 border shadow-sm">
      <div className={`p-4 border-b ${getColumnHeaderColor()}`}>
        <h2 className="text-lg font-semibold text-center">{title}</h2>
        <div className="text-sm text-gray-500 text-center mt-1">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-3 min-h-[200px]">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCardComponent
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={task.status}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md border-gray-300 bg-gray-50">
              <p className="text-gray-500 text-sm">No tasks yet</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskColumn;
