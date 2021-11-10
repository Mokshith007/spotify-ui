import React from 'react';
import Track from "../track/Track"
import Table from "react-bootstrap/Table";
import TrackModel from '../track/TrackModel';

class Tracks extends React.Component<{ tracks: Array<TrackModel> }> {
  render()  {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th colSpan={3}>Tracks</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tracks.map(track => (
            <Track key={track.trackId} name={track.trackName} genre={track.genre} artist={track.artistName}/>
          ))}         
        </tbody>
      </Table> 
    ); 
  }
}

export default Tracks;

