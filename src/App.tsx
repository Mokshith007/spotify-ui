import React from 'react';
import './App.css';
import TrackSearch from './tracksearch/TrackSearch'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UploadMedia from './uploadMedia/UploadMedia';
import MediaWithCC from './uploadMedia/MediaWithCC';

function App(props:any) {
  return (

    <Router>
    <div>
      <Switch>
        <Route path="/mediawithSAS">
          <AddMedia />
        </Route>
        <Route path="/">
          <MediaWithCC />
        </Route>
        <Route path="/spotify">
          <Home />
        </Route>
      </Switch>
    </div>
   
  </Router>

  );

  function AddMedia() {
  return (<div>
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
