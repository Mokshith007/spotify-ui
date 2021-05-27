import React from 'react';
import './App.css';
import TrackSearch from './tracksearch/TrackSearch'

function App(props:any) {
  return (
    <div className="App">
      <header className="App-header">
        <TrackSearch />    
      </header>
    </div>
  );
}

export default App;
