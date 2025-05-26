import React from "react";
import { Card } from "@/components/ui/card";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "inProgress" | "completed";
  createdAt: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: "todo" | "inProgress" | "completed";
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
}

const TaskColumn = ({
  title = "To Do",
  tasks = [],
  status = "todo",
  onEditTask = () => {},
  onDeleteTask = () => {},
}: TaskColumnProps) => {
  // Map status to a color for the column header
  const getColumnHeaderColor = () => {
    switch (status) {
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

  // Placeholder for TaskCard component until it's properly implemented
  const TaskCard = ({
    task,
    onEdit,
    onDelete,
  }: {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
  }) => (
    <div className="p-3 bg-white rounded-md shadow border">
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="flex justify-between mt-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            task.priority === "high"
              ? "bg-red-100 text-red-800"
              : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {task.priority}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );

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
              <TaskCard
                key={task.id}
                task={task}
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
