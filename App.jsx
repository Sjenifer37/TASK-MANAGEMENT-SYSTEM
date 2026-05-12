import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from "./components/EmptyBoard";
import boardsSlice from "./redux/boardsSlice";
import Login from "./components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import EmployeeDashboard from "./Components/EmployeeDashboard"



function App() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // "admin" or "employee"

  // Set first board active if none active
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  // If not logged in yet, show Login
  if (!userRole) {
    return <Login setUserRole={setUserRole} />;
  }

  // If logged in as Admin
  if (userRole === "admin") {
    return (
      <div className="overflow-hidden overflow-x-scroll">
        {boards.length > 0 ? (
          <>
            <Header
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
            <AdminDashboard
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
          </>
        ) : (
          <EmptyBoard type="add" />
        )}
      </div>
    );
  }

  // If logged in as Employee
  if (userRole === "employee") {
    return (
      <div className="overflow-hidden overflow-x-scroll">
        <EmployeeDashboard />
      </div>
    );
  }
}

export default App;
