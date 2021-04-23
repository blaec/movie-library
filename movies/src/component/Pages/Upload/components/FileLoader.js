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
    LinearProgress,
    makeStyles,
    Radio,
    RadioGroup,
    Switch
} from "@material-ui/core";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";
import ButtonGrid from "../../../../UI/Buttons/ButtonGrid";

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
        helperText: "Type exact tmdb id",
        text: "tmdbId"
    },
    "file-name": {
        label: "Exact file name",
        helperText: "Enter exact file name with extension",
        text: "fileName"
    }
};

const locationRadios = Object.keys(movieLocations).map(locKey =>
    <FormControlLabel key={locKey}
                      value={locKey}
                      control={<Radio color="primary"/>}
                      label={movieLocations[locKey]}/>
);

const fileLoader = props => {
    const {switchIsOn, location, loading, onChangeRadio, onChangeSwitch, onChangeTextField, onSubmit} = props;

    const classes = useStyles();
    const movieInputs = Object.keys(inputs).map(inputKey => (
        <MyTextField key={inputKey}
                     id={inputKey}
                     text={props[inputs[inputKey].text]}
                     disabled={!switchIsOn}
                     label={inputs[inputKey].label}
                     helperText={inputs[inputKey].helperText}
                     onChangeTextField={onChangeTextField}
        />
    ));

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl>
                    <FormLabel>Movie location</FormLabel>
                    <RadioGroup name="location"
                                value={location}
                                onChange={onChangeRadio}>
                        {locationRadios}
                    </RadioGroup>
                </FormControl>
                <Divider className={classes.divider}/>
                <FormControl component="single-upload">
                    <FormControlLabel label="Single movie upload"
                                      control={<Switch color="primary"
                                                       checked={switchIsOn}
                                                       onChange={onChangeSwitch}
                                                       name="singleUpload"/>}
                    />
                            {movieInputs}
                </FormControl>
                <LinearProgress hidden={!loading}/>
            </CardContent>
            <CardActions>
                <ButtonGrid>
                    <MySubmitButton icon={<BackupTwoToneIcon/>}
                                    caption="Scan"
                                    disabled={location === '' || loading}
                                    onSubmit={onSubmit}
                    />
                </ButtonGrid>
            </CardActions>
        </Card>
    );
}

export default fileLoader;