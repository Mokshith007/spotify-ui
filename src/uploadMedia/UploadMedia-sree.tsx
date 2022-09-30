import React, { FC } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { AzureMP } from 'react-azure-mp'
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';


const UploadMedia = () => {
  const [fileSelected, setFileSelected] = useState<File>();
  const [publicUrl, setPublicUrl] = useState<string>();
  const [restrictedUrl, setRestrictedUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);

  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    console.log(e);
    if (!fileList) return;
    setFileSelected(fileList[0]);
  };

  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (fileSelected) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", fileSelected);
      axios
        .post<string>("https://app-managemedia.azurewebsites.net/media", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        })
        .then(response => {
          setRestrictedUrl(response.data);
          // setPublicUrl(response.data[1]);
          setLoading(false);
          setUploadStatus(true);
        })
        .catch(ex => {
          const error =
            ex.response.status === 404
              ? "Resource Not found"
              : "An unexpected error has occurred";
          setError(error);
          setLoading(false);
          setUploadStatus(false);

          console.log("Error " + error);
        });
    }
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
            <div className="file-custom">{ fileSelected && fileSelected[0]?.name || 'Choose a media file..'}</div>
          </label>
        </div>
        <div className="form-gorup">
          <div className="select-wrapper">
            <select>
              <option value="english">English</option>
              <option value="japanese">Japanese</option>
            </select>
          </div>
        </div>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUploadIcon />}
          onClick={uploadFile}>
          Upload
        </Button>
      </div>

      {loading ? <h1 className="loadingclass"> Loading ...</h1> : <br />}

      {!loading && uploadStatus ?
        <div>
          <div className="videoBox">
            <h1>MNPI</h1>
            <AzureMP
              src={[{ src: restrictedUrl, type: "application/vnd.ms-sstr+xml" }]}
            />
          </div>
        </div>
        : <br />}
    </>
  )

}

export default UploadMedia;