import { Routes, Route, Navigate } from "react-router-dom";
import CreateNewTask from "../Mainpage/CreateNewTask";
import Dashboard from "../Mainpage/Dashboard";

function MainRoutes() {
  
  return (
    <Routes>
      <Route path="/project" element= {<Dashboard />} />
      <Route path="/newTask" element= {<CreateNewTask />} />
      <Route path="*" element={<Navigate to="/project" />} />
    </Routes>
  );
}

export default MainRoutes;
