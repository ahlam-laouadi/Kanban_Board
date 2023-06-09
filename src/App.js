import React from "react";
import "./App.css";
import DragList from "./DragList";
import Header from "./Header";

import { TasksProvider } from "./context/TasksContext";

function App() {
  return (
    <TasksProvider>
      <Header />
      <DragList/>
    </TasksProvider>
  );
}

export default App;
