// App.js
import TasksProvider from "./contexts/TasksContext";
import MainToDo from "./component/MainToDo";

function App() {
  return (
    <TasksProvider>
      <div className="bg-[#e3e9ff] min-h-screen">
        <MainToDo />
      </div>
    </TasksProvider>
  );
}

export default App;
