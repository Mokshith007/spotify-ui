import React from 'react';
import TrackMenu from '../trackmenu/TrackMenu';
//import Image from "react-bootstrap/Image";

function Track(props:any) {
  return (
    <tr>
      <td className="ten">{props.genre}</td>
      <td>{props.name}<br/>{props.artist}</td>
      <td className="ten"><TrackMenu/></td>
    </tr>
  );
}

export default Track;

//<Image src={`data:image/jpg;base64,${props.source}`} roundedCircle className="imgDimensions" />