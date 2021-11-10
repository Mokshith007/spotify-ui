import React, { FC } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { AzureMP } from 'react-azure-mp'
import { useState } from 'react';
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
    if (!fileList) return;
    setFileSelected(fileList[0]);
  };

  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (fileSelected) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", fileSelected);
      axios
        .post<string[]>("http://managemedia.eastus.azurecontainer.io:8080/mediaWithSAS", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        })
        .then(response => {
          setRestrictedUrl(response.data[0]);
          setPublicUrl(response.data[1]);
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
        <h1>Video Publishing</h1>
        <br />

        <label htmlFor="photo">
          <input
            accept="audio/*,video/*"
            id="photo"
            name="photo"
            type="file"
            multiple={false}
            onChange={handleFileChange}
          />
        </label>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUploadIcon />}
          onClick={uploadFile}
        >
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

          <div className="videoBox">
            <h1>Published</h1>
            <AzureMP
              src={[{ src: publicUrl, type: "application/vnd.ms-sstr+xml" }]}
            />
          </div>
        </div>
        : <br />}
    </>
  )

}

export default UploadMedia;