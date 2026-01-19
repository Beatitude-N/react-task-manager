import { useEffect, useState } from "react";
import { fetchTasks, updateTask } from "../api/tasks";

// TaskList component
// Responsible for fetching, displaying, filtering,
// and updating task status
function TaskList({ reloadKey, filters }) {
  // State for task data
  const [tasks, setTasks] = useState([]);

  // UI state for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks whenever filters change or a task is created/updated
  useEffect(() => {
    loadTasks();
  }, [reloadKey, filters]);

  // Fetch tasks from API with optional filters
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks(filters);
      setTasks(data.tasks);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Toggle task status in sequence:
  // pending → in-progress → completed → pending
  const toggleStatus = async (task) => {
    const nextStatus =
      task.status === "pending"
        ? "in-progress"
        : task.status === "in-progress"
        ? "completed"
        : "pending";

    // Update task status via API
    await updateTask(task.id, { status: nextStatus });

    // Refresh task list after update
    loadTasks();
  };

  // Style helper for task status
  const getStatusStyle = (status) => {
    if (status === "pending") return { color: "#b45309" };
    if (status === "in-progress") return { color: "#1d4ed8" };
    if (status === "completed") return { color: "#15803d" };
  };

  // Style helper for task priority
  const getPriorityStyle = (priority) => {
    if (priority === "high") return { color: "#b91c1c" };
    if (priority === "medium") return { color: "#1d4ed8" };
    if (priority === "low") return { color: "#15803d" };
  };

  // Loading state
  if (loading) return <p>Loading tasks...</p>;

  // Error state
  if (error) return <p>{error}</p>;

  // Empty state
  if (!tasks.length) return <p>No tasks found</p>;

  return (
    // Grid container for task cards
    <div className="task-grid">
      {tasks.map((task) => (
        // Individual task card
        <div key={task.id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          {/* Clickable status text to toggle task status */}
          <p
            onClick={() => toggleStatus(task)}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              ...getStatusStyle(task.status),
            }}
          >
            Status: {task.status}
          </p>

          {/* Priority indicator */}
          <p style={{ fontWeight: "bold", ...getPriorityStyle(task.priority) }}>
            Priority: {task.priority}
          </p>

          {/* Task due date */}
          <p>Due date: {task.dueDate}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
