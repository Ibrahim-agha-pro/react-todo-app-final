import { createContext, useState, useEffect } from "react";
export let TaskContext = createContext();

const initialTasks = [
  { id: 1, task: "Take a shower", done: false },
  { id: 2, task: "Meditate for 10 minutes", done: false },
  { id: 3, task: "Drink coffee", done: true },
  { id: 4, task: "Have breakfast", done: false },
  { id: 5, task: "Go to the gym", done: false },
  { id: 6, task: "Read a book for 30 minutes", done: false },
];

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [filter, setFilter] = useState("all");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  function notification(message = "Operation completed successfully") {
    setNotificationMessage(message);
    setShowNotification(true);
    setIsDisabled(true);

    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage("");
      setIsDisabled(false);
    }, 1000);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        filter,
        setFilter,
        notification,
        showNotification,
        notificationMessage,
        isDisabled,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
