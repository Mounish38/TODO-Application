import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import TaskForm from "./TaskForm";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { PlusCircle } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "inProgress" | "completed";
}

const TaskBoard = () => {
  // Initialize tasks from localStorage or use default tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      {
        id: "1",
        title: "Complete project proposal",
        description:
          "Draft the initial project proposal with timeline and budget estimates",
        priority: "high",
        status: "todo",
      },
      {
        id: "2",
        title: "Research competitors",
        description: "Analyze top 5 competitors in the market",
        priority: "medium",
        status: "inProgress",
      },
      {
        id: "3",
        title: "Update portfolio",
        description: "Add recent projects to online portfolio",
        priority: "low",
        status: "completed",
      },
    ];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item was dropped back in its original position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Find the task that was dragged
    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;

    // Create a new status based on the destination droppableId
    const newStatus = destination.droppableId as
      | "todo"
      | "inProgress"
      | "completed";

    // Update the task with the new status
    const updatedTasks = tasks.map((t) =>
      t.id === draggableId ? { ...t, status: newStatus } : t,
    );

    setTasks(updatedTasks);
    // Save to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    // Save to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsDialogOpen(false);
  };

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    setTasks(updatedTasks);
    // Save to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditingTask(null);
    setIsDialogOpen(false);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    // Save to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Task Board</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
              <PlusCircle size={18} />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <TaskForm
              onSubmit={editingTask ? updateTask : addTask}
              initialData={editingTask}
              isEditing={!!editingTask}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="To Do"
            tasks={todoTasks}
            droppableId="todo"
            onEdit={handleEditTask}
            onDelete={deleteTask}
          />
          <TaskColumn
            title="In Progress"
            tasks={inProgressTasks}
            droppableId="inProgress"
            onEdit={handleEditTask}
            onDelete={deleteTask}
          />
          <TaskColumn
            title="Completed"
            tasks={completedTasks}
            droppableId="completed"
            onEdit={handleEditTask}
            onDelete={deleteTask}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
