import React, { useState } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import ElipsisMenu from "./ElipsisMenu";

function Header({ isEmployee, setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((b) => b.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((prev) => !prev);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4 fixed top-0 left-0 right-0 bg-white dark:bg-[#2b2c37] z-50 shadow-md">
      <header className="flex justify-between items-center dark:text-white">
        {/* Left: Logo + Board name */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={Logo} alt="Logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block md:text-4xl font-bold">kanban</h3>
          {board && (
            <div className="flex items-center">
              <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20">
                {board.name}
              </h3>
              {!isEmployee && (
                <img
                  src={openDropdown ? iconUp : iconDown}
                  alt="dropdown"
                  className="w-3 ml-2 md:hidden cursor-pointer"
                  onClick={onDropdownClick}
                />
              )}
            </div>
          )}
        </div>

        {/* Right: Admin-only buttons */}
        {!isEmployee && (
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              className="hidden md:block px-3 py-1 bg-[#635FC7] text-white rounded hover:bg-[#5245c2]"
              onClick={() => setIsTaskModalOpen((prev) => !prev)}
            >
              + Add New Task
            </button>
            <button
              className="md:hidden px-2 py-1 bg-[#635FC7] text-white rounded"
              onClick={() => setIsTaskModalOpen((prev) => !prev)}
            >
              +
            </button>
            <img
              src={elipsis}
              alt="elipsis"
              className="h-6 cursor-pointer"
              onClick={() => {
                setBoardType("edit");
                setOpenDropdown(false);
                setIsElipsisMenuOpen((prev) => !prev);
              }}
            />
            {isElipsisMenuOpen && (
              <ElipsisMenu
                type="Boards"
                setOpenEditModal={setOpenEditModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            )}
          </div>
        )}

        {/* Dropdown menu for admin */}
        {openDropdown && !isEmployee && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>

      {/* Modals */}
      {isTaskModalOpen && (
        <AddEditTaskModal setIsAddTaskModalOpen={setIsTaskModalOpen} type="add" device="desktop" />
      )}
      {isBoardModalOpen && (
        <AddEditBoardModal setBoardType={setBoardType} type={boardType} setIsBoardModalOpen={setIsBoardModalOpen} />
      )}
      {isDeleteModalOpen && board && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
