import React, {useState} from 'react';
import axios from '../../../axios-movies';

import FileLoader from "./components/FileLoader";
import WishLoader from "./components/WishLoader";
import {getSearchMovieUrl} from "../../../utils/UrlUtils";
import './Upload.css';

const upload = () => {
    const [tmdbId, setTmdbId] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileLocation, setFileLocation] = useState('');
    const [wishMovie, setWishMovie] = useState('');
    const [wishYear, setWishYear] = useState('');
    const [switchStatus, setSwitchStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setFileLocation('');
        setTmdbId('');
        setFileName('');
    }

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
            case "wish-movie":  setWishMovie(text); break;
            case "wish-year":   setWishYear(text);  break;
            default:            alert("Upload -> handleTextFields -> wrong id")
        }
    }

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
        axios.get(getSearchMovieUrl({query: wishMovie, year: wishYear}))
            .then(response => {
                console.log(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }

    return (
        <div className="Upload">
            <FileLoader submit={handleUpload}
                        location={fileLocation}
                        loading={isLoading}
                        onChangeRadio={handleChooseLocation}
                        onChangeTextField={handleTextFieldChange}
                        onChangeSwitch={handleSwitchChange}
                        switchIsOn={switchStatus}
            />
            <WishLoader submit={handleSearchWishMovie}
                        loading={isLoading}
                        onChangeTextField={handleTextFieldChange}
            />
        </div>
    );
};

export default upload;