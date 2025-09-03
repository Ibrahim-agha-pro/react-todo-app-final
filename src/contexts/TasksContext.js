// contexts/TasksContext.js
import { createContext, useState, useEffect } from "react";
export let TaskContext = createContext();

// المهام الافتراضية
const initialTasks = [
  { id: 1, task: "Take a shower", done: false },
  { id: 2, task: "Meditate for 10 minutes", done: false },
  { id: 3, task: "Drink coffee", done: true },
  { id: 4, task: "Have breakfast", done: false },
  { id: 5, task: "Go to the gym", done: false },
  { id: 6, task: "Read a book for 30 minutes", done: false },
];

export default function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showNotification, setShowNotification] = useState(false);

  // تحميل المهام من localStorage عند بدء التطبيق
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("todoTasks");
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } else {
        setTasks(initialTasks);
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      setTasks(initialTasks);
    }
  }, []);

  // حفظ المهام في localStorage عند أي تغيير
  useEffect(() => {
    if (tasks.length > 0) {
      try {
        localStorage.setItem("todoTasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
      }
    }
  }, [tasks]);

  function notification() {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
