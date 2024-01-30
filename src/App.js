import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// COMPONENTS
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ApplicationListsPage from "./pages/ApplicationListsPage/ApplicationListsPage";
import ApplicationDetailPage from "./pages/ApplicationDetailPage/ApplicationDetailPage";
import EmailDetailPage from "./pages/EmailDetailPage/EmailDetailPage";
import ScheduleInterviewPage from "./pages/ScheduleInterviewPage/ScheduleInterviewPage";
import InterviewListsPage from "./pages/InterviewListsPage/InterviewListsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ContactPage from "./pages/ContactPage/ContactPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/applicationLists" element={<ApplicationListsPage />} />
          <Route
            path="/applicationDetail/:id"
            element={<ApplicationDetailPage />}
          />
          <Route path="/emailDetail/:id" element={<EmailDetailPage />} />
          <Route
            path="/scheduleInterview"
            element={<ScheduleInterviewPage />}
          />
          <Route path="/interviewLists" element={<InterviewListsPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
