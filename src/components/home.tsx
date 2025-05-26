import React, { useState } from "react";
import { Plus } from "lucide-react";
import TaskBoard from "./TaskBoard";
import TaskForm from "./TaskForm";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <header className="mb-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Task Manager
            </h1>
            <p className="text-slate-500 mt-1">
              Organize your tasks efficiently
            </p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Task
          </Button>
        </div>
      </header>

      <main className="container mx-auto">
        <TaskBoard />
      </main>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <TaskForm onClose={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>Task Manager &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Home;
