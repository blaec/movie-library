import React from 'react';
import {
    Button,
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
    Switch,
    TextField
} from "@material-ui/core";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";

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
                    <TextField id="tmdb-id"
                               disabled={!props.switchIsOn}
                               label="tmdb id"
                               style={{margin: 8}}
                               helperText="Type exact tmdb id"
                               fullWidth
                               margin="normal"
                               onChange={props.onChangeTextField}
                    />
                    <TextField id="file-name"
                               disabled={!props.switchIsOn}
                               label="Exact file name"
                               style={{margin: 8}}
                               helperText="Enter exact file name with extension"
                               fullWidth
                               margin="normal"
                               onChange={props.onChangeTextField}
                    />
                </FormControl>
            </CardContent>
            <CardActions>
                <Button className="Button"
                        disabled={props.location === ''}
                        variant="outlined"
                        color="primary"
                        startIcon={<BackupTwoToneIcon />}
                        onClick={props.submit}>
                    Scan
                </Button>
            </CardActions>
        </Card>
    );
};

export default fileLoader;