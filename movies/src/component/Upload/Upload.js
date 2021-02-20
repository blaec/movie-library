import React, {useState} from 'react';
import './Upload.css';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel, makeStyles,
    Radio,
    RadioGroup,
    Switch,
    TextField
} from "@material-ui/core";
import BackupTwoToneIcon from '@material-ui/icons/BackupTwoTone';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import axios from '../../axios-movies';

const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    }
}));


const upload = props => {
    const classes = useStyles();

    const [scanValue, setScanValue] = useState('');
    const [wishValue, setWishValue] = useState('cartoons');
    const [loading, setLoading] = useState(false);
    const [hasSingle, setHasSingle] = useState(false);
    const [canUpload, setCanUpload] = useState(false);
    const [tmdbId, setTmdbId] = useState('');
    const [fileName, setFileName] = useState('');

    const handleChange = (event) => {
        setScanValue(event.target.value);
        if (!canUpload) {
            setCanUpload(true);
        }
    };

    const resetForm = () => {
        setLoading(false);
        setCanUpload(false);
        setScanValue('');
        setTmdbId('');
        setFileName('');
    }

    const handleUpload = () => {
        setLoading(true);

        if (hasSingle) {
            let data = {
               location: scanValue,
               tmdbId: tmdbId,
               fileName: fileName
            }
            axios.post("/movies/single", data)
                .then(response => {
                    resetForm();
                    alert(`uploading ${fileName} from ${scanValue} folder completed successfully.`)
                })
                .catch(error => {
                    resetForm();
                    console.log(error);
                });

        } else {
            axios.post(`/movies/${scanValue}`)
                .then(response => {
                    resetForm();
                    alert(`uploading from ${scanValue} folder completed successfully.`)
                })
                .catch(error => {
                    resetForm();
                    console.log(error);
                });
        }
    };

    const handleIsSingle = () => {
        setHasSingle(!hasSingle);
        setTmdbId('');
        setFileName('');
    };

    const handleTextFields = (event) => {
        let text = event.target.value;
        switch (event.target.id) {
            case "imdb-id":
                setTmdbId(text);
                break;
            case "file-name":
                setFileName(text);
                break;
            default:
                alert("Upload -> handleTextFields -> wrong id")
        }
    }

    return (
        <div className="Upload">
            <Card variant="elevation">
                <CardContent>
                    <FormControl>
                        <FormLabel>Movie location</FormLabel>
                        <RadioGroup name="location"
                                    value={scanValue}
                                    onChange={handleChange}>
                            <FormControlLabel value="cartoons"
                                              control={<Radio color="primary" />}
                                              label="Cartoons" />
                            <FormControlLabel value="movies"
                                              control={<Radio color="primary" />}
                                              label="Movies" />
                            <FormControlLabel value="serialMovies"
                                              control={<Radio color="primary" />}
                                              label="Serial Movies" />
                            <FormControlLabel value="music"
                                              control={<Radio color="primary" />}
                                              label="New Movies" />
                            <FormControlLabel value="videos"
                                              control={<Radio color="primary" />}
                                              label="Videos" />
                        </RadioGroup>
                    </FormControl>
                    <Divider  className={classes.divider}/>
                    <FormControl component="single-upload">
                        <FormLabel component="legend">Single Movie Upload</FormLabel>
                        <FormControlLabel label="Single movie upload"
                                          control={<Switch color="primary"
                                                           checked={hasSingle}
                                                           onChange={handleIsSingle}
                                                           name="isSingle"/>}
                        />
                        <TextField id="tmdb-id"
                                   disabled={!hasSingle}
                                   label="tmdb id"
                                   style={{margin: 8}}
                                   helperText="Type exact tmdb id"
                                   fullWidth
                                   margin="normal"
                                   onChange={handleTextFields}
                        />
                        <TextField id="file-name"
                                   disabled={!hasSingle}
                                   label="Exact file name"
                                   style={{margin: 8}}
                                   helperText="Enter exact file name with extension"
                                   fullWidth
                                   margin="normal"
                                   onChange={handleTextFields}
                        />
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button className="Button"
                            disabled={!canUpload}
                            variant="outlined"
                            color="primary"
                            startIcon={<BackupTwoToneIcon />}
                            onClick={handleUpload}>
                        Scan
                    </Button>
                </CardActions>
            </Card>

            <Card variant="elevation">
                <CardContent>
                    <FormControl>
                        <FormLabel >Add to Wish List</FormLabel>
                        <TextField
                            id="standard-full-width"
                            color="primary"
                            label="Label"
                            style={{ margin: 8 }}
                            placeholder="Placeholder"
                            helperText="Full width!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </CardContent>
                <CardActions >
                    <Button variant="outlined"
                            color="primary"
                            startIcon={<AddCircleTwoToneIcon />}
                            onClick={handleUpload}>
                        Add
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default upload;