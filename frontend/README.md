# EduPulse | Modern React Frontend for Student Management System

A production-grade, state-of-the-art React frontend built with Vite, tailored specifically for the Spring Boot Student Management backend (`curd`).

---

## 🌟 Key Features

1. **Authentication & Session Management**
   - Direct integration with Spring Security JWT endpoints (`/api/auth/login`, `/api/auth/register`, `/api/auth/me`, `/api/auth/logout`).
   - Role-based badges (`ROLE_ADMIN`, `ROLE_TEACHER`, `ROLE_STUDENT`).
   - Auto-session recovery and unauthorized redirect.

2. **Executive Academic Dashboard**
   - KPI counters for total enrolled students, detention watch count, average attendance rate, and departments count.
   - Core Subject Attendance Health gauges for **Java, DBMS, DSA, Computer Networks (CN), and Artificial Intelligence (AI)**.
   - Quick action shortcuts (Register Student, Inspect Detention, Manage Courses).
   - Recent enrollments preview table.

3. **Students Directory & Profiling (CRUD + Search & Pagination)**
   - Live search by Name, Roll Number, or Email.
   - Dynamic multi-filters: Department, Course, Academic Year, Semester.
   - Sort controls (Name, Roll Number, ID, Ascending/Descending).
   - Server-side Spring Data pagination (`/api/students/search`).
   - Complete registration/edit modal with personal, academic, and subject-wise attendance inputs.
   - One-click CSV export of student rosters.

4. **Academic Detention & Deficit Monitor**
   - Direct integration with `/api/students/detain`.
   - Real-time detection of any student falling below the mandatory **75% attendance threshold** in any core subject.
   - Highlights the exact failed subjects with red deficit tags.
   - Simulated bulk email notification dispatch and printable reports.

5. **Course Catalog Management**
   - Direct integration with `/api/courses`.
   - Create, edit, and delete degree programs.
   - Filter courses by department, duration, and semesters.

6. **Departments Management**
   - Direct integration with `/api/departments`.
   - Create, update, and manage academic departments with codes and descriptions.

7. **Academic Calendar Sessions**
   - Direct integration with `/api/academic-years`.
   - Mark and activate the current academic term (`PUT /api/academic-years/{id}/set-current`).
   - Real-time pulse indicator in the top navigation bar.

---

## 🚀 Getting Started

### 1. Ensure Backend is Running
Run the Spring Boot application (configured on port `8081` in `application.properties`):
```bash
cd curd
./mvnw spring-boot:run
```

### 2. Run the React Frontend
Navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at: **`http://localhost:3000`**

The Vite development server is pre-configured with an automatic reverse proxy:
- Any call to `/api/*` is transparently proxied to `http://localhost:8081/api/*`.
- No CORS errors during local development.

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── client.js           # Centralized fetch client with Bearer JWT tokens
│   │   ├── authApi.js          # Authentication API endpoints
│   │   ├── studentApi.js       # Student CRUD, search, and detention endpoints
│   │   ├── departmentApi.js    # Department management API endpoints
│   │   ├── courseApi.js        # Course management API endpoints
│   │   └── academicYearApi.js  # Academic year management API endpoints
│   ├── context/
│   │   ├── AuthContext.jsx     # User authentication state & session context
│   │   └── ToastContext.jsx    # Toast notification dispatch context
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar with active academic year pill
│   │   ├── Sidebar.jsx         # Sidebar navigation with detention alert badge
│   │   ├── Toast.jsx           # Floating status notifications
│   │   ├── Modal.jsx           # Reusable glassmorphic modal
│   │   ├── StudentModal.jsx    # Add / Edit Student modal with attendance inputs
│   │   ├── StudentDetailModal.jsx # Student card with subject breakdown
│   │   ├── DepartmentModal.jsx # Department create/edit modal
│   │   ├── CourseModal.jsx     # Course create/edit modal
│   │   ├── AcademicYearModal.jsx # Academic year create/edit modal
│   │   └── ConfirmDialog.jsx   # Deletion confirmation dialog
│   ├── pages/
│   │   ├── Login.jsx           # Sign in & Account creation screen
│   │   ├── Dashboard.jsx       # Academic KPI dashboard
│   │   ├── StudentsPage.jsx    # Students directory with search, filter, pagination
│   │   ├── DetentionPage.jsx   # Detention watch list (< 75% attendance)
│   │   ├── CoursesPage.jsx     # Degree courses catalog
│   │   ├── DepartmentsPage.jsx # Academic departments
│   │   └── AcademicYearsPage.jsx # Academic sessions management
│   ├── index.css               # Design tokens, color palette, and micro-animations
│   ├── App.jsx                 # App root coordinator
│   └── main.jsx
├── vite.config.js              # Port 3000 configuration + proxy to localhost:8081
└── package.json
```
