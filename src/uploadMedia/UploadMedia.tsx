import React, { FC } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ReactJWPlayer from 'react-jw-player';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

interface IPost {
  returnMessage: string;
}
const defaultPosts:IPost[] = [];



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  video: {
    height: 500
  }
}
));
const UploadMedia: FC = () => {
  const classes = useStyles();
  const [fileSelected, setFileSelected] = React.useState<File>();

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");
  const [uploadStatus, setUploadStatus]: [boolean, (loading: boolean) => void] = React.useState<boolean>(false);


  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    setFileSelected(fileList[0]);
  };
  
  const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if(fileSelected){
      setLoading(true);
      setUploadStatus(true);
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
      setUploadStatus(false);
      console.log("success! " +posts);
    })
    .catch(ex => {
      const error =
      ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
      setError(error);
      setLoading(false);
      setUploadStatus(false);

      console.log("Error "+ error);
    });
    }
  }
 

  return (
    <>
  <CssBaseline />
      <Container maxWidth="md">
        <Typography component="div" style={{ backgroundColor: 'white', height: '40vh' }} >
 
<div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>

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
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={uploadFile}
      >
        Upload
      </Button>
         
         
           
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.video} >
          <Paper className={classes.paper}>
            <div className={classes.video} style={{display: posts[0] ? "block" : "none"}}>
          <ReactJWPlayer
            playerId='my-unique-id'
            playerScript='https://cdn.jwplayer.com/libraries/iA1Ait6L.js'
            file={posts}
          />
          </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>

          <div style={{display: loading && uploadStatus ? "block" : "none"}}>
       <h4>Loading ...</h4>
            </div>  
            <div style={{display: loading ? "none" : "block"}}>
              {posts ? <h4>Success!</h4> : <h4>Error</h4>}
      

  
            </div> 
          
          
          </Paper>
        </Grid>
       
      </Grid>
    </div>
    </Typography>
    </Container>  
    </>
  );

}


export default UploadMedia;