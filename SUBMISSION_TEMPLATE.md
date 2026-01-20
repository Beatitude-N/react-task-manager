# Assessment Submission

**Candidate Name:** Noah Feyibunmi  
**Date:** 20 January 2026 
**Time Spent:** 4 Hours

## Task 1: Task List Component

### Approach
I started by implementing the TaskList component as the core display for tasks fetched from the backend API. The component is responsible for retrieving tasks, handling loading and error states, and rendering tasks in a clean, responsive grid layout. I focused on keeping the component reusable and driven by props such as filters and reload triggers.

### Implementation Details
Used useEffect to fetch tasks whenever filters or a reload key change.

Integrated the backend endpoint GET /api/tasks with optional query parameters for filtering.

Displayed tasks using a CSS Grid layout to show multiple cards per row on desktop and a single column on mobile.

Added visual indicators for task status and priority using color-coded text.

Implemented status toggling by clicking the status label, which cycles through pending → in-progress → completed using PATCH /api/tasks/:id.

### Challenges
One challenge was keeping the task list in sync after updates (status changes or new tasks). This was solved by centralizing refresh logic using a reloadKey state that forces re-fetching tasks whenever changes occur.

## Task 2: Task Creation Form

### Approach
The task creation feature was implemented as a reusable TaskForm component. To improve UX, the form was placed inside a modal that opens when the user clicks an Add New Task button, keeping the main interface clean and focused on task viewing.

### Implementation Details
Implemented controlled form inputs using useState.

Added basic validation to ensure the task title is required.

Integrated POST /api/tasks to create new tasks.

Displayed loading and error states during submission.

Reset form fields after successful task creation.

Automatically closed the modal and refreshed the task list after a task is created.

### Challenges
Handling form validation and async submission while maintaining good UX required careful state management. This was handled by using separate loading and error states and disabling the submit button during submission.


## Task 3: Filtering and Status Management

### Approach
Filtering and status management were designed to be simple and intuitive. Filters were extracted into a separate TaskFilters component to keep the main App component clean and maintainable.

### Implementation Details
Implemented filtering by status and priority using controlled select inputs.

Passed filter state down to TaskList, which forwards it to the API.

Ensured the filtered task list updates in real time whenever filters change.

Status updates are persisted via API calls and immediately reflected in the UI.

### Challenges
Ensuring that filters, task updates, and new task creation all worked together without stale data required careful coordination between components. This was solved using shared state in the App component and consistent refresh triggers.

## Additional Features (if any)
Modal-based task creation to improve user experience and keep the main interface uncluttered.

Responsive grid layout for tasks, ensuring an optimal viewing experience across desktop and mobile devices.

## Code Quality Notes
Components are modular and reusable.

State is lifted where appropriate and passed via props.

Clear separation between UI components and API logic.

Consistent naming conventions and readable structure.

CSS is organized with responsive considerations using media queries.

## Testing Notes
Tested task creation with valid and invalid inputs.

Verified filtering by status and priority combinations.

Confirmed status toggling cycles correctly through all states.

Tested UI responsiveness on mobile and desktop screen sizes.

Verified error and loading states behave as expected.

## Questions or Comments

No questions at this time. Thank you for the opportunity to complete this assessment.

