import SidePanel from './SidePanel';
import './Home.css';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleSelectOpenElective = () => {
    navigate("/first");
  };

  const handleChangeOpenElective = () => {
    navigate("/second");
  };
  const handleChangeOpenElective2 = () => {
    navigate("/assign");
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
        <h1>Elective Management System</h1>
        <ul className='list'>
          <li>
            <button onClick={handleSelectOpenElective}>Select An Open Elective</button>
          </li>
          <li>
            <button onClick={handleChangeOpenElective}>Change Open Elective</button>
          </li>
          <li>
            <button onClick={handleChangeOpenElective2}>Upload Assignment</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
