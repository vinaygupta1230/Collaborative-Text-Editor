import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import axios from 'axios';
import { v4 as uuidV4 } from "uuid"
import { Navigate } from 'react-router-dom';
import './dashboard.css';



const Dashboard = () => {
  // const navigate = Navigate();
  // Dummy data for previous documents

  const location = useLocation();
  console.log(location.state);
  const username = location.state ? location.state.username : '';

  console.log("printing in dashboard");
  const [createdDocuments, setCreatedDocuments] = useState([]);
  // const [username, setusername] = useState('');
  // const [sharedDocuments, setSharedDocuments] = useState([]);
  // const userId = useLocation().state.username;
  // console.log(userId)
  // setusername(userId);

  // useEffect(() =>{
  //   const set = async () => {
      // const username = useLocation().state.username;
  //     // const userIddd = useLocation();
  //     console.log(userId)
  //     setusername(userId);
  //   };
  //   set();
  // }, []);

  

  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     const token = localStorage.getItem('token');
  //     // const response = await fetch(`/user/${userId}/documents`, {
  //     if(!token){
  //       console.log("Token Not Generated!")
  //       return
  //     }
  //     const response = await axios.post(`http://localhost:3000/document/${userId}`, {userId});
  //     console.log(response);
  //     // const data = await response.json();

  //     // console.log(data);

  //     // setCreatedDocuments(data.createdDocuments);
  //     // setSharedDocuments(data.sharedDocuments);
  //     console.log(response.data);
  //   };

  //   fetchDocuments();
  // }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      const token = localStorage.getItem('token');
      // const response = await fetch(`/user/${userId}/documents`, {
      if(!token){
        console.log("Token Not Generated!")
        return
      }
      const response = await axios.post(`http://localhost:3000/document/${username}`, {username});

      console.log(' consolling response');
      console.log(response);
      // const data = await response.json();

      console.log(response.data.createdDocuments.documents);
      // console.log(data);

      setCreatedDocuments(response.data.createdDocuments.documents || []);
      // setSharedDocuments(data.sharedDocuments);
    };

    fetchDocuments();
  }, [ username ]);

  // const location = useLocation();
  // const data = location.state;
  // console.log("printing location state");
  // console.log(location.state);
//   // console.log("Name: ",location.state[0].email);
//   // console.log("Name: ",location.state[1].email);
//   // console.log("Name: ",location.state[2].email);
//   // console.log("Name: ",location.state[3].email);


//   // const previousDocuments = [
//   //   { id: 1, title: 'Document 1', createdAt: '2022-04-05' },
//   //   { id: 2, title: 'Document 2', createdAt: '2022-04-06' },
//   //   { id: 3, title: 'Document 3', createdAt: '2022-04-07' },
//   //   { id: 4, title: 'Document 4', createdAt: '2022-04-06' },
//   //   { id: 5, title: 'Document 5', createdAt: '2022-04-06' },
//   // ];

//   // Dummy data for user information
//   // const userInfo = {
//   //   name: 'Vinay Gupta',
//   //   email: 'vinay@gmail.com'
//   // };
  // const userInfo = data;

  // console.log('userInfo');
  // console.log(userInfo);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };


  // setusername(userInfo.username)
  // console.log(userInfo);

  return (
    <div className="dashboard-container">
      {/* // <Navbar userName={userInfo.name} userEmail={userInfo.email} onLogout={handleLogout} /> */}
       <Navbar userName={username} userEmail={username} onLogout={handleLogout} />

       <div className="dashboard-content">
         <h2 style={{color:'grey'}}>Welcome, {username}!</h2>

         <h3 style={{color:'grey'}}>Previous Documents</h3>
         <div className="documents-container">
          {/* if(!createdDocuments) */}
           {createdDocuments.map(doc => (
             <Link key={doc.id} to={`/document/${doc.id}`} className="document-card">
               {/* <h4>{doc.title}</h4> */}
               <p>Created at: {doc.createdAt}</p>
             </Link>
           ))}
         </div>

         {/* console.log(userInfo); */}

         <Link to = {`/${username}/documents/${uuidV4()}`} className="create-document-button">Create New Document</Link>

       </div>
     </div>
   );
 };

 export default Dashboard;

