import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import PlaylistModel from './PlaylistModel';

class Playlist extends React.Component<{}, { playlists: Array<PlaylistModel> }> {
  constructor(props: any) {
    super(props);
    this.state = {
      playlists: []
    };
  }

  componentDidMount() {
    fetch("http://spotify-playlists.eastus.azurecontainer.io:8080/playlist/all")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            playlists: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("Error occurred while fetching playlists");
        }
      )
  }

  render() {
    return (   
      <DropdownButton key="left" id="dropdown-button-drop-left" drop="left" variant="secondary" title="Add to Playlist" className="playlistDropdown">
        <Dropdown.Item eventKey="1" className="dropdownStyle">New Playlist</Dropdown.Item>
        {this.state.playlists.map(playlist => (
          <Dropdown.Item key={playlist.id} className="dropdownStyle">{playlist.name}</Dropdown.Item>
        ))} 
      </DropdownButton>
    );
  }
}

export default Playlist;
