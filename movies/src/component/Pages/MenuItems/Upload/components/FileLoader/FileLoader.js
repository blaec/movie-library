import React, {useRef, useState} from 'react';
import axios from "../../../../../../axios-movies";
import {useDispatch} from "react-redux";

import MyFormLabel from "../../../../../../UI/MyFormLabel";
import MySubmitButton from "../../../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../../../UI/Buttons/MyButtonGrid";
import MyLinearProgress from "../MyLinearProgress";
import * as UrlUtils from "../../../../../../utils/UrlUtils";
import {movieApi} from "../../../../../../utils/UrlUtils";
import * as actions from "../../../../../../store/actions";
import FileTmdbIdInput from "./FileTmdbIdInput";
import FileNameInput from "./FileNameInput";
import FileRadios from "./FileRadios";

import {
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    makeStyles,
    Switch
} from "@material-ui/core";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: theme.spacing(4, 0, 3.5, 0)
    },
}));

const fileLoader = () => {
    const {divider} = useStyles();
    const dispatch = useDispatch();
    const onSetSnackbar = () => {};
    // const onSetSnackbar = (snackbar) => dispatch(actions.setSnackbar(snackbar));

    const tmdbIdRef = useRef();
    const fileNameRef = useRef();

    const [fileLocation, setFileLocation] = useState('');
    const [isSingleMovieUpload, setIsSingleMovieUpload] = useState(false);
    const [isTmdbIdValid, setIsTmdbIdValid] = useState(false);
    const [isFileNameValid, setIsFileNameValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setFileLocation('');
        tmdbIdRef.current.value = '';
        fileNameRef.current.value = '';
    };

    const handleChooseLocation = (event) => {
        setFileLocation(event.target.value);
    };

    const handleSwitchChange = () => {
        setIsSingleMovieUpload(!isSingleMovieUpload);
        tmdbIdRef.current.value = '';
        fileNameRef.current.value = '';
    };

    const handleUpload = () => {
        setIsLoading(true);
        if (isSingleMovieUpload) {
            const {current: {value: tmdbId}} = tmdbIdRef;
            const {current: {value: fileName}} = fileNameRef;
            let data = {
                location: fileLocation,
                tmdbId: tmdbId,
                fileName: fileName
            }
            axios.post(movieApi.post.uploadMovie, data)
                .then(response => {
                    resetForm();
                    setIsLoading(false);
                    onSetSnackbar({
                        open: true,
                        message: `Uploading ${fileName} from ${fileLocation} folder completed successfully`,
                        type: 'success'
                    });
                })
                .catch(error => {
                    resetForm();
                    setIsLoading(false);
                    console.log(error);
                    onSetSnackbar({
                        open: true,
                        message: `Failed to upload ${fileName} from ${fileLocation} folder`,
                        type: 'error'
                    });
                });
        } else {
            axios.post(UrlUtils.getScanFolderUrl(fileLocation))
                .then(response => {
                    const {data} = response;
                    resetForm();
                    setIsLoading(false);
                    onSetSnackbar({
                        open: true,
                        message: `From ${fileLocation} folder successfully uploaded ${data} movies.`,
                        type: 'success'
                    });
                })
                .catch(error => {
                    resetForm();
                    setIsLoading(false);
                    console.log(error);
                    onSetSnackbar({
                        open: true,
                        message: `Failed to scan folder ${fileLocation} for movies`,
                        type: 'error'
                    });
                });
        }
    };

    const handleTmdbIdValidation = (isValid) => {
        setIsTmdbIdValid(isValid);
    };

    const handleFileNameValidation = (isValid) => {
        setIsFileNameValid(isValid);
    };

    const singleMovieUploadSwitch = (
        <Switch
            color="primary"
            checked={isSingleMovieUpload}
            onChange={handleSwitchChange}
            name="singleUpload"/>
    );
    const isScanButtonDisabled = isLoading
                                 || fileLocation === ''
                                 || (isSingleMovieUpload && (!isTmdbIdValid || !isFileNameValid));
    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl>
                    <MyFormLabel text="Movie location"/>
                    <FileRadios
                        fileLocation={fileLocation}
                        onChooseLocation={handleChooseLocation}/>
                </FormControl>
                <Divider className={divider}/>
                <FormControl component="single-upload">
                    <FormControlLabel
                        label="Single movie upload"
                        control={singleMovieUploadSwitch}
                    />
                    <FileTmdbIdInput
                        inputRef={tmdbIdRef}
                        isSingleMovieUpload={isSingleMovieUpload}
                        onValid={handleTmdbIdValidation}
                    />
                    <FileNameInput
                        inputRef={fileNameRef}
                        isSingleMovieUpload={isSingleMovieUpload}
                        onValid={handleFileNameValidation}
                    />
                </FormControl>
                <MyLinearProgress loading={isLoading}/>
            </CardContent>
            <CardActions>
                <MyButtonGrid>
                    <MySubmitButton
                        icon={<BackupTwoToneIcon/>}
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