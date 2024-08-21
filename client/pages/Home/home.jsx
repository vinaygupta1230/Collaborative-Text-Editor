// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div>
//       <h1>Welcome to Real-Time Collaborative Text Editor</h1>
//       <p>
//         This is a real-time collaborative text editor where multiple users can edit a document simultaneously.
//       </p>
//       <p>
//         To get started, please <Link to="./login">login</Link> or <Link to="/signup">signup</Link>.
//       </p>
//     </div>
//   );
// };

// export default Home;




// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Real-Time Collaborative Text Editor</h1>
        <p>
          This is a real-time collaborative text editor where multiple users can edit a document simultaneously.
        </p>
        <p>
          To get started, please <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
        </p>
      </div>
    </div>
  );
};

export default Home;















// import React from 'react';
// import { Link } from 'react-router-dom';
// import './home.css'; // Import CSS for styling

// const Home = () => {
//   return (
//     <div className="home-container">
//       <div className="home-content">
//         <h1>Welcome to Real-Time Collaborative Text Editor</h1>
//         <p>
//           This is a real-time collaborative text editor where multiple users can edit a document simultaneously.
//         </p>
//         <p>
//           To get started, please <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Home;