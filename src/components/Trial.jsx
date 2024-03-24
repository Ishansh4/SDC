import React, { useEffect, useState } from "react";
import "./Trial.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Trial = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [regno, setRegno] = useState("");
  const [data, setData] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [newselectedField, setNewSelectedField] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showChangeElectiveForm, setShowChangeElectiveForm] = useState(false);
  const [adminRequestSent, setAdminRequestSent] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.post("http://localhost:8000/sendData", {});
      if (response.data === "fail") {
        alert("Failed to fetch data");
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchRelatedData(selectedName) {
    try {
      const response = await axios.post("http://localhost:8000/fetchRelatedData", {
        selectedName: selectedName,
      });
      if (response.data === "fail") {
        alert("Failed to fetch related data");
      } else {
        setRelatedData(response.data);
      }
    } catch (error) {
      console.error("Error fetching related data:", error);
    }
  }

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedName(selectedValue);
    await fetchRelatedData(selectedValue);
  };

  const handleButtonClick = (field) => {
    setSelectedField(selectedField === field ? "" : field);

    const selectedFieldData = relatedData.find((item) => item.field === field);
    if (selectedFieldData) {
      setTotalSeats(selectedFieldData.totalseats);
    }
  };
  const handleButtonClick2 = (field) => {
    setNewSelectedField(field === newselectedField ? "" : field);
  
    const selectedFieldData = relatedData.find((item) => item.field === field);
    if (selectedFieldData) {
      setTotalSeats(selectedFieldData.totalseats);
    }
  };
  

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/first", {
        name,
        regno,
        selectedField,
        selectedName,
        totalSeats,
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    }
  }
  async function submit2(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/second", {
        name,
        regno,
        selectedField,
        newselectedField
      });
      setAdminRequestSent(true); // Update state when admin request is sent
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    }
  }

  const clearForm = () => {
    setName("");
    setRegno("");
    setSelectedName("");
    setSelectedField("");
    setRelatedData([]);
    setTotalSeats(0);
    setFormSubmitted(false);
  };

  const handleOpenElectiveChange = () => {
    setShowChangeElectiveForm(true);
  };


  return (
    <div className="container">
      <div>
        <h2>{formSubmitted ? "Form Submitted Successfully!" : "Open Elective Form"}</h2>
        {!formSubmitted && !adminRequestSent && (
          <form onSubmit={submit}>
            <div className="input-container">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
            <div className="input-container">
              <label>Registration Number</label>
              <input type="text" value={regno} onChange={(e) => setRegno(e.target.value)} placeholder="Regno" />
            </div>

            <div className="select-container">
              <label>Select Branch</label>
              <select value={selectedName} onChange={handleSelectChange}>
                <option value="">Select a name</option>
                {data.map((e) => (
                  <option key={e._id} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="radio-container">
              {relatedData.length > 0 && (
                <div>
                  {relatedData.map((e, index) => (
                    <div key={index}>
                      <button
                        className={selectedField === e.field ? "selected" : ""}
                        onClick={() => handleButtonClick(e.field)}
                        type="button" // Prevent form submission
                      >
                        {e.field} ({e.totalseats} seats)
                      </button>
                      {selectedField === e.field && (
                        <div className="description">
                          <h2>{e.field}</h2>
                          <p>{e.description}</p>
                          <button class="bope">Confirm</button>

                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="button-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
        {formSubmitted && !adminRequestSent && (
          <div className="button-container">
            <button onClick={handleOpenElectiveChange}>Change Open Elective</button>
          </div>
        )}
        {adminRequestSent && (
          <div>
            <p>Request sent to the admin.</p>
            <div className="button-container">
              <button onClick={() => history("/")}>Go Back to Home</button>
            </div>
          </div>
        )}
      </div>
      {showChangeElectiveForm && (
        <div>
          <h2>Change Open Elective</h2>
          <form onSubmit={submit2}>
            <div className="input-container">
              <label>Existing Elective Choice</label>
              <input
                type="text"
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                placeholder="New Elective"
              />
            </div>
            <div className="radio-container">
              {relatedData.length > 0 && (
                <div>
                  {relatedData.map((e, index) => (
  <div key={index}>
    <button
      className={newselectedField === e.field ? "selected" : ""}
      onClick={() => handleButtonClick2(e.field)}
      type="button"
    >
      {e.field} ({e.totalseats} seats)
    </button>
    {newselectedField === e.field && (
      <div className="description">
        <h2>{e.field}</h2>
        <p>{e.description}</p>
        <button className="bope">Confirm</button>
      </div>
    )}
  </div>
))}
                </div>
              )}
            </div>
            <div className="button-container">
              <button className="elebun" type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Trial;