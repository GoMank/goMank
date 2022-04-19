import React from "react";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import TableLogs from "./components/TableLogs";
import { Routes, Route } from 'react-router-dom'


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="" element={<Dashboard/>}/>
          <Route path="logs" element={<TableLogs/>}/>
        </Route>
      </Routes>
    </div>
  );
}