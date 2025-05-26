import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "inProgress" | "completed";
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDragStart?: (e: React.DragEvent, id: string) => void;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
};

const TaskCard = ({
  id = "1",
  title = "Example Task",
  description = "This is an example task description. Click to expand and see more details about this task.",
  priority = "medium",
  status = "todo",
  onEdit = () => {},
  onDelete = () => {},
  onDragStart = () => {},
}: TaskCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(e, id);
  };

  return (
    <Card
      className="mb-3 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
      draggable
      onDragStart={handleDragStart}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
            <Badge className={cn("font-medium", priorityColors[priority])}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => onEdit(id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <h3 className="font-semibold text-lg mt-2">{title}</h3>

        <div className="mt-2">
          {expanded ? (
            <p className="text-gray-600 text-sm">{description}</p>
          ) : (
            <p className="text-gray-600 text-sm truncate">{description}</p>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 text-gray-500 hover:text-gray-700 flex items-center justify-center"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              <span className="text-xs">Show Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              <span className="text-xs">Show More</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
