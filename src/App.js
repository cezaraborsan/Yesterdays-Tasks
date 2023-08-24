import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showUncompleted, setShowUncompleted] = useState(false); // Changed the state name

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { ...task, id: tasks.length + 1 };
    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const updateTask = (taskId, newTitle, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, title: newTitle, description: newDescription }
        : task
    );
    setTasks(updatedTasks);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="App">
        <h1> Yesterday's Tasks </h1>
        <TaskForm addTask={addTask} />
        <TaskList
          tasks={
            showUncompleted ? tasks.filter((task) => !task.completed) : tasks
          }
          deleteTask={deleteTask}
          updateTask={updateTask}
          toggleComplete={toggleComplete}
        />

        <div className="completed-tasks">
          <label>
            <input
              type="checkbox"
              checked={showUncompleted}
              onChange={() => setShowUncompleted(!showUncompleted)}
            />
            Show Uncompleted Tasks
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
