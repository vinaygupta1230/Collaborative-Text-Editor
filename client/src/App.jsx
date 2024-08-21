import React from 'react';
import { BrowserRouter as Router, Route , Routes, Navigate} from 'react-router-dom';
// import { v4 as uuidV4 } from "uuid"
import Home from '../pages/Home/home';
import Login from '../pages/LoginSignup/login';
import Signup from '../pages/LoginSignup/signup';
import Dashboard from '../pages/DashBoard/dashboard';
import TextEditor from '../pages/TextEditor/texteditor';

const App = () => {

  return (
    <Router>
      
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/:username/dashboard" element={<Dashboard/>} />
          {/* <Route path="/:username/newdoc"  element={<Navigate to={`/:username/documents/${uuidV4()}`} />}></Route>
          <Route path={`/:username/documents/:id`} element={<TextEditor />}></Route> */}
          {/* <Route path={`/:username/documents/${uuidV4()}`}  element={<Navigate to={`/:username/documents/${uuidV4()}`} />}></Route> */}
          <Route path={`/:username/documents/:id`} element={<TextEditor />}></Route>
        </Routes>
      
    </Router>
  );
};

export default App;