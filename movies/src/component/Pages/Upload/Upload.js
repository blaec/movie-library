import React, {useState} from 'react';
import './Upload.css';
import axios from '../../../axios-movies';
import FileLoader from "./components/FileLoader";
import WishLoader from "./components/WishLoader";

const upload = () => {
    const [tmdbId, setTmdbId] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileLocation, setFileLocation] = useState('');
    const [wishMovie, setWishMovie] = useState('');
    const [switchStatus, setSwitchStatus] = useState(false);

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
            default:            alert("Upload -> handleTextFields -> wrong id")
        }
    }

    const handleUpload = () => {
        if (switchStatus) {
            let data = {
               location: fileLocation,
               tmdbId: tmdbId,
               fileName: fileName
            }
            axios.post("/movies/file", data)
                .then(response => {
                    resetForm();
                    alert(`uploading ${fileName} from ${fileLocation} folder completed successfully.`)
                })
                .catch(error => {
                    resetForm();
                    console.log(error);
                });
        } else {
            axios.post(`/movies/${fileLocation}`)
                .then(response => {
                    resetForm();
                    alert(`uploading from ${fileLocation} folder completed successfully.`)
                })
                .catch(error => {
                    resetForm();
                    console.log(error);
                });
        }
    };

    return (
        <div className="Upload">
            <FileLoader submit={handleUpload}
                        location={fileLocation}
                        onChangeRadio={handleChooseLocation}
                        onChangeTextField={handleTextFieldChange}
                        onChangeSwitch={handleSwitchChange}
                        switchIsOn={switchStatus}
            />
            <WishLoader submit={handleUpload}/>
        </div>
    );
};

export default upload;