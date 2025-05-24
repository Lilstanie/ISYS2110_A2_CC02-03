import React from 'react';
import '../style/style.css';
import { useParams } from 'react-router-dom';


function Home() {
  const { role } = useParams();  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1> HOME PAGE </h1>
        <p>Current Role: {role}</p>  {/* Display the role */}
      </header>
    </div>
  );
}

export default Home;
