import React, { useEffect, useState }  from "react";
import './Trial.css';
import axios from 'axios'

const Trial = () => {
  
  const [name, setName]=useState('');
  const [age, setAge]=useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    const data = {
      Name:name,
      Age:age,
      SelectedCountry:selectedCountry,
      SelectedState:selectedState
    }
    axios.post('https://sheetdb.io/api/v1/qrek0ltl9zybl',data).then(response=>{
      // console.log(response);
      setName('');
      setAge('');
      setSelectedCountry('');
      setSelectedState('');
    })
    alert("Your is Sucessfully Submitted");
  }
  
  const countries = [
    { id: 1, name: 'CSE', states: ['Graphic Design', 'Basics of Data Science', 'Stories as Therapy', 'Development Studies', 'Environment and Sustainable Agriculture', 'Stories as Therapy', 'Python Programming', 'Psychology of Health and Wellbeing'] },
    { id: 2, name: 'AIML', states: ['Graphic Design', 'Basics of Data Science', 'Stories as Therapy', 'Development Studies', 'Environment and Sustainable Agriculture', 'Stories as Therapy', 'Python Programming', 'Psychology of Health and Wellbeing']},
    { id: 3, name: 'CCE', states: ['Graphic Design', 'Basics of Data Science', 'Stories as Therapy', 'Development Studies', 'Environment and Sustainable Agriculture', 'Stories as Therapy', 'Python Programming', 'Psychology of Health and Wellbeing'] },
    { id: 4, name: 'Mechanial', states: ['Graphic Design', 'Basics of Data Science', 'Stories as Therapy', 'Development Studies', 'Environment and Sustainable Agriculture', 'Stories as Therapy', 'Python Programming', 'Psychology of Health and Wellbeing'] },
    { id: 5, name: 'Electronics', states: ['Graphic Design', 'Basics of Data Science', 'Stories as Therapy', 'Development Studies', 'Environment and Sustainable Agriculture', 'Stories as Therapy', 'Python Programming', 'Psychology of Health and Wellbeing'] },
    { id: 6, name: 'Electrical', states: ['Graphic Design', 'Basics of Data Science', 'Stories as Therapy', 'Development Studies', 'Environment and Sustainable Agriculture', 'Stories as Therapy', 'Python Programming', 'Psychology of Health and Wellbeing'] }
  ];

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState('');
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
  };

  return (
    <div className="inputs">
      <h1 className="head">Open Elective Form</h1>
      <form autoComplete="off" className="form-group" onSubmit={handleSubmit}>
         
      <p className="name">Name</p>
      <input className="list" type="text" 
      onChange={(e)=>setName(e.target.value)} value={name}/>
      <p className="name">Reg_No</p>
      <input className="list" type="text" onChange={(e)=>setAge(e.target.value)} value={age} />
      <div>

      <p className="names">Branch</p>
      <select className="lists" onChange={handleCountryChange} value={selectedCountry}>
        <option value="" >Select Branch</option>
        {countries.map(country => (
          <option key={country.id} value={country.name} >{country.name}</option>
          ))}
      </select>
        </div>

      {selectedCountry && (
        <div>
       <p className="names">Open_elective</p>
       <select className="lists" onChange={handleStateChange} value={selectedState}>
            <option value="">Select OpenElective</option>
            {countries.find(country => country.name === selectedCountry)?.states.map(state => (
              <option key={state} value={state}>{state}</option>
              ))}
          </select>
          
        </div>
      )}
<button className="enter" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Trial;
