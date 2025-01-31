import { useState } from 'react';
import './App.css';

const WorkoutForm = ({ fetchWorkouts }) => {
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('User not authenticated');
      return;
    }

    const newWorkout = { workoutType, duration };

    try {
      const response = await fetch('http://localhost:5000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newWorkout),
      });

      if (response.ok) {
        setMessage('Workout added successfully!');
        setWorkoutType('');
        setDuration('');
        fetchWorkouts(); // ✅ Update workout history instantly
      } else {
        const data = await response.json();
        setMessage(data.error || 'Error adding workout');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error');
    }
  };

  return (
    <div className="workout-form-container">
      <h1 className="header">Fitness Tracker</h1>
      <form className="workout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="workoutType">Workout Type</label>
          <input
            type="text"
            id="workoutType"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in minutes)</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Workout</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default WorkoutForm;
