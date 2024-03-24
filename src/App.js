
import First from './components/First';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";







import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/first' element={<First />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
