import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Admin.css"

const Admin = () => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.post("http://localhost:8000/sendData2", {});
            if (response.data === "fail") {
                alert("Failed to fetch data");
            } else {
                setData(response.data.map((item, index) => ({...item, serial: index + 1})));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function fetchData2() {
        try {
            const response = await axios.post("http://localhost:8000/sendData3", {});
            if (response.data === "fail") {
                alert("Failed to fetch data");
            } else {
                setData2(response.data.map((item, index) => ({...item, serial: index + 1}))); 
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    async function fetchData3() {
        try {
            const response = await axios.post("http://localhost:8000/sendData4", {});
            if (response.data === "fail") {
                alert("Failed to fetch data");
            } else {
                setData3(response.data.map((item, index) => ({...item, serial: index + 1}))); 
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleReplaceField = async (name, newField) => {
        try {
            const updatedData = data.map(item => {
                if (item.name === name) {
                    return {...item, selectedField: newField};
                }
                return item;
            });

            setData(updatedData);

            // Filter out the entry from data2
            const filteredData2 = data2.filter(item => item.name !== name);
            setData2(filteredData2);

            // Display a popup that data is updated
            alert("Data is updated successfully!");

            // Make a backend API call to update the database
            await axios.post("http://localhost:8000/updateData", { name, newField });

        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const downloadDataFile = () => {
        // Prepare data in CSV format
        const csvContent = "data:text/csv;charset=utf-8,"
            + data.map(item => Object.values(item).join(",")).join("\n");

        // Create a link element and trigger download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "student_data.csv");
        document.body.appendChild(link); // Required for Firefox
        link.click();
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="left">
                    <img src="Manipal University1679046981_upload_logo.jpg" alt="Logo" className="logo" />
                    <ul className="menu">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#student-list">Student List</a></li>
                        <li><a href="#server-status">Server Status</a></li>
                        <li><a href="#logout">Log Out</a></li>
                        {/* Add more menu items as needed */}
                    </ul>
                </div>
                <div className="right">
                    <h1>Admin Panel</h1>
                </div>
            </nav>

            {/* Side panel */}
            <div className="sidepanel">
                <button className="side-button" >Add Student</button>
                <button className="side-button">Add Elective</button>
                <button className="side-button">Filter</button>
                <button className="side-button" onClick={downloadDataFile}>Download List</button>
                <button className="side-button">Assign Faculty</button>
                <button className="side-button">Send Reminder</button>
                {/* Add admin options here */}
            </div>

            {/* Main content */}
            <div className="main-content">
                <div className="stu">
                    <h2>Student Master Data</h2>
                    <div className="inside">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Name</th>
                                    <th>Registration Number</th>
                                    <th>Branch</th>
                                    <th>Open Elective</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(e => (
                                    <tr key={e._id}>
                                        <td>{e.serial}</td>
                                        <td>{e.name}</td>
                                        <td>{e.regno}</td>
                                        <td>{e.selectedName}</td>
                                        <td>{e.selectedField}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="stu2">
                    <h2>Student Change Request</h2>
                    <div className="inside2">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Name</th>
                                    <th>Registration Number</th>
                                    <th>Old Elective</th>
                                    <th>New Elective</th>
                                    <th>Change it Now</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data2.map(m => (
                                    <tr key={m._id}>
                                        <td>{m.serial}</td>
                                        <td>{m.name}</td>
                                        <td>{m.regno}</td>
                                        <td>{m.selectedField}</td>
                                        <td>{m.newselectedField}</td>
                                        <td>
                                            <button onClick={() => handleReplaceField(m.name, m.newselectedField)}>Change</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="stu3">
                    <h2>Open Electives</h2>
                    <div className="inside3">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Branch</th>
                                    <th>Elective</th>
                                    <th>Seats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data3.map(n => (
                                    <tr key={n._id}>
                                        <td>{n.serial}</td>
                                        <td>{n.name}</td>
                                        <td>{n.field}</td>
                                        <td>{n.totalseats}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
