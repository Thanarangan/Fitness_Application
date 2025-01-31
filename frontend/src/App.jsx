import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import WorkoutHistory from './WorkoutHistory';
import WorkoutForm from './WorkoutForm';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]); // Store workouts here

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setUser(role);
    }
  }, []);

  const fetchWorkouts = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/workouts/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/workout" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/workout"
          element={user ? (
            <div className="workout-page">
              <WorkoutForm fetchWorkouts={fetchWorkouts} />
              <WorkoutHistory workouts={workouts} fetchWorkouts={fetchWorkouts} />
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
