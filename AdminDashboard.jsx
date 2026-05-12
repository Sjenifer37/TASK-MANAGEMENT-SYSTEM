import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";

function AdminDashboard() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((b) => b.isActive);
  const columns = board?.columns || [];

  useEffect(() => {
    const handleResize = () => setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Header */}
      {board && (
        <Header
          isBoardModalOpen={isBoardModalOpen}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {/* Sidebar */}
      {windowSize[0] >= 768 && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Columns Section */}
      <div
        className={`flex overflow-x-auto h-screen gap-6 ${
          windowSize[0] >= 768 && isSideBarOpen ? "ml-[261px]" : ""
        } bg-[#f4f7fd] dark:bg-[#20212c] scrollbar-hide pt-[90px]`}
      >
        {columns.length > 0 ? (
          <>
            {columns.map((col, index) => (
              <Column key={index} colIndex={index} />
            ))}

            {/* Add New Column */}
            <div
              onClick={() => setIsBoardModalOpen(true)}
              className="h-full flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] dark:bg-[#2b2c37]/40 text-[#828FA3] rounded-lg min-w-[280px] mx-5"
            >
              + New Column
            </div>
          </>
        ) : (
          <EmptyBoard type="edit" />
        )}
      </div>

      {/* Board Modal */}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
