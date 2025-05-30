import React, { useState } from 'react';
import './todolist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [animatingTask, setAnimatingTask] = useState(null);

  const handleAddTask = () => {
    if (input.trim() === '') return;
    const newTask = { text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput('');

    // Button animation
    const button = document.querySelector('.add-button');
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 200);
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setAnimatingTask(index);
    setTimeout(() => {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      setAnimatingTask(null);
    }, 300);
  };

  return (
    <div className="wrapper">
      <div className="todo-container">
        <h1 className="todo-title">TODO LIST</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Add your Task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="todo-input"
          />
          <button onClick={handleAddTask} className="add-button">
            Add Task
          </button>
        </div>

        <div className="task-list">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`task ${
                animatingTask === index ? 'fade-out' : 'fade-in'
              } ${task.completed ? 'checked-task' : ''}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
                className="checkbox"
              />
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(index)} className="delete-button">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
