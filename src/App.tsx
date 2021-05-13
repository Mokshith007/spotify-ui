import React from 'react';
import './App.css';
import Tracks from './tracks/Tracks';

function App(props:any) {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello, {props.name}
        </p>   
        <Tracks/>     
      </header>
    </div>
  );
}

export default App;
