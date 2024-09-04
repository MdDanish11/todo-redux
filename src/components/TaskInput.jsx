// src/components/TaskInput.jsx
import React, { useState } from 'react';

const TaskInput = ({ addTask, setInputValue }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isOutdoor, setIsOutdoor] = useState(false);

  const handleInputChange = (e) => {
    setTask(e.target.value);
    setInputValue(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleOutdoorChange = (e) => {
    setIsOutdoor(e.target.checked);
  };

  const handleAddTask = () => {
    if (task) {
      addTask({ name: task, priority, isOutdoor, completed: false });
      setTask('');
      setPriority('Medium');
      setIsOutdoor(false);
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        placeholder="Enter task"
      />
      <select value={priority} onChange={handlePriorityChange}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={isOutdoor}
          onChange={handleOutdoorChange}
        />
        Outdoor Activity
      </label>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;
