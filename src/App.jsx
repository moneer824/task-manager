import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, Button  } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavHeader from './components/NavHeader';
import Home from './pages/Home';
import Projects from './pages/Projects';
import SideNavbar from './components/SideNavbar';
import Tasks from './pages/Tasks';
import GroupMembers from './pages/GroupMembers';
import DashBoard from './pages/DashBoard';

function App() {
  return (
    <div className="app">
      <Router>
        <NavHeader />
        <SideNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks/:project_id" element={<Tasks />} />
          <Route path="/teams" element={< GroupMembers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
