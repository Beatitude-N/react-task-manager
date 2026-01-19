// TaskFilters component
// Responsible for filtering tasks by status and priority
// It is a controlled component driven by parent state

function TaskFilters({ filters, onChange }) {
  return (
    // Wrapper for filter controls
    <div className="filters">
      
      {/* Status filter dropdown */}
      <select
        value={filters.status} // Current selected status from parent state
        onChange={(e) => onChange("status", e.target.value)} // Notify parent of status change
      >
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority filter dropdown */}
      <select
        value={filters.priority} // Current selected priority from parent state
        onChange={(e) => onChange("priority", e.target.value)} // Notify parent of priority change
      >
        <option value="">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}


export default TaskFilters;
