import React from 'react';
import './SidePanel.css';

const SidePanel = () => {
  return (
    <div className="side-panel">

      <button className="nav-button">
        Home
      </button>



      <h3 className="Head">
        Menu
        </h3>
      <button className="nav-button">
      Academics 
      </button>
      <button className="nav-button">
      Examination 
      </button>
    </div>
  );
};


export default SidePanel;
