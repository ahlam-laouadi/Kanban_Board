import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {

  const [tasks, setTasks] = useState([
    {
      id: "TRE-1",
      owner: "Ahmed ahmed",
      title: "Creating interface for the api to us any scraping implementation",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates magnam, vero et veritatis nisi nemo debitis sint repellendus assumenda nihil laudantium, dicta quo. Voluptate dolore deleniti amet quibusdam. Necessitatibus",
      column: "backlog",
      priority: 8,
    },
    {
      id: "TRE-2",
      owner: "Ahlam ahlam",
      title: "credit limit estimator",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates magnam, vero et veritatis nisi nemo debitis sint repellendus assumenda nihil laudantium, dicta quo. Voluptate dolore deleniti amet quibusdam. Necessitatibus",
      column: "inReview",
      priority: 5,
    },
    {
      id: "TRE-3",
      owner: "Ilham ilham",
      title: "Api Organization and Documentation",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates magnam, vero et veritatis nisi nemo debitis sint repellendus assumenda nihil laudantium, dicta quo. Voluptate dolore deleniti amet quibusdam. Necessitatibus",
      column: "done",
      priority: 1,
    },
    {
      id: "TRE-4",
      owner: "Samah samah",
      title: "Credit Limit ml",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates magnam, vero et veritatis nisi nemo debitis sint repellendus assumenda nihil laudantium, dicta quo. Voluptate dolore deleniti amet quibusdam. Necessitatibus",
      column: "backlog",
      priority: 2,
    },
    {
      id: "TRE-5",
      owner: "Mohamed mohamed",
      title: "Evaluate invoice AI",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates magnam, vero et veritatis nisi nemo debitis sint repellendus assumenda nihil laudantium, dicta quo. Voluptate dolore deleniti amet quibusdam. Necessitatibus",
      column: "inProgress",
      priority: 2,
    },
   
  ]);


  const columnsData = {
    "Backlog": {
      name: "Backlog",
      items: [...tasks.filter(item => item.column === 'backlog')],
    },
    "To do": {
      name: "To do",
      items: [...tasks.filter(item => item.column === 'todo')],
    },
    "In Progress": {
      name: "In Progress",
      items: [...tasks.filter(item => item.column === 'inProgress')],
    },
    "In Review": {
      name: "In Review",
      items: [...tasks.filter(item => item.column === 'inReview')],
    },
    "Done": {
      name: "Done",
      items: [...tasks.filter(item => item.column === 'done')],
    },
  };


  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this item")) {
      setTasks(tasks.filter((item) => item.id !== id));
    }
  };

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(tasks)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };


  const addTask = (newTask) => {
    newTask.id = uuidv4();
    setTasks([newTask, ...tasks]);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        columnsData,
        deleteTask,
        addTask,
        exportData
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;