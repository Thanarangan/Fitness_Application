import React, { useEffect } from 'react';
import './App.css';

const WorkoutHistory = ({ workouts, fetchWorkouts }) => {
  useEffect(() => {
    fetchWorkouts(); // Fetch workouts on first render
  }, []);

  return (
    <div className="workout-history-container">
      <h2 className="workout-history-title">Workout History</h2>
      {workouts.length === 0 ? (
        <p>No workouts recorded yet.</p>
      ) : (
        <ul className="workout-list">
          {workouts.map((workout) => (
            <li key={workout._id} className="workout-item">
              <strong>Workout:</strong> {workout.workoutType} <br />
              <strong>Duration:</strong> {workout.duration} mins <br />
              <strong>Date:</strong> {new Date(workout.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutHistory;
