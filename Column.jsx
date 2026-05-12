import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";

function Column({ colIndex, isEmployee }) {
  const colors = ["bg-red-500","bg-orange-500","bg-blue-500","bg-purple-500","bg-green-500","bg-indigo-500","bg-yellow-500","bg-pink-500","bg-sky-500"];
  const dispatch = useDispatch();
  const [color, setColor] = useState(null);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const col = board.columns[colIndex];

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  const handleOnDrop = (e) => {
    if (isEmployee) return; // employees cannot drag
    const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text"));
    if (colIndex !== prevColIndex) {
      dispatch(boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  };

  const handleOnDragOver = (e) => {
    if (!isEmployee) e.preventDefault();
  };

  return (
    <div onDrop={handleOnDrop} onDragOver={handleOnDragOver} className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]">
      <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        {col.name} ({col.tasks.length})
      </p>

      <div className="flex flex-col gap-4 mt-4">
        {col.tasks.map((task, index) => (
          <Task key={index} colIndex={colIndex} taskIndex={index} isEmployee={isEmployee} />
        ))}
      </div>
    </div>
  );
}

export default Column;
