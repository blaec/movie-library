import React, {useState} from 'react';
import axios from '../../../axios-movies';

import FileLoader from "./components/FileLoader";
import WishLoader from "./components/WishLoader";
import MySnackbar, {initialSnackBarState} from "../../../UI/MySnackbar";
import {getSearchMovieUrl, movieApi} from "../../../utils/UrlUtils";
import './Upload.css';

const upload = () => {
    const [tmdbId, setTmdbId] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileLocation, setFileLocation] = useState('');
    const [wishTitle, setWishTitle] = useState('');
    const [wishYear, setWishYear] = useState('');
    const [switchStatus, setSwitchStatus] = useState(false);
    const [wishMovies, setWishMovies] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarProps, setSnackbarProps] = useState(initialSnackBarState);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarProps(initialSnackBarState);
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

    const handleTextFieldChange = (event) => {
        let text = event.target.value;
        switch (event.target.id) {
            case "tmdb-id":     setTmdbId(text);    break;
            case "file-name":   setFileName(text);  break;
            case "wish-title":  setWishTitle(text); break;
            case "wish-year":   setWishYear(text);  break;
            default:            alert("Upload -> handleTextFields -> wrong id")
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
            axios.post("/movies/file", data)
                .then(response => {
                    resetForm();
                    setIsLoading(false);
                    alert(`uploading ${fileName} from ${fileLocation} folder completed successfully.`)
                })
                .catch(error => {
                    resetForm();
                    setIsLoading(false);
                    console.log(error);
                });
        } else {
            axios.post(`/movies/${fileLocation}`)
                .then(response => {
                    resetForm();
                    setIsLoading(false);
                    alert(`uploading from ${fileLocation} folder completed successfully.`)
                })
                .catch(error => {
                    resetForm();
                    setIsLoading(false);
                    console.log(error);
                });
        }
    };

    const handleSearchWishMovie = () => {
        setIsLoading(true);
        axios.get(getSearchMovieUrl({query: wishTitle, year: wishYear}))
            .then(response => {
                let foundMovies = response.data.results;
                setWishMovies(foundMovies);
                setIsLoading(false);
                if (foundMovies.length > 0) {
                    setSnackbarProps({open: true, message: `Found ${foundMovies.length} movies`, type: 'success'});
                } else {
                    setSnackbarProps({open: true, message: `Nothing found`, type: 'warning'});
                }
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                setSnackbarProps({open: true, message: `Failed to search the movies`, type: 'error'});
            });
    };

    const handleSaveWishMovie = (wishMovie) => {
        setIsLoading(true);
        axios.post(movieApi.saveWishMovie, wishMovie)
            .then(response => {
                setIsLoading(false);
                setSnackbarProps({open: true, message: `Movie '${wishMovie.title}' added to wishlist`, type: 'success'});
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                setSnackbarProps({open: true, message: `Failed to movie '${wishMovie.title}' to wishlist`, type: 'error'});
            });
    };
    let snackbar = null;
    if (snackbarProps.open) {
        snackbar = <MySnackbar {...snackbarProps}
                               close={handleSnackbarClose}/>;
    }

    return (
        <div className="Upload">
            <WishLoader submit={handleSearchWishMovie}
                        add={handleSaveWishMovie}
                        loading={isLoading}
                        wishResults={wishMovies}
                        onChangeTextField={handleTextFieldChange}
            />
            <FileLoader submit={handleUpload}
                        location={fileLocation}
                        loading={isLoading}
                        onChangeRadio={handleChooseLocation}
                        onChangeTextField={handleTextFieldChange}
                        onChangeSwitch={handleSwitchChange}
                        switchIsOn={switchStatus}
            />
            {snackbar}
        </div>
    );
};

export default upload;