import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";
import boardsSlice from "../redux/boardsSlice";

function HeaderDropdown({ setOpenDropdown, setBoardModalOpen }) {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpenDropdown(false);
      }}
    >
      {/* Sidebar */}
      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-[260px] h-[calc(100vh-64px)] mt-[64px] overflow-y-auto rounded-r-2xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-6 mt-6 mb-6 text-sm tracking-wider">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className="space-y-1">
          {boards.map((board, index) => (
            <div
              key={index}
              onClick={() => dispatch(boardsSlice.actions.setBoardActive({ index }))}
              className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all duration-200 ${
                board.isActive
                  ? "bg-[#635fc7] text-white rounded-r-full"
                  : "text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-[#3a3b45]"
              }`}
            >
              <img src={boardIcon} alt="board" className="h-4 opacity-80" />
              <p className="text-base font-semibold">{board.name}</p>
            </div>
          ))}

          <div
            className="flex items-center gap-3 px-6 py-3 cursor-pointer text-[#635fc7] hover:opacity-75"
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropdown(false);
            }}
          >
            <img src={boardIcon} className="h-4" alt="create" />
            <p className="text-base font-semibold">+ Create New Board</p>
          </div>
        </div>

        {/* Theme toggle */}
        <div className="mx-4 mt-8 mb-6 p-4 space-x-3 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
          <img src={lightIcon} alt="light mode" />
          <Switch
            checked={darkSide}
            onChange={toggleDarkMode}
            className={`${
              darkSide ? "bg-[#635fc7]" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                darkSide ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <img src={darkIcon} alt="dark mode" />
        </div>
      </div>
    </div>
  );
}

export default HeaderDropdown;
