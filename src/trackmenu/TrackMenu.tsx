import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Playlist from '../playlist/Playlist';

class TrackMenu extends React.Component {
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="noCaret">…</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1" className="dropdownStyle">Go to artist</Dropdown.Item>
          <Dropdown.Item eventKey="1" className="dropdownStyle">Remove from your liked songs</Dropdown.Item>
          <Playlist/>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default TrackMenu;
