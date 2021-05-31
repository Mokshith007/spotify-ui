import React from 'react';
import './App.css';
import TrackSearch from './tracksearch/TrackSearch'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UploadMedia from './uploadMedia/UploadMedia';

function App(props:any) {
  return (

    <Router>
    <div>
      <Switch>
        <Route path="/media">
          <AddMedia />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
   
  </Router>

  );

  function AddMedia() {
  return (<div><h2>Add Media</h2>
    <UploadMedia />
    </div>
    );
  }
  
  function Home() {
    return(       
    <div>
      <header className="App-header">
      <TrackSearch /> 
    </header>
  </div>);
  }
  
 
}

export default App;
