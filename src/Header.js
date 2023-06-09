import React, { useContext } from "react";

import TasksContext from "./context/TasksContext";

const Header = () => {
  const { exportData } = useContext(TasksContext);
  return (
    <div className="header">
      <h2 className="logo">Kanban Board</h2>
      <button className="btn" type="button" onClick={exportData}>
        Export Data
      </button>
    </div>
  );
};

export default Header;
