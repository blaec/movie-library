import React from 'react';
import MyTextField from "../../../../UI/MyTextField";

import {
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    makeStyles,
    Radio,
    RadioGroup,
    Switch
} from "@material-ui/core";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";

const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    }
}));

const movieLocations = {
    cartoons: "K | Cartoons",
    movies: "L | Movies",
    serialMovies: "M | Serial Movies",
    music: "D | New Movies",
    videos: "C | Videos"
};

const inputs = {
    "tmdb-id": {
        label: "tmdb id",
        helperText: "Type exact tmdb id"
    },
    "file-name": {
        label: "Exact file name",
        helperText: "Enter exact file name with extension"
    }
};

const locationRadios = Object.keys(movieLocations).map(locKey => (
    <FormControlLabel key={locKey}
                      value={locKey}
                      control={<Radio color="primary"/>}
                      label={movieLocations[locKey]}/>
));

const fileLoader = props => {
    const classes = useStyles();
    const movieInputs = Object.keys(inputs).map(inputKey => (
        <MyTextField key={inputKey}
                     id={inputKey}
                     disabled={!props.switchIsOn}
                     label={inputs[inputKey].label}
                     helperText={inputs[inputKey].helperText}
                     onChangeTextField={props.onChangeTextField}
        />
    ));

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl>
                    <FormLabel>Movie location</FormLabel>
                    <RadioGroup name="location"
                                value={props.location}
                                onChange={props.onChangeRadio}>
                        {locationRadios}
                    </RadioGroup>
                </FormControl>
                <Divider  className={classes.divider}/>
                <FormControl component="single-upload">
                    <FormControlLabel label="Single movie upload"
                                      control={<Switch color="primary"
                                                       checked={props.switchIsOn}
                                                       onChange={props.onChangeSwitch}
                                                       name="singleUpload"/>}
                    />
                    {movieInputs}
                </FormControl>
            </CardContent>
            <CardActions>
                <MySubmitButton icon={<BackupTwoToneIcon />}
                                submit={props.submit}
                                caption="Scan"
                                disabled={props.location === ''}
                />
            </CardActions>
        </Card>
    );
}

export default fileLoader;