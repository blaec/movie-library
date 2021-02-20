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
    const [isSingle, setIsManual] = useState(false);
    const [canUpload, setCanUpload] = useState(false);

    const handleChange = (event) => {
        setScanValue(event.target.value);
        setCanUpload(true);
    };

    const handleUpload = () => {
        setLoading(true);
        axios.post(`/movies/${scanValue}`)
            .then(response => {
                setLoading(false);
                setCanUpload(false);
                setScanValue('');
                alert(`uploading from ${scanValue} folder completed successfully.`)
            })
            .catch(error => {
                setLoading(false);
                setCanUpload(false);
                setScanValue('');
                console.log(error);
            });

    };

    const handleIsSingle = () => {
        setIsManual(!isSingle);
    }

    return (
        <div className="Upload">
            <Card variant="elevation">
                <CardContent>
                    <FormControl component="locations">
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
                                                           checked={isSingle}
                                                           onChange={handleIsSingle}
                                                           name="isSingle"/>}
                        />
                        <TextField id="tmdb-id"
                                   disabled={!isSingle}
                                   label="tmdb id"
                                   style={{margin: 8}}
                                   helperText="Type exact tmdb id"
                                   fullWidth
                                   margin="normal"
                        />
                        <TextField id="file-name"
                                   disabled={!isSingle}
                                   label="Exact file name"
                                   style={{margin: 8}}
                                   helperText="Enter exact file name with extension"
                                   fullWidth
                                   margin="normal"
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