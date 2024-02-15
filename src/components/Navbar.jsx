import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // You can add additional logic here, such as navigating to a different page.
  };

  return (
    <nav>
        <img className='logo' src="Manipal University1679046981_upload_logo.jpg" alt="img" />
      <ul>
        <li className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>
          Report
        </li>
        <input className='serachbar' type="text" placeholder='Search' style={{ borderRadius: 50 }} />
        <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => handleTabClick('contact')} >
          219301057::ISHANSH TAUNK
          <img src="3135715.png" alt="pro" className="pro" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
