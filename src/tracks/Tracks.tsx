import React from 'react';
import Track from "../track/Track"
import Table from "react-bootstrap/Table";
import TrackModel from '../track/TrackModel';

class Tracks extends React.Component<{}, { tracks: Array<TrackModel> }> {

  constructor(props: any) {
    super(props);
    this.state = {
      tracks: []
    };
  }

  componentDidMount() {
    fetch("http://spotifytracks.eastus.azurecontainer.io:8080/getTracks")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            tracks: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("Error occurred while fetching songs");
        }
      )
  }

  render()  {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th colSpan={3}>Tracks</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tracks.map(track => (
            <Track key={track.trackId} name={track.trackName} genre={track.genre} artist={track.artistName}/>
          ))}         
        </tbody>
      </Table> 
    ); 
  }
}

export default Tracks;
