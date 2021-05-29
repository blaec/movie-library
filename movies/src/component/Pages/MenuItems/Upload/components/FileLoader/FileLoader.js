import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import MyFormLabel from "../../../../../../UI/MyFormLabel";
import MySubmitButton from "../../../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../../../UI/Buttons/MyButtonGrid";
import MyLinearProgress from "../MyLinearProgress";
import FileTmdbIdInput from "./FileTmdbIdInput";
import FileNameInput from "./FileNameInput";
import FileRadios from "./FileRadios";
import {feedbackActions} from "../../../../../../store/feedback-slice";
import {saveSingleMovie, scanFolderAndSave} from "../../../../../../store/upload-actions";
import {isObjectExist} from "../../../../../../utils/Utils";

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
import {Loader} from "../../../../../../utils/Constants";

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: theme.spacing(4, 0, 3.5, 0)
    },
}));

const fileLoader = () => {
    const {divider} = useStyles();
    const saveResult = useSelector(state => state.upload.result);
    const loader = useSelector(state => state.upload.loader);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    const tmdbIdRef = useRef();
    const fileNameRef = useRef();

    const [fileLocation, setFileLocation] = useState('');
    const [isSingleMovieUpload, setIsSingleMovieUpload] = useState(false);
    const [isTmdbIdValid, setIsTmdbIdValid] = useState(false);
    const [isFileNameValid, setIsFileNameValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {current: {value: tmdbId} = {value: ''}} = tmdbIdRef;
    const {current: {value: fileName} = {value: ''}} = fileNameRef;
    const handleUpload = () => {
        setIsLoading(true);
        if (isSingleMovieUpload) {
            let data = {
                location: fileLocation,
                tmdbId: tmdbId,
                fileName: fileName
            }
            dispatch(saveSingleMovie(data));
        } else {
            dispatch(scanFolderAndSave(fileLocation));
        }
    };

    useEffect(() => {
        if (isObjectExist(saveResult) && loader === Loader.folderScan) {
            setIsLoading(false);
            const {message, success} = saveResult;
            let info;
            let type;
            if (isSingleMovieUpload) {
                info = success
                    ? `Uploading ${fileName} from ${fileLocation} folder: ${message}`
                    : `Failed upload movie '${fileName}' from ${fileLocation} folder: ${message}`;
                type = success ? 'success' : 'error';
            } else {
                info = success
                    ? `${message}`
                    : `Failed to upload movies from ${fileLocation} folder: ${message}`;
                type = success ? 'success' : 'error';
            }
            onSetSnackbar({open: true, message: info, type: type});
            resetForm();
        }
    }, [saveResult])

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