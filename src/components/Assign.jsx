import React, { useState } from 'react';
import SidePanel from './SidePanel';
import './Home.css';
import { useNavigate } from "react-router-dom";

function Assign() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    // Implement file upload logic here
    if (selectedFile) {
      // You can use selectedFile to upload the file
      console.log("File selected:", selectedFile);
      // Example: Send selectedFile to server for upload
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="whole">
      <div className="nav">
        <nav>
          <img className='logo' src="Manipal University1679046981_upload_logo.jpg" alt="img" />
          <ul>
            <li>
              Report
            </li>
            <input className='serachbar' type="text" placeholder='Search' style={{ borderRadius: 50 }} />
            <img src="3135715.png" alt="pro" className="pro" />
          </ul>
        </nav>
      </div>
      <div className="side">
        <SidePanel/>
      </div>
      <div className="ch">
        <h1>Assignment Upload</h1>
        <div>
          <input type="file" onChange={handleFileChange} accept=".pdf" />
          <button onClick={handleFileUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
}

export default Assign;
