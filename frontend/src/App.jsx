import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import "./App.css";

// Root application component
// Manages global state and layout
function App() {
  // Triggers task list refresh when a task is created or updated
  const [reloadKey, setReloadKey] = useState(0);

  // Filter state for task list
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });

  // Controls visibility of task creation modal
  const [showModal, setShowModal] = useState(false);

  // Called after a task is successfully created
  // Refreshes task list and closes modal
  const handleTaskCreated = () => {
    setReloadKey((prev) => prev + 1);
    setShowModal(false);
  };

  // Updates filter state when user changes filter inputs
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="app">
      {/* Application header */}
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>React Frontend Developer Assessment</p>
      </header>

      <main className="app-main">
        {/* Top bar containing filters and primary action button */}
        <div className="top-bar">
          <TaskFilters
            filters={filters}
            onChange={handleFilterChange}
          />

          {/* Opens task creation modal */}
          <button
            className="primary-btn"
            onClick={() => setShowModal(true)}
          >
            Add New Task
          </button>
        </div>

        {/* Task list grid */}
        <TaskList reloadKey={reloadKey} filters={filters} />

        {/* Modal popup for task creation */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              {/* Modal header */}
              <div className="modal-header">
                <h3>New Task</h3>

                {/* Close modal button */}
                <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              {/* Task creation form */}
              <TaskForm onTaskCreated={handleTaskCreated} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
