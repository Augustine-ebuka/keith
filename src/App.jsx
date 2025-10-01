import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOtp'
import Dashboard from './pages/Dashboard';
import { Toaster } from "./components/ui/sonner";
import { AppLayout } from "./components/AppLayout";
import { WorkflowOverview } from "./components/workflowoverview";
// import { AnalyticsPage } from "./components/AnalyticsPage";
import { SettingsPage } from "./components/settings";
import {LinearWorkFlow} from "./components/Linear"
import {SlackWorkFlow} from "./components/Slack"
import { IssueIntake } from './components/issueIntake';



function App() {
   const [currentPage, setCurrentPage] = useState("dashboard");
     const renderPage = () => {
    switch (currentPage) {
      case "settings":
        return <SettingsPage />;
      case "verify":
          return <VerifyOTP />
      case "dashboard":
          return <WorkflowOverview /> 
      case "linear":
        return <LinearWorkFlow />
      case "slack":
        return <SlackWorkFlow />
      case "issue":
        return <IssueIntake />

      default:
        return <div>hello</div>;
    }
  };
  return (
    <>
    <Toaster />
    <div className="min-h-screen bg-background">
      <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </AppLayout>
      <Toaster />
    </div>
     {/* <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router> */}
    </>
  )
}

export default App
