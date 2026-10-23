import React, { useState, useEffect, useCallback } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toast } from './components/Toast';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { StudentsPage } from './pages/StudentsPage';
import { DetentionPage } from './pages/DetentionPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { CoursesPage } from './pages/CoursesPage';
import { AcademicYearsPage } from './pages/AcademicYearsPage';

import { StudentModal } from './components/StudentModal';
import { StudentDetailModal } from './components/StudentDetailModal';
import { DepartmentModal } from './components/DepartmentModal';
import { CourseModal } from './components/CourseModal';
import { AcademicYearModal } from './components/AcademicYearModal';
import { ConfirmDialog } from './components/ConfirmDialog';

import { studentApi } from './api/studentApi';
import { departmentApi } from './api/departmentApi';
import { courseApi } from './api/courseApi';
import { academicYearApi } from './api/academicYearApi';
import { extractErrorMessage } from './utils/errorHandler';
import { INITIAL_DEMO_DATA } from './utils/mockData';

const MainApp = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshing, setRefreshing] = useState(false);

  // Data states
  const [allStudents, setAllStudents] = useState([]);
  const [detainedStudents, setDetainedStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [currentAcademicYear, setCurrentAcademicYear] = useState(null);

  // Student search & pagination states
  const [pagedStudents, setPagedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [studentsLoading, setStudentsLoading] = useState(false);

  // Modals state
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  const [departmentModalOpen, setDepartmentModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [academicYearModalOpen, setAcademicYearModalOpen] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch Auxiliary Data (Departments, Courses, Academic Years, Detained)
  const loadAuxData = useCallback(async () => {
    try {
      const [deptRes, courseRes, ayRes, curAyRes, detainRes, allStRes] = await Promise.allSettled([
        departmentApi.getAll(),
        courseApi.getAll(),
        academicYearApi.getAll(),
        academicYearApi.getCurrent(),
        studentApi.getDetained(),
        studentApi.getAll(),
      ]);

      if (deptRes.status === 'fulfilled' && Array.isArray(deptRes.value) && deptRes.value.length > 0) {
        setDepartments(deptRes.value);
      } else {
        setDepartments((prev) => (prev.length ? prev : INITIAL_DEMO_DATA.departments));
      }

      if (courseRes.status === 'fulfilled' && Array.isArray(courseRes.value) && courseRes.value.length > 0) {
        setCourses(courseRes.value);
      } else {
        setCourses((prev) => (prev.length ? prev : INITIAL_DEMO_DATA.courses));
      }

      if (ayRes.status === 'fulfilled' && Array.isArray(ayRes.value) && ayRes.value.length > 0) {
        setAcademicYears(ayRes.value);
      } else {
        setAcademicYears((prev) => (prev.length ? prev : INITIAL_DEMO_DATA.academicYears));
      }

      if (curAyRes.status === 'fulfilled' && curAyRes.value) {
        setCurrentAcademicYear(curAyRes.value);
      } else {
        setCurrentAcademicYear((prev) => prev || INITIAL_DEMO_DATA.academicYears[0]);
      }

      if (detainRes.status === 'fulfilled' && Array.isArray(detainRes.value) && detainRes.value.length > 0) {
        setDetainedStudents(detainRes.value);
      } else {
        setDetainedStudents((prev) =>
          prev.length
            ? prev
            : INITIAL_DEMO_DATA.students.filter((s) => s.status === 'DETAINED')
        );
      }

      if (allStRes.status === 'fulfilled' && Array.isArray(allStRes.value) && allStRes.value.length > 0) {
        setAllStudents(allStRes.value);
      } else {
        setAllStudents((prev) => (prev.length ? prev : INITIAL_DEMO_DATA.students));
      }
    } catch (err) {
      console.warn('Backend unavailable, using initial demo data:', err);
      setDepartments(INITIAL_DEMO_DATA.departments);
      setCourses(INITIAL_DEMO_DATA.courses);
      setAcademicYears(INITIAL_DEMO_DATA.academicYears);
      setCurrentAcademicYear(INITIAL_DEMO_DATA.academicYears[0]);
      setAllStudents(INITIAL_DEMO_DATA.students);
      setDetainedStudents(INITIAL_DEMO_DATA.students.filter((s) => s.status === 'DETAINED'));
    }
  }, []);

  // Fetch Paged Students
  const loadPagedStudents = useCallback(async () => {
    setStudentsLoading(true);
    try {
      const res = await studentApi.search({
        query: searchQuery,
        course: selectedCourse,
        department: selectedDept,
        academicYear: selectedAcademicYear,
        semester: selectedSemester,
        page,
        size: pageSize,
        sortBy,
        sortDir,
      });

      if (res && res.content && res.content.length > 0) {
        setPagedStudents(res.content);
        setTotalElements(res.totalElements ?? res.content.length);
        setTotalPages(res.totalPages ?? 1);
      } else if (Array.isArray(res) && res.length > 0) {
        setPagedStudents(res);
        setTotalElements(res.length);
        setTotalPages(1);
      } else {
        // Filter demo students locally if backend returns empty or unavailable
        let filtered = INITIAL_DEMO_DATA.students;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              s.rollno.toLowerCase().includes(q) ||
              s.email.toLowerCase().includes(q)
          );
        }
        if (selectedDept) {
          filtered = filtered.filter((s) => s.department === selectedDept);
        }
        if (selectedCourse) {
          filtered = filtered.filter((s) => s.course === selectedCourse);
        }
        setPagedStudents(filtered);
        setTotalElements(filtered.length);
        setTotalPages(1);
      }
    } catch (err) {
      console.warn('Paged search fallback to demo dataset:', err.message);
      setPagedStudents(INITIAL_DEMO_DATA.students);
      setTotalElements(INITIAL_DEMO_DATA.students.length);
      setTotalPages(1);
    } finally {
      setStudentsLoading(false);
    }
  }, [searchQuery, selectedCourse, selectedDept, selectedAcademicYear, selectedSemester, page, pageSize, sortBy, sortDir]);

  // Sync / Refresh All
  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadAuxData(), loadPagedStudents()]);
    setRefreshing(false);
  }, [loadAuxData, loadPagedStudents]);

  useEffect(() => {
    if (isAuthenticated) {
      loadAuxData();
    }
  }, [isAuthenticated, loadAuxData]);

  useEffect(() => {
    if (isAuthenticated) {
      loadPagedStudents();
    }
  }, [isAuthenticated, loadPagedStudents]);

  // Student CRUD handlers
  const handleSaveStudent = async (formData) => {
    setActionLoading(true);
    try {
      if (editingStudent && editingStudent.id) {
        await studentApi.update(editingStudent.id, formData);
        addToast('Student details updated successfully', 'success');
      } else {
        await studentApi.create(formData);
        addToast('Student created and registered successfully', 'success');
      }
      setStudentModalOpen(false);
      setEditingStudent(null);
      refreshAll();
    } catch (err) {
      addToast(extractErrorMessage(err, 'Failed to save student'), 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteStudent = (st) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Student Record',
      message: `Are you sure you want to permanently delete student "${st.name}" (${st.rollno})?`,
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await studentApi.delete(st.id);
          addToast('Student deleted successfully', 'success');
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          refreshAll();
        } catch (err) {
          addToast(extractErrorMessage(err, 'Failed to delete student'), 'error');
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  // Department CRUD handlers
  const handleSaveDepartment = async (formData) => {
    setActionLoading(true);
    try {
      if (editingDepartment && editingDepartment.id) {
        await departmentApi.update(editingDepartment.id, formData);
        addToast('Department updated successfully', 'success');
      } else {
        await departmentApi.create(formData);
        addToast('Department created successfully', 'success');
      }
      setDepartmentModalOpen(false);
      setEditingDepartment(null);
      loadAuxData();
    } catch (err) {
      addToast(extractErrorMessage(err, 'Failed to save department'), 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteDepartment = (dept) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Department',
      message: `Are you sure you want to delete department "${dept.name}" (${dept.code})?`,
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await departmentApi.delete(dept.id);
          addToast('Department deleted successfully', 'success');
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          loadAuxData();
        } catch (err) {
          addToast(extractErrorMessage(err, 'Failed to delete department'), 'error');
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  // Course CRUD handlers
  const handleSaveCourse = async (formData) => {
    setActionLoading(true);
    try {
      if (editingCourse && editingCourse.id) {
        await courseApi.update(editingCourse.id, formData);
        addToast('Course program updated successfully', 'success');
      } else {
        await courseApi.create(formData);
        addToast('Course program created successfully', 'success');
      }
      setCourseModalOpen(false);
      setEditingCourse(null);
      loadAuxData();
    } catch (err) {
      addToast(extractErrorMessage(err, 'Failed to save course'), 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCourse = (course) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Course',
      message: `Are you sure you want to delete course "${course.name}" (${course.code})?`,
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await courseApi.delete(course.id);
          addToast('Course deleted successfully', 'success');
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          loadAuxData();
        } catch (err) {
          addToast(extractErrorMessage(err, 'Failed to delete course'), 'error');
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  // Academic Year CRUD handlers
  const handleSaveAcademicYear = async (formData) => {
    setActionLoading(true);
    try {
      const created = await academicYearApi.create(formData);
      addToast('Academic session created successfully', 'success');
      setAcademicYearModalOpen(false);
      loadAuxData();
    } catch (err) {
      addToast(extractErrorMessage(err, 'Failed to create academic year'), 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSetCurrentAcademicYear = async (id) => {
    try {
      await academicYearApi.setCurrent(id);
      addToast('Active academic term updated!', 'success');
      loadAuxData();
    } catch (err) {
      addToast(extractErrorMessage(err, 'Failed to update active year'), 'error');
    }
  };

  const handleDeleteAcademicYear = (ay) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Academic Year',
      message: `Are you sure you want to delete session "${ay.yearName}"?`,
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await academicYearApi.delete(ay.id);
          addToast('Academic year deleted successfully', 'success');
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          loadAuxData();
        } catch (err) {
          addToast(extractErrorMessage(err, 'Failed to delete academic year'), 'error');
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  if (authLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Initializing EduPulse...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Executive Academic Dashboard';
      case 'students':
        return 'Students Directory & Academic Profiling';
      case 'detention':
        return 'Detention Watch & Shortfall Inspection';
      case 'courses':
        return 'Course Pathways & Degree Programs';
      case 'departments':
        return 'University Academic Departments';
      case 'academic-years':
        return 'Academic Calendar Sessions';
      default:
        return 'Student ERP Management';
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        detainedCount={detainedStudents.length}
      />

      <div className="main-wrapper">
        <Navbar
          pageTitle={getPageTitle()}
          currentAcademicYear={currentAcademicYear}
          onRefresh={refreshAll}
          refreshing={refreshing}
        />

        <main className="content-area">
          {activeTab === 'dashboard' && (
            <Dashboard
              students={allStudents}
              detainedStudents={detainedStudents}
              departments={departments}
              courses={courses}
              setActiveTab={setActiveTab}
              onOpenAddStudent={() => {
                setEditingStudent(null);
                setStudentModalOpen(true);
              }}
            />
          )}

          {activeTab === 'students' && (
            <StudentsPage
              students={pagedStudents}
              departments={departments}
              courses={courses}
              academicYears={academicYears}
              loading={studentsLoading}
              onAddStudent={() => {
                setEditingStudent(null);
                setStudentModalOpen(true);
              }}
              onEditStudent={(st) => {
                setEditingStudent(st);
                setStudentModalOpen(true);
              }}
              onViewStudent={(st) => setViewingStudent(st)}
              onDeleteStudent={handleDeleteStudent}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDept={selectedDept}
              setSelectedDept={setSelectedDept}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              selectedAcademicYear={selectedAcademicYear}
              setSelectedAcademicYear={setSelectedAcademicYear}
              selectedSemester={selectedSemester}
              setSelectedSemester={setSelectedSemester}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortDir={sortDir}
              setSortDir={setSortDir}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalElements={totalElements}
              totalPages={totalPages}
            />
          )}

          {activeTab === 'detention' && (
            <DetentionPage
              detainedStudents={detainedStudents}
              loading={refreshing}
              onViewStudent={(st) => setViewingStudent(st)}
              onRefresh={loadAuxData}
            />
          )}

          {activeTab === 'departments' && (
            <DepartmentsPage
              departments={departments}
              loading={refreshing}
              onAddDepartment={() => {
                setEditingDepartment(null);
                setDepartmentModalOpen(true);
              }}
              onEditDepartment={(dept) => {
                setEditingDepartment(dept);
                setDepartmentModalOpen(true);
              }}
              onDeleteDepartment={handleDeleteDepartment}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesPage
              courses={courses}
              departments={departments}
              loading={refreshing}
              onAddCourse={() => {
                setEditingCourse(null);
                setCourseModalOpen(true);
              }}
              onEditCourse={(course) => {
                setEditingCourse(course);
                setCourseModalOpen(true);
              }}
              onDeleteCourse={handleDeleteCourse}
            />
          )}

          {activeTab === 'academic-years' && (
            <AcademicYearsPage
              academicYears={academicYears}
              loading={refreshing}
              onAddAcademicYear={() => setAcademicYearModalOpen(true)}
              onSetCurrentAcademicYear={handleSetCurrentAcademicYear}
              onDeleteAcademicYear={handleDeleteAcademicYear}
            />
          )}
        </main>
      </div>

      {/* Modals & Dialogs */}
      <StudentModal
        isOpen={studentModalOpen}
        onClose={() => {
          setStudentModalOpen(false);
          setEditingStudent(null);
        }}
        onSubmit={handleSaveStudent}
        student={editingStudent}
        departments={departments}
        courses={courses}
        academicYears={academicYears}
        loading={actionLoading}
      />

      <StudentDetailModal
        isOpen={!!viewingStudent}
        onClose={() => setViewingStudent(null)}
        student={viewingStudent}
        onEdit={(st) => {
          setViewingStudent(null);
          setEditingStudent(st);
          setStudentModalOpen(true);
        }}
        onDelete={(st) => {
          setViewingStudent(null);
          handleDeleteStudent(st);
        }}
      />

      <DepartmentModal
        isOpen={departmentModalOpen}
        onClose={() => {
          setDepartmentModalOpen(false);
          setEditingDepartment(null);
        }}
        onSubmit={handleSaveDepartment}
        department={editingDepartment}
        loading={actionLoading}
      />

      <CourseModal
        isOpen={courseModalOpen}
        onClose={() => {
          setCourseModalOpen(false);
          setEditingCourse(null);
        }}
        onSubmit={handleSaveCourse}
        course={editingCourse}
        departments={departments}
        loading={actionLoading}
      />

      <AcademicYearModal
        isOpen={academicYearModalOpen}
        onClose={() => setAcademicYearModalOpen(false)}
        onSubmit={handleSaveAcademicYear}
        loading={actionLoading}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        loading={actionLoading}
      />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <MainApp />
        <Toast />
      </AuthProvider>
    </ToastProvider>
  );
}
