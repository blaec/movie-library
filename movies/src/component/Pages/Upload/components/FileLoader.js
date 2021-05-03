import React, {useState} from 'react';
import axios from "../../../../axios-movies";
import {useDispatch} from "react-redux";

import MyTextField from "../../../../UI/MyTextField";
import MyFormLabel from "../../../../UI/MyFormLabel";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../UI/Buttons/MyButtonGrid";
import MyLinearProgress from "./MyLinearProgress";
import * as UrlUtils from "../../../../utils/UrlUtils";
import {movieApi} from "../../../../utils/UrlUtils";
import * as actions from "../../../../store/actions";

import {
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    makeStyles,
    Radio,
    RadioGroup,
    Switch
} from "@material-ui/core";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: theme.spacing(4,0,3.5,0)
    },
    radioGroup: {
        paddingTop: theme.spacing(3)
    },
}));

const movieLocations = {
    cartoons:     "K | Cartoons",
    movies:       "L | Movies",
    serialMovies: "M | Serial Movies",
    music:        "D | New Movies",
    videos:       "C | Videos"
};

const locationRadios = Object.keys(movieLocations).map(locKey =>
    <FormControlLabel key={locKey}
                      value={locKey}
                      control={<Radio color="primary"/>}
                      label={movieLocations[locKey]}/>
);

const fileLoader = () => {
    const {divider, radioGroup} = useStyles();
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(actions.setSnackbar(snackbar));

    const [tmdbId, setTmdbId] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileLocation, setFileLocation] = useState('');
    const [isSingleMovieUpload, setIsSingleMovieUpload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inputs = [
        {
            id: "tmdb-id",
            label: "tmdb id",
            helperText: "Type exact tmdb id",
            text: tmdbId
        },
        {
            id: "file-name",
            label: "Exact file name",
            helperText: "Enter exact file name with extension",
            text: fileName
        }
    ];

    const resetForm = () => {
        setFileLocation('');
        setTmdbId('');
        setFileName('');
    };

    const handleChooseLocation = (event) => {
        setFileLocation(event.target.value);
    };

    const handleSwitchChange = () => {
        setIsSingleMovieUpload(!isSingleMovieUpload);
        setTmdbId('');
        setFileName('');
    };

    const handleTextFieldChange = (text, id) => {
        switch (id) {
            case "tmdb-id":     setTmdbId(text);    break;
            case "file-name":   setFileName(text);  break;
            default:            onSetSnackbar({open: true, message: `Upload -> handleTextFields -> wrong id`, type: 'error'})
        }
    };

    const handleUpload = () => {
        setIsLoading(true);
        if (isSingleMovieUpload) {
            let data = {
                location: fileLocation,
                tmdbId: tmdbId,
                fileName: fileName
            }
            axios.post(movieApi.post.uploadMovie, data)
                .then(response => {
                    resetForm();
                    setIsLoading(false);
                    onSetSnackbar({open: true, message: `Uploading ${fileName} from ${fileLocation} folder completed successfully`, type: 'success'});
                })
                .catch(error => {
                    resetForm();
                    setIsLoading(false);
                    console.log(error);
                    onSetSnackbar({open: true, message: `Failed to upload ${fileName} from ${fileLocation} folder`, type: 'error'});
                });
        } else {
            axios.post(UrlUtils.getScanFolderUrl(fileLocation))
                .then(response => {
                    const {data} = response;
                    resetForm();
                    setIsLoading(false);
                    onSetSnackbar({open: true, message: `From ${fileLocation} folder successfully uploaded ${data} movies.`, type: 'success'});
                })
                .catch(error => {
                    resetForm();
                    setIsLoading(false);
                    console.log(error);
                    onSetSnackbar({open: true, message: `Failed to scan folder ${fileLocation} for movies`, type: 'error'});
                });
        }
    };

    const movieInputs = inputs.map(input => {
            const {id, label, helperText, text} = input;
            return <MyTextField key={id}
                                id={id}
                                text={text}
                                disabled={!isSingleMovieUpload}
                                label={label}
                                required={true}
                                helperText={helperText}
                                onChangeTextField={handleTextFieldChange}
            />;
        }
    );

    const singleMovieUploadSwitch = <Switch color="primary"
                                            checked={isSingleMovieUpload}
                                            onChange={handleSwitchChange}
                                            name="singleUpload"/>;
    const isScanButtonDisabled = isLoading
                                 || fileLocation === ''
                                 || (isSingleMovieUpload && (tmdbId === '' || fileName === ''));
    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl>
                    <MyFormLabel text="Movie location"/>
                    <RadioGroup className={radioGroup}
                                name="location"
                                value={fileLocation}
                                onChange={handleChooseLocation}>
                        {locationRadios}
                    </RadioGroup>
                </FormControl>
                <Divider className={divider}/>
                <FormControl component="single-upload">
                    <FormControlLabel label="Single movie upload"
                                      control={singleMovieUploadSwitch}
                    />
                            {movieInputs}
                </FormControl>
                <MyLinearProgress loading={isLoading}/>
            </CardContent>
            <CardActions>
                <MyButtonGrid>
                    <MySubmitButton icon={<BackupTwoToneIcon/>}
                                    caption="Scan"
                                    disabled={isScanButtonDisabled}
                                    onSubmit={handleUpload}
                    />
                </MyButtonGrid>
            </CardActions>
        </Card>
    );
}

export default fileLoader;