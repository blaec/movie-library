import React, {useEffect} from 'react';
import {fetchUploadHistory} from "../../../../store/upload-actions";
import {useDispatch, useSelector} from "react-redux";

const history = () => {
    console.log("render");
    const uploadHistory = useSelector(state => state.upload.history);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("load");
        dispatch(fetchUploadHistory());
    }, []);

    return (
        <div>
            {uploadHistory.map(movie => movie.title)}
        </div>
    );
};

export default history;