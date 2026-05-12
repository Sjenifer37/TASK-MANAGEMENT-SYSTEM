import React, { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function EmptyBoard({ type, isEmployee = false }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col items-center justify-center">
      <h3 className="text-gray-500 font-bold text-center">
        {type === "edit"
          ? "This board is empty."
          : "No boards are available."}
      </h3>

      {/* ✅ Show Add buttons only for admin */}
      {!isEmployee && (
        <button
          onClick={() => setIsBoardModalOpen(true)}
          className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full"
        >
          {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
        </button>
      )}

      {!isEmployee && isBoardModalOpen && (
        <AddEditBoardModal type={type} setIsBoardModalOpen={setIsBoardModalOpen} />
      )}
    </div>
  );
}

export default EmptyBoard;
