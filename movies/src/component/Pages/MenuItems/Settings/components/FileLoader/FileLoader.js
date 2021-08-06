import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import MyFormLabel from "../../../../../../UI/MyFormLabel";
import MySubmitButton from "../../../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../../../UI/Buttons/MyButtonGrid";
import MyLinearProgress from "../MyLinearProgress";
import FileTmdbIdInput from "./FileTmdbIdInput";
import FileNameInput from "./FileNameInput";
import FileRadios from "./FileRadios";
import {feedbackActions} from "../../../../../../store/state/feedback/feedback-slice";
import {saveSingleMovie, scanFolderAndSave} from "../../../../../../store/state/settings/settings-actions";
import {isArrayExist, isObjectExist} from "../../../../../../utils/Utils";

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
import {settingsActions} from "../../../../../../store/state/settings/settings-slice";

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: theme.spacing(4, 0, 3.5, 0)
    },
}));

const fileLoader = () => {
    const {divider} = useStyles();
    const saveResult = useSelector(state => state.settings.result);
    const saveResults = useSelector(state => state.settings.results);
    const loader = useSelector(state => state.settings.loader);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));
    const {t} = useTranslation('common');

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
            const {title, message, success} = saveResult;
            let info = success
                ? t('snackbar.uploadedMovie', {name: fileName, folder: fileLocation, message: message, file: title})
                : t('snackbar.failedToUploadMovie', {title: fileName, folder: fileLocation, message: message});
            let type = success ? 'success' : 'error';
            onSetSnackbar({message: info, type: type});
            resetForm();
        }
    }, [saveResult])

    useEffect(() => {
        if (isArrayExist(saveResults) && loader === Loader.folderScan) {
            setIsLoading(false);
            let resultCount = saveResults.length;
            let alreadyExistCount = saveResults.filter(result => result.message === 'already exist').length
            let successCount = saveResults.filter(result => result.success).length;
            let failCount = saveResults.filter(result => !result.success).length - alreadyExistCount;

            let type = 'error';
            let info = t('snackbar.failedToUploadMovie', {folder: fileLocation});
            if (alreadyExistCount === resultCount) {
                type = 'info';
                info = t('snackbar.noNewMovieFound', {folder: fileLocation});
            } else if (successCount > 0 && failCount > 0) {
                type = 'warn';
                info = t('snackbar.uploadedMoviesAndFailedToUploadMovies', {succeeded: successCount, failed: failCount, folder: fileLocation});
            } else if (successCount > 0) {
                type = 'success';
                info = t('snackbar.uploadedMovies', {succeeded: successCount, folder: fileLocation});
            }

            onSetSnackbar({message: info, type: type});
            resetForm();
        }
    }, [saveResults])

    const resetForm = () => {
        setFileLocation('');
        tmdbIdRef.current.value = '';
        fileNameRef.current.value = '';
        setIsSingleMovieUpload(false);
        dispatch(settingsActions.setResult({}));
        dispatch(settingsActions.setResults([]));
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
                    <MyFormLabel text={t('text.movieLocation')}/>
                    <FileRadios
                        fileLocation={fileLocation}
                        onChooseLocation={handleChooseLocation}/>
                </FormControl>
                <Divider className={divider}/>
                <FormControl component="single-upload">
                    <FormControlLabel
                        label={t('text.singleMovieUpload')}
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
                        caption={t('text.scan')}
                        disabled={isScanButtonDisabled}
                        onSubmit={handleUpload}
                    />
                </MyButtonGrid>
            </CardActions>
        </Card>
    );
}

export default fileLoader;