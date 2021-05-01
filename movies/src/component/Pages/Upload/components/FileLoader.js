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
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    radioGroup: {
        paddingTop: theme.spacing(3)
    },
}));

const movieLocations = {
    cartoons: "K | Cartoons",
    movies: "L | Movies",
    serialMovies: "M | Serial Movies",
    music: "D | New Movies",
    videos: "C | Videos"
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
    const [switchStatus, setSwitchStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inputs = {
        "tmdb-id": {
            label: "tmdb id",
            helperText: "Type exact tmdb id",
            text: tmdbId
        },
        "file-name": {
            label: "Exact file name",
            helperText: "Enter exact file name with extension",
            text: fileName
        }
    };

    const resetForm = () => {
        setFileLocation('');
        setTmdbId('');
        setFileName('');
    };

    const handleChooseLocation = (event) => {
        setFileLocation(event.target.value);
    };

    const handleSwitchChange = () => {
        setSwitchStatus(!switchStatus);
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
        if (switchStatus) {
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

    const movieInputs = Object.keys(inputs).map(inputKey => (
        <MyTextField key={inputKey}
                     id={inputKey}
                     text={inputs[inputKey].text}
                     disabled={!switchStatus}
                     label={inputs[inputKey].label}
                     helperText={inputs[inputKey].helperText}
                     onChangeTextField={handleTextFieldChange}
        />
    ));

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
                                      control={<Switch color="primary"
                                                       checked={switchStatus}
                                                       onChange={handleSwitchChange}
                                                       name="singleUpload"/>}
                    />
                            {movieInputs}
                </FormControl>
                <MyLinearProgress loading={isLoading}/>
            </CardContent>
            <CardActions>
                <MyButtonGrid>
                    <MySubmitButton icon={<BackupTwoToneIcon/>}
                                    caption="Scan"
                                    disabled={fileLocation === '' || isLoading}
                                    onSubmit={handleUpload}
                    />
                </MyButtonGrid>
            </CardActions>
        </Card>
    );
}

export default fileLoader;