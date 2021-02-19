import React, {useState} from 'react';
import './Upload.css';
import {
    Button,
    Card, CardActions,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup, TextField
} from "@material-ui/core";
import BackupTwoToneIcon from '@material-ui/icons/BackupTwoTone';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

const upload = props => {
    const [scanValue, setScanValue] = useState('cartoons');
    const [wishValue, setWishValue] = useState('cartoons');

    const handleChange = (event) => {
        setScanValue(event.target.value);
    };

    const handleUpload = () => {
        alert("start upload");
    };

    return (
        <div className="Upload">
            <Card variant="elevation">
                <CardContent>
                    <FormControl>
                        <FormLabel >Movie location</FormLabel>
                        <RadioGroup name="location" value={scanValue} onChange={handleChange}>
                            <FormControlLabel value="cartoons" control={<Radio />} label="Cartoons" />
                            <FormControlLabel value="movies" control={<Radio />} label="Movies" />
                            <FormControlLabel value="serialMovies" control={<Radio />} label="Serial Movies" />
                            <FormControlLabel value="music" control={<Radio />} label="Music" />
                            <FormControlLabel value="videos" control={<Radio />} label="Videos" />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button className="Button"
                            variant="outlined"
                            color="secondary"
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
                            color="secondary"
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
                    <Button
                            variant="outlined"
                            color="secondary"
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