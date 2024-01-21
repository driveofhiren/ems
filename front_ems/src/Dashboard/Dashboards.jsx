import React from 'react';
import { Link } from 'react-router-dom';
import "../components/style.css";


function Dashboards({ Child }) {
  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Employee Management System</h1>
        <div className="navigation-links nav">
         <Link to={"/"}>Home</Link>
            <Link to={"/create"}>Create</Link>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="info-section">
        </div>

        {Child}
      </div>

      <div className="footer">
        <p>&copy; Hiren Gohil 2023 Employee Management System</p>
      </div>
    </div>
  );
}

export default Dashboards;
