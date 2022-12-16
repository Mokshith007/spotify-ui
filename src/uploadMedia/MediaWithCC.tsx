/* eslint no-eval: 0 */
import React, { useEffect } from 'react';
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
  const [playList, setPlayList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const [captions, setCaptions] = useState<string[]>();
  const [transcript, setTranscript] = useState<string[]>([]);

  useEffect(() => {
    const loadCaptions = function () {
      let h: string[] = [];
      var section = "";
      if (captions) {
        captions.forEach((caption, i) => {

          if ((i > 6) && (!caption.startsWith('NOTE Confidence:'))) {
            section = caption.slice(29);
            h.push(section);

          }
        });
        setTranscript(h);
      }
    };
    loadCaptions();
  }, [captions]);

  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    setFileSelected(fileList[0]);
  };
  // by dipanakr start
  const getCaptions = function (captionUrl: string) {
    const promise = new Promise<string>((resolve) => { fetch(captionUrl).then(r => r.text()).then(t => resolve(t)) });
    promise.then(textData => setCaptions(textData.split('\r\n\r\n')));

  };

  // by dipanakr end

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
          console.log(response.data);
          let tmp = response.data;         
          if (fileSelected.name.toLowerCase().indexOf('audio') >= 0 || fileSelected.name.toLowerCase().indexOf('.mp3') >= 0) {
            eval('tmp[0].image="../audio_thumbnail.png"');
          }
          setPlayList(tmp);
          const vttPath = eval('tmp[0].tracks[0].file');
          getCaptions(vttPath);

          setLoading(false);
          setUploadStatus(true);
        })
        .catch(ex => {
          const errMsg = "An unexpected error has occurred, please try again!";
          setError(errMsg);
          setLoading(false);
          setUploadStatus(false);
          console.log("Error " + errMsg);
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
              onChange={handleFileChange} />
            <div className="file-custom">{fileSelected?.name || 'Choose a media file..'}</div>
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
          {loading && <Spinner animation="border" />}
        </div>
        {!loading && uploadStatus &&
          <div className="d-flex justify-content-center align-items-start mt-3">
            <div className="videoBox">
              <ReactJWPlayer
                playerId='my-unique-id'
                playerScript='https://cdn.jwplayer.com/libraries/iA1Ait6L.js'
                playlist={playList}
                isAutoPlay={false}
              />
            </div>
            {/* <div className="transcript ml-2"> {transcript.map((caption) => <div>{caption}</div>)}</div> */}
          </div>
        }
        {!loading && error && <div className='error-msg'>{error} </div>}
      </div>
    </>
  )

}

export default MediaWithCC;