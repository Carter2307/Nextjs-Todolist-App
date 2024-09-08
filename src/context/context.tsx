"use client";

import React, { ReactNode } from "react";

interface AppContextProps {
  tasks: Task[];
  deleteAll: () => void;
  add: (task: Task) => void;
  setCompleted: (id: number, value: boolean) => void;
}

const AppContext = React.createContext<AppContextProps>({
  tasks: [],
  deleteAll: () => null,
  add: () => null,
  setCompleted: (id) => null,
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [localTasks, setLocalTasks] = React.useState("");
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const taskSample =  {
    id: 1,
    description: "Préparer une présentation pour la réunion de lundi",
    completed: false,
    createAt: Date.now(),
  }

  React.useEffect(() => {
    const localTasksString = window.localStorage.getItem("app-tasks");

    if (localTasksString) {
      const t: Task[] = JSON.parse(localTasksString);
      if (t) {
        setTasks((prev) => [...tasks, ...t]);
      }
    }
  }, []);

  const deleteAll = () => {
    setTasks([]);
    window.localStorage.setItem("app-tasks", "");
  };

  const update = (t: Task[]) => {
    setTasks(t);
    localStorage.setItem("app-tasks", JSON.stringify(t));
  };

  const add = (task: Task) => {
    const t = [...tasks, task];
    update(t);
  };

  const setCompleted = (id: number, value: boolean) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = value;
      }
      return task;
    });

    console.log(updatedTasks);

    update(updatedTasks);
  };

  return (
    <AppContext.Provider value={{ tasks, deleteAll, add, setCompleted }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
