import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the Admin Dashboard. Here you can manage user data and monitor activities.</p>

      <div className="admin-actions">
        <button className="admin-btn">View Users</button>
        <button className="admin-btn">Manage Workouts</button>
        <button className="admin-btn">View Reports</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
