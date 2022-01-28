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
    const {saveResult, hasSaveResult} = useSelector(state => state.settings.result);
    const {saveResults, hasSaveResults} = useSelector(state => state.settings.results);
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
        if (hasSaveResult && loader === Loader.folderScan) {
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
        if (hasSaveResults && loader === Loader.folderScan) {
            setIsLoading(false);
            const resultCount = saveResults.length;
            const alreadyExistCount = saveResults.filter(result => result.message === 'Already exist').length
            const successCount = saveResults.filter(result => result.success).length;
            const invalidTitleCount = saveResults.filter(result => !result.validTitle).length;
            const funcFail = result => !result.success;
            const failCount = saveResults.filter(funcFail).length - alreadyExistCount;
            const fails = saveResults.filter(funcFail).filter(result => result.message !== 'Already exist');
            const failMessages = fails.map(m => m.message).join(",");
            const failTitles = fails.map(m => m.title).join(",");

            const snackbarMessages = {
                'hasError': {
                    message: t('snackbar.failedToUploadMovie', {title: failTitles, folder: fileLocation, message: failMessages}),
                    type: 'error'
                },
                'hasNoResults': {
                    message: t('snackbar.noNewMovieFound', {folder: fileLocation}),
                    type: 'info'
                },
                'hasFails': {
                    message: t('snackbar.uploadedMoviesAndFailedToUploadMovies', {succeeded: successCount, failed: failCount, folder: fileLocation}),
                    type: 'warning'
                },
                'hasInvalid': {
                    message: t('snackbar.uploadedMoviesWithInvalidTitle', {succeeded: successCount, invalid: invalidTitleCount, folder: fileLocation}),
                    type: 'warning'
                },
                'hasSuccess': {
                    message: t('snackbar.uploadedMovies', {succeeded: successCount, folder: fileLocation}),
                    type: 'success'
                },
            };

            let snackbar = snackbarMessages.hasError;
            if (alreadyExistCount === resultCount) {
                snackbar = snackbarMessages.hasNoResults;
            } else if (successCount > 0) {
                if (failCount > 0) {
                    snackbar = snackbarMessages.hasFails;
                } else if (invalidTitleCount > 0) {
                    snackbar = snackbarMessages.hasInvalid;
                } else {
                    snackbar = snackbarMessages.hasSuccess;
                }
            }

            onSetSnackbar(snackbar);
            resetForm();
        }
    }, [saveResults])

    const resetForm = () => {
        setFileLocation('');
        tmdbIdRef.current.value = '';
        fileNameRef.current.value = '';
        setIsSingleMovieUpload(false);
        dispatch(settingsActions.resetResult());
        dispatch(settingsActions.resetResults());
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