import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import LogIn from './Components/Routes/LogIn/LogIn';
import SignUp from './Components/Routes/SignUp/SignUp';
import './App.css';

function App() {



  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='login' element={<LogIn />} />
        </Routes>
      </Router>
    </>


  );


}

export default App;
