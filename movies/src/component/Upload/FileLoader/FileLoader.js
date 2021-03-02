import React from 'react';
import MyTextField from "../../../UI/MyTextField";

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
import MySubmitButton from "../../../UI/MySubmitButton";

const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    }
}));

const fileLoader = props => {
    const classes = useStyles();

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl>
                    <FormLabel>Movie location</FormLabel>
                    <RadioGroup name="location"
                                value={props.location}
                                onChange={props.onChangeRadio}>
                        <FormControlLabel value="cartoons"
                                          control={<Radio color="primary" />}
                                          label="K | Cartoons" />
                        <FormControlLabel value="movies"
                                          control={<Radio color="primary" />}
                                          label="L | Movies" />
                        <FormControlLabel value="serialMovies"
                                          control={<Radio color="primary" />}
                                          label="M | Serial Movies" />
                        <FormControlLabel value="music"
                                          control={<Radio color="primary" />}
                                          label="D | New Movies" />
                        <FormControlLabel value="videos"
                                          control={<Radio color="primary" />}
                                          label="C | Videos" />
                    </RadioGroup>
                </FormControl>
                <Divider  className={classes.divider}/>
                <FormControl component="single-upload">
                    <FormControlLabel label="Single movie upload"
                                      control={<Switch color="primary"
                                                       checked={props.switchIsOn}
                                                       onChange={props.onChangeSwitch}
                                                       name="isSingle"/>}
                    />
                    <MyTextField id="tmdb-id"
                                 disabled={!props.switchIsOn}
                                 label="tmdb id"
                                 helperText="Type exact tmdb id"
                                 onChangeTextField={props.onChangeTextField}
                    />
                    <MyTextField id="file-name"
                                 disabled={!props.switchIsOn}
                                 label="Exact file name"
                                 helperText="Enter exact file name with extension"
                                 onChangeTextField={props.onChangeTextField}
                    />
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
};

export default fileLoader;