import React, { FC } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

interface IPost {
  returnMessage: string;
}
const defaultPosts:IPost[] = [];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const UploadMedia: FC = () => {
  const classes = useStyles();
  const [fileSelected, setFileSelected] = React.useState<File>();

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    setFileSelected(fileList[0]);
  };
  
  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if(fileSelected){
    const formData = new FormData();
    formData.append("file", fileSelected);
    axios
    .post<IPost[]>("http://localhost:8080/", formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
    .then(response => {
      setPosts(response.data);
      setLoading(false);
    })
    .catch(ex => {
      const error =
      ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
      setError(error);
      setLoading(false);
    });
    }
  }
     
  return (
    <>
      <label htmlFor="photo">
            <input
              accept="audio/*,video/*"
              id="photo"
              name="photo"
              type="file"
              multiple={false}
              onChange={handleFileChange}
            />

<Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={uploadFile}
      >
        Upload
      </Button>
          </label>
    {posts}   
  

  {error && <p>{error}</p>}     
    </>
  );

}


export default UploadMedia;