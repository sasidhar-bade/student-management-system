# Frontend — Student Management System

A **React** single-page application that provides the UI for managing student records. Uses **Redux Toolkit** for global state, **Axios** for API calls, and **Bootstrap 5** for styling.

---

## Tech Stack

- **React 19** — UI library
- **Redux Toolkit 2** — global state management
- **React Redux 9** — React bindings for Redux
- **React Router DOM v7** — client-side routing
- **Axios** — HTTP client for API calls
- **Bootstrap 5** + **Bootstrap Icons** — responsive UI and icons
- **React Toastify** — toast notifications

---

## Project Structure

```
frontend/src/
├── App.js                          # Root component with route definitions
├── index.js                        # React app entry point
├── components/
│   ├── Header.jsx                  # Navigation bar with search
│   ├── Footer.jsx                  # Page footer
│   ├── StudentInfo.jsx             # Student card/row with edit & delete actions
│   ├── AddStudent.jsx              # Form for adding a new student
│   ├── EditStudent.jsx             # Form for editing an existing student
│   └── SearchingStudentInfo.jsx    # Displays search results
├── pages/
│   ├── HomePage.jsx                # Lists all students
│   ├── AddStudentPage.jsx          # Wraps AddStudent with Header/Footer
│   ├── EditStudentPage.jsx         # Wraps EditStudent with Header/Footer
│   └── SearchingStudentPage.jsx    # Wraps search results with Header/Footer
├── redux/
│   ├── Store.jsx                   # Redux store configuration
│   └── StudentSlice.jsx            # Async thunks + reducers for student state
└── css/
    ├── Header.css
    └── Footer.css
```

---

## Routes

| Path                | Page                  | Description                  |
|---------------------|-----------------------|------------------------------|
| `/` or `*`          | HomePage              | View all students            |
| `/all`              | HomePage              | View all students            |
| `/add`              | AddStudentPage        | Add a new student            |
| `/edit/:id`         | EditStudentPage       | Edit an existing student     |
| `/search/:keyword`  | SearchingStudentPage  | Search results by name       |

---

## Redux State

Managed via `StudentSlice` with the following shape:

```js
{
  studentList: [],     // All students loaded from the API
  loading: false,      // Request in-flight flag
  error: "",           // Error message if a request fails
  searchedData: null   // Results from search API call
}
```

### Async Thunks

| Thunk                     | Method | Endpoint                          | Description            |
|---------------------------|--------|-----------------------------------|------------------------|
| `getAllStudentsApiCall`    | GET    | `/students`                       | Fetch all students     |
| `addStudentApiCall`       | POST   | `/students`                       | Add a new student      |
| `updateStudentApical`     | PATCH  | `/students/:id`                   | Update a student       |
| `deleteStudentApiCal`     | DELETE | `/students/:id`                   | Delete a student       |
| `searchStudentsApiCall`   | GET    | `/students/search?keyword=...`    | Search by name         |

All thunks display toast notifications on success and failure.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:8080`

### Install & Run

```bash
cd frontend
npm install
npm start
```

The app opens at `http://localhost:3000`.

---

## Available Scripts

| Script        | Description                          |
|---------------|--------------------------------------|
| `npm start`   | Run development server on port 3000  |
| `npm run build` | Create optimised production build  |
| `npm test`    | Run test suite                       |
| `npm run eject` | Eject from Create React App        |

---

## API Integration

The frontend connects to the backend at:

```
http://localhost:8080
```

If you deploy the backend to a different host or port, update the base URL in `src/redux/StudentSlice.jsx`.

---

## Pages & Components

### HomePage
Fetches and displays all students in a list on mount using `getAllStudentsApiCall`. Each entry shows a `StudentInfo` component with edit and delete buttons.

### AddStudentPage
Contains the `AddStudent` form. On submission, dispatches `addStudentApiCall` and navigates back to `/all`.

### EditStudentPage
Reads the student ID from the URL (`/edit/:id`), pre-populates the `EditStudent` form with existing data, and dispatches `updateStudentApical` on save.

### SearchingStudentPage
Reads the keyword from the URL (`/search/:keyword`), dispatches `searchStudentsApiCall`, and renders results via `SearchingStudentInfo`.

### Header
Navigation bar with links to Home and Add Student. Includes a search input that navigates to `/search/:keyword` on submit.

---

## Production Build

```bash
npm run build
```

Outputs a static build to the `build/` folder, which can be served by any static file server or web host.