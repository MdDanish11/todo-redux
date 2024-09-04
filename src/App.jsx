// src/App.jsx
import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import AuthButton from './components/AuthButton';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [weather, setWeather] = useState(null);
  const key = "a1d9c445802e1d4ceb6f9b29e5cb97cd";
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const fetchWeather = (location) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);

    // Fetch weather only if the task is an outdoor activity
    if (task.isOutdoor) {
      fetchWeather(task.name);
    }
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
  };

  const toggleComplete = (taskToToggle) => {
    setTasks(tasks.map(task =>
      task === taskToToggle ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="app-container">
      <h1>Advanced To-Do Application</h1>
      <AuthButton />
      {isAuthenticated && (
        <>
          <TaskInput addTask={addTask} />
          <TaskList tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete} />
        </>
      )}
      {weather && (
        <div className="weather-info">
          <h2>Weather for {weather.name}:</h2>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
