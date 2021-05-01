import React, {useState} from 'react';
import axios from '../../../axios-movies';
import {useDispatch} from "react-redux";

import FileLoader from "./components/FileLoader";
import WishLoader from "./components/WishLoader";
import * as UrlUtils from "../../../utils/UrlUtils";
import {movieApi} from "../../../utils/UrlUtils";
import * as actions from "../../../store/actions";

import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
}));

const upload = () => {
    const {root} = useStyles();
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(actions.setSnackbar(snackbar));

    const [tmdbId, setTmdbId] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileLocation, setFileLocation] = useState('');
    const [wishTitle, setWishTitle] = useState('');
    const [wishYear, setWishYear] = useState('');
    const [switchStatus, setSwitchStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            case "wish-title":  setWishTitle(text); break;
            case "wish-year":   setWishYear(text);  break;
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

    const handleSaveWishMovie = (wishMovie) => {
        setIsLoading(true);
        axios.post(movieApi.post.saveWishMovie, wishMovie)
            .then(response => {
                setIsLoading(false);
                onSetSnackbar({open: true, message: `Movie '${wishMovie.title}' added to wishlist`, type: 'success'});
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                onSetSnackbar({open: true, message: `Failed to movie '${wishMovie.title}' to wishlist`, type: 'error'});
            });
    };

    let loaders = [
        <WishLoader {...{wishTitle: wishTitle, wishYear: wishYear}}
                    onChangeTextField={handleTextFieldChange}
                    onAdd={handleSaveWishMovie}
        />,
        <FileLoader {...{tmdbId: tmdbId, fileName: fileName}}
                    location={fileLocation}
                    loading={isLoading}
                    switchIsOn={switchStatus}
                    onChangeRadio={handleChooseLocation}
                    onChangeTextField={handleTextFieldChange}
                    onChangeSwitch={handleSwitchChange}
                    onSubmit={handleUpload}
        />
    ]

    return (
        <React.Fragment>
            <Grid container className={root}>
                <Grid item xs={1} lg={2} xl={3}/>
                <Grid item xs={10} lg={8} xl={6}>
                    <Grid container spacing={2}>
                        {loaders.map((loader, index) =>
                            <Grid key={index} item xs={12} md={6}>
                                {loader}
                            </Grid>)
                        }
                    </Grid>
                </Grid>
                <Grid item xs={1} lg={2} xl={3}/>
            </Grid>
        </React.Fragment>
    );
};

export default upload;