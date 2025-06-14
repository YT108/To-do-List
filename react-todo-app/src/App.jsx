import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State: input, tasks, filter
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all | completed | active

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (taskInput.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }
    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setTaskInput('');
  };

  // Remove Task
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle Complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filtered Tasks
  const getFilteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else if (filter === 'active') {
      return tasks.filter(task => !task.completed);
    } else {
      return tasks;
    }
  };

  // Sort tasks by completed status (optional)
  const sortedTasks = [...getFilteredTasks()].sort((a, b) => a.completed - b.completed);

  return (
    <div className="app">
      <h1>React To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filter-section">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <ul className="task-list">
        {sortedTasks.length === 0 && <li>No tasks to show.</li>}
        {sortedTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => removeTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
