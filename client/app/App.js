//react & redux
import React from "react";

// Router
import { Routes, Route } from "react-router-dom";

// Components
import { SharedLayout, ProtectedRoute } from "./components";

// Screens
import {
  HomeScreen,
  LogInScreen,
  SignUpScreen,
  DashHome,
  FAQ,
  CourseScreen,
  CourseStudentScreen,
  CourseAssessmentsScreen,
  AssessmentsScreen,
  CreateAssessmentScreen,
  EditAssessmentScreen,
  GradingScreen,
  StudentReportScreen,
  AssessmentReportScreen,
  CourseReportScreen,
  NotFound,
  StudentViewScreen,
} from "./screen";

import { useSelector } from "react-redux";
import { selectAuthState } from "./store/slices/authSlice";

export default function App() {
  const { user } = useSelector(selectAuthState);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        {/* Home */}
        <Route index element={<DashHome />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Course */}
        <Route path="/courses" element={<CourseScreen />} />

        <Route
          path="/courses/:courseId/students"
          element={<CourseStudentScreen />}
        />
        <Route
          path="/courses/:courseId/assessments"
          element={<CourseAssessmentsScreen />}
        />
        {/* Assessment */}

        <Route path="/assessments" element={<AssessmentsScreen />} />

        <Route
          path="/assessments/create"
          element={<CreateAssessmentScreen />}
        />
        <Route
          path="/assessments/:assessmentId"
          element={<EditAssessmentScreen />}
        />
        <Route
          path="/assessments/:assessmentId/grades"
          element={<GradingScreen />}
        />
        {/* Report */}
        <Route path="/report/students" element={<StudentReportScreen />} />
        <Route
          path="/report/assessments"
          element={<AssessmentReportScreen />}
        />

        <Route path="/report/courses/" element={<CourseReportScreen />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="landing" element={<HomeScreen />} />
      <Route path="/login" element={<LogInScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route
        path="/student/courses/:courseId/assessments/:assessmentId"
        element={<StudentViewScreen />}
      />
    </Routes>
  );
}
