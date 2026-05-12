import React, { useState } from "react";
import { useSelector } from "react-redux";
import Column from "./Column";
import Sidebar from "./Sidebar";
import EmptyBoard from "./EmptyBoard";
import Logo from "../assets/logo-mobile.svg";

function EmployeeDashboard() {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((b) => b.isActive);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  if (!board) {
    return <EmptyBoard type="view" />; // no boards available
  }

  const columns = board.columns;

  return (
    <div className="dark:bg-[#20212c]">
      {/* Header */}
      <div className="p-4 fixed top-0 left-0 right-0 bg-white dark:bg-[#2b2c37] z-50 shadow-md">
        <header className="flex justify-between items-center dark:text-white">
          
          {/* Left: Logo + Board name */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={Logo} alt="Logo" className="h-6 w-6" />
            <h3 className="hidden md:inline-block md:text-4xl font-bold">
              kanban
            </h3>

            {/* Active Board Title */}
            <h3 className="md:text-2xl text-xl font-bold ml-4 truncate max-w-[160px]">
              {board.name}
            </h3>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <div
        className={
          isSideBarOpen
            ? "bg-[#f4f7fd] dark:bg-[#20212c] flex overflow-x-auto gap-6 ml-[261px] h-screen pt-[80px] scrollbar-hide"
            : "bg-[#f4f7fd] dark:bg-[#20212c] flex overflow-x-auto gap-6 h-screen pt-[80px] scrollbar-hide"
        }
      >
        {/* Sidebar */}
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          isEmployee={true}
        />

        {/* Columns */}
        {columns.length > 0 ? (
          columns.map((col, index) => <Column key={index} colIndex={index} />)
        ) : (
          <EmptyBoard type="view" />
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
