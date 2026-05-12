import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import Sidebar from "./Sidebar";
import EmptyBoard from "./EmptyBoard";
import Header from "./Header";



function Home({ isEmployee }) {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((b) => b.isActive);
  const columns = board?.columns || [];

  useEffect(() => {
    const handleWindowResize = () => setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className="h-screen flex flex-col dark:bg-[#20212c]">
      {/* Header (fixed, always visible) */}
      <Header
        isEmployee={isEmployee}
        setIsBoardModalOpen={setIsBoardModalOpen}
        isBoardModalOpen={isBoardModalOpen}
      />

      {/* Main content */}
      <div
        className={`flex flex-1 overflow-x-auto gap-6 bg-[#f4f7fd] dark:bg-[#20212c] pt-[72px] ${windowSize[0] >= 768 && isSideBarOpen ? "ml-[261px]" : ""}`}
      >
        {/* Sidebar (desktop only) */}
        {windowSize[0] >= 768 && (
          <Sidebar
            isEmployee={isEmployee}
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            setIsBoardModalOpen={setIsBoardModalOpen}
            isBoardModalOpen={isBoardModalOpen}
          />
        )}

        {/* Columns */}
        {columns.length > 0 ? (
          <>
            {columns.map((col, index) => (
              <Column key={index} colIndex={index} isEmployee={isEmployee} />
            ))}

            {/* Add Column button only for admin */}
            {!isEmployee && (
              <div
                onClick={() => setIsBoardModalOpen(true)}
                className="h-full flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] dark:bg-[#2b2c37]/40 text-[#828FA3] rounded-lg min-w-[280px] mx-5"
              >
                + New Column
              </div>
            )}
          </>
        ) : (
          <EmptyBoard type="edit" isEmployee={isEmployee} />
        )}

        {/* Board Modal */}
        {isBoardModalOpen && (
          <AddEditBoardModal type="edit" setIsBoardModalOpen={setIsBoardModalOpen} />
        )}
      </div>
    </div>
  );
}

export default Home;
