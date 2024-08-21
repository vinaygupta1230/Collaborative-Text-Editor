// // Signup.js

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = () => {
//     // Handle signup logic here
//     console.log('Signing up with:', email, password);
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleSignup}>Sign Up</button>
//       <p>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Signup;






// Signup.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginSignup.css'; // Import CSS for styling

const Signup = () => {
  const [name, setname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const navigate = useNavigate();

//   const handleSignup = () => {
//     // Handle signup logic here
//     console.log('Signing up with:', email, password);
//   };
  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    console.log("HII");
    const response = await axios.post('http://localhost:3000/auth/signup', { name, username, email, password });
    console.log(response.data); // Just for debugging purposes
    // Handle success scenario
    navigate(`/${username}/dashboard`, { state: response.data});
  } catch (error) {
    setError('An error occurred while logging in');
    console.log(error);
    console.log("Error!!!");
  }
};
return (
  <div className="auth-container">
  <div className="auth-content">
    <h1>Signup</h1>
    {/* <form onSubmit={handleSignup}> */}
      <input type="text" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} required />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {/* <button type="submit">Signup</button> */}
      <button onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    {/* </form> */}
  </div>
  </div>
);
};

//   return (
//     <div className="auth-container">
//       <div className="auth-content">
//         <h2>Sign Up</h2>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button onClick={handleSignup}>Sign Up</button>
//         <p>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;









// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';
// // import './loginSignup.css';
// import axios from 'axios';

// const Signup = () => {
  // const [name, setname] = useState('');
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  // const navigate = useNavigate();

  // const handleSignup = async (e) => {
  //   e.preventDefault();
    // const response = await fetch('/auth/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, username, email, password })
    // });

    // const data = await response.json();
    // alert(data.message);
    // navigate("/:username/dashboard", { state: response.data});

  //   try {
  //     console.log("HII");
  //     const response = await axios.post('http://localhost:3000/auth/signup', { name, username, email, password });
  //     console.log(response.data); // Just for debugging purposes
  //     // Handle success scenario
  //     navigate(`/${username}/dashboard`, { state: response.data});
  //   } catch (error) {
  //     setError('An error occurred while logging in');
  //     console.log(error);
  //     console.log("Error!!!");
  //   }
  // };

//   return (
//     <div>
//       <h1>Signup</h1>
//       <form onSubmit={handleSignup}>
//         <input type="text" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} required />
//         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

export default Signup;







// import React from "react";
// import { Link } from "react-router-dom";

// export default function Signup() {
//   return (
//     <div className="wrapper signUp">
//       <div className="illustration">
//         <img src="https://source.unsplash.com/random" alt="illustration" />
//       </div>
//       <div className="form">
//         <div className="heading">CREATE AN ACCOUNT</div>
//         <form>
//           <div>
//             <label htmlFor="name">Name</label>
//             <input type="text" id="name" placeholder="Enter your name" />
//           </div>
//           <div>
//             <label htmlFor="name">E-Mail</label>
//             <input type="text" id="name" placeholder="Enter your mail" />
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter you password"
//             />
//           </div>
//           <button type="submit">Submit</button>
//           <h2 align="center" class="or">
//             OR
//           </h2>
//         </form>
//         <p>
//           Have an account ? <Link to="/"> Login </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
