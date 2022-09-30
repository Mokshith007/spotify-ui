import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useState } from 'react';
import '../App.css';
import './MediaWithCC.css'
import "bootstrap/dist/css/bootstrap.min.css";
import ReactJWPlayer from 'react-jw-player';
import { Spinner } from 'react-bootstrap';

const MediaWithCC = () => {
  const [fileSelected, setFileSelected] = useState<File>();
  const [languageSelected, setLanguageSelected] = useState<string>('en');
  const [publicUrl, setPublicUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
 /* const playlist = [{
    file: 'https://avmediaservice-usea.streaming.media.azure.net/4b75a665-9675-4b58-a63d-0fceabc519bc/ignite.ism/manifest(format=m3u8-cmaf)',
    image: 'https://avmediaservice-usea.streaming.media.azure.net/4b75a665-9675-4b58-a63d-0fceabc519bc/Thumbnail000001.jpg',
    tracks: [{
      file: 'https://avmediaservice-usea.streaming.media.azure.net/4b75a665-9675-4b58-a63d-0fceabc519bc/transcript.vtt',
      label: 'English',
      kind: 'captions',
      'default': true
    }]
  }]; */
  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    setFileSelected(fileList[0]);
  };

  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (fileSelected) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", fileSelected);
      formData.append("lang", languageSelected);
      axios
        .post<string>("https://app-managemedia.azurewebsites.net/media", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        })
        .then(response => {
          setPublicUrl(response.data);
          setLoading(false);
          setUploadStatus(true);
        })
        .catch(ex => {
          const err =
            ex.response.status === 404
              ? "Resource Not found"
              : "An unexpected error has occurred";
          setError(err);
          setLoading(false);
          setUploadStatus(false);

          console.log("Error " + error);
        });
    }
  }

  const handleLanguageSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguageSelected(e.target.value);
  }

  return (
    <>

      <div className="App">
        <h1>Publish Your Media</h1>
        <div className="form-gorup">
            <label htmlFor="photo" className="file-upload">
            <input
              accept="audio/*,video/*"
              id="photo"
              name="photo"
              type="file"
              multiple={false}
              onChange={handleFileChange}/>
              <div className="file-custom">{ fileSelected?.name || 'Choose a media file..'}</div>
          </label>
          </div>
          <div className="form-gorup">
            <div className="select-wrapper">
              <select onChange={handleLanguageSelectionChange}>
                <option value="" disabled selected>Select language</option>
                <option value="en">English</option>
                <option value="jp">Japanese</option>
              </select>
            </div>
          </div>
          <div className="button-wrapper">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CloudUploadIcon />}
              onClick={uploadFile}
              disabled={loading}>
              Upload
            </Button>
            {loading && <Spinner animation="border"/>}
          </div>
          {
           !loading && uploadStatus &&
            <div>
              <div className="videoBox">
                <ReactJWPlayer
                  playerId='my-unique-id'
                  playerScript='https://cdn.jwplayer.com/libraries/iA1Ait6L.js'
                  playlist={publicUrl}
                  isAutoPlay={false}
                />
              </div>
            </div>
            }
      </div>
    </>
  )

}

export default MediaWithCC;