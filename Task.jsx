import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

function Task({ colIndex, taskIndex, isEmployee }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((b) => b.isActive);
  const col = board?.columns[colIndex];
  const task = col?.tasks?.[taskIndex];

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  if (!task) return null;

  const completed = task.subtasks.filter((st) => st.isCompleted).length;

  const handleDrag = (e) => {
    if (!isEmployee) {
      e.dataTransfer.setData("text", JSON.stringify({ prevColIndex: colIndex, taskIndex }));
    }
  };

  return (
    <>
      <div
        draggable={!isEmployee}
        onDragStart={handleDrag}
        onClick={() => setIsTaskModalOpen(true)}
        className="w-[280px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer"
      >
        <p className="font-bold tracking-wide">{task.title}</p>
        <p className="text-xs text-gray-500 mt-2">{completed} of {task.subtasks.length} subtasks</p>
      </div>

      {isTaskModalOpen && (
        <TaskModal setIsTaskModalOpen={setIsTaskModalOpen} colIndex={colIndex} taskIndex={taskIndex} isEmployee={isEmployee} />
      )}
    </>
  );
}

export default Task;
