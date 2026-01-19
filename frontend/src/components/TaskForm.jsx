import { useState } from "react";
import { createTask } from "../api/tasks";

// TaskForm component
// Responsible for creating a new task
// Handles form state, validation, submission, and API interaction
function TaskForm({ onTaskCreated }) {
  // Form state for task fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  // UI state for error handling and loading indicator
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form refresh

    // Basic validation for required title field
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true); // Show loading state
      setError("");

      // Create task via API
      await createTask({
        title,
        description,
        dueDate,
        priority,
      });

      // Reset form fields after successful creation
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");

      // Notify parent component to refresh task list
      onTaskCreated();
    } catch {
      // Handle API or network errors
      setError("Failed to create task");
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    // Task creation form
    <form onSubmit={handleSubmit} className="task-form">
      
      {/* Task title input */}
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Task description input */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Bottom row for date, priority, and submit button */}
      <div className="form-row">
        {/* Due date picker */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* Priority selection */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Submit button with loading state */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Add Task"}
        </button>
      </div>

      {/* Display validation or API errors */}
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}


export default TaskForm;
