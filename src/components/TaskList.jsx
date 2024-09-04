// src/components/TaskList.jsx
import React from 'react';

const TaskList = ({ tasks, deleteTask, toggleComplete }) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div 
          key={index} 
          className={`task-item ${task.priority.toLowerCase()} ${task.completed ? 'completed' : ''}`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task)}
          />
          <span>{task.name}</span>
          <span className="priority">{task.priority}</span>
          <button onClick={() => deleteTask(task)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
