// src/modals/AddEditTaskModal.jsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

function AddEditTaskModal({
  type,
  device,
  setIsAddTaskModalOpen = () => {},
  setIsTaskModalOpen = () => {},
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find((b) => b.isActive);
  const columns = board?.columns || [];

  const col = columns[prevColIndex];
  const task = col?.tasks?.[taskIndex];

  const [status, setStatus] = useState(col?.name || "");
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  // ✅ Load data for editing
  if (type === "edit" && isFirstLoad && task) {
    setTitle(task.title);
    setDescription(task.description);
    setSubtasks(
      task.subtasks.map((st) => ({
        ...st,
        id: uuidv4(),
      }))
    );
    setIsFirstLoad(false);
  }

  const onDelete = (id) =>
    setSubtasks((prev) => prev.filter((st) => st.id !== id));

  const onChangeSubtasks = (id, newValue) =>
    setSubtasks((prev) =>
      prev.map((st) => (st.id === id ? { ...st, title: newValue } : st))
    );

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    if (!title.trim()) return false;
    for (let st of subtasks) if (!st.title.trim()) return false;
    return true;
  };

  const onSubmit = () => {
    if (!validate()) {
      setIsValid(false);
      return;
    }
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
    setIsAddTaskModalOpen(false);
    setIsTaskModalOpen(false);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAddTaskModalOpen(false);
      }}
       className={`fixed inset-0 flex items-center justify-center bg-[#00000080] z-50 overflow-y-auto ${
    device === "mobile" ? "pb-40" : ""
  }`}
>
      
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg mb-6">
          {type === "edit" ? "Edit Task" : "Add New Task"}
        </h3>

        <label className="text-sm text-gray-500 dark:text-white">
          Task Name
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="mt-1 w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-[#635fc7]"
          placeholder="e.g. Take coffee break"
        />

        <label className="mt-5 text-sm text-gray-500 dark:text-white">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-sm min-h-[120px] focus:outline-[#635fc7]"
          placeholder="e.g. This break will recharge your batteries"
        />

        <label className="mt-5 text-sm text-gray-500 dark:text-white">
          Subtasks
        </label>
        {subtasks.map((st, i) => (
          <div key={st.id} className="flex items-center mt-2">
            <input
              value={st.title}
              onChange={(e) => onChangeSubtasks(st.id, e.target.value)}
              className="flex-grow bg-transparent border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-[#635fc7]"
            />
            <img
              src={crossIcon}
              alt="delete"
              className="ml-3 cursor-pointer"
              onClick={() => onDelete(st.id)}
            />
          </div>
        ))}

        <button
          className="w-full mt-4 py-2 bg-[#635fc7] text-white rounded-full"
          onClick={() =>
            setSubtasks((prev) => [
              ...prev,
              { title: "", isCompleted: false, id: uuidv4() },
            ])
          }
        >
          + Add New Subtask
        </button>

        <label className="mt-5 text-sm text-gray-500 dark:text-white">
          Current Status
        </label>
        <select
          value={status}
          onChange={onChangeStatus}
          className="w-full mt-2 bg-transparent border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-[#635fc7]"
        >
          {columns.map((col, i) => (
            <option key={i}>{col.name}</option>
          ))}
        </select>

        <button
          onClick={onSubmit}
          className="w-full mt-6 py-2 bg-[#635fc7] text-white rounded-full"
        >
          {type === "edit" ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
