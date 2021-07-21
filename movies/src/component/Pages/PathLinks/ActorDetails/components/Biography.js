import React, {useState} from 'react';
import {useSelector} from "react-redux";

import {isArraysExist} from "../../../../../utils/Utils";
import {getImageUrl, posterSizes} from "../../../../../utils/UrlUtils";

import {Box, makeStyles, Paper} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    customBox: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 3,
        overflow: "hidden"
    },
    images: {
        display: 'flex',
        overflow: 'auto',
    },
}));

const biography = (props) => {
    const {biography} = props;
    const {customBox, images} = useStyles();

    const [isEllipsis, setIsEllipsis] = useState(customBox);

    const actorImages = useSelector(state => state.details.actorImages);

    const handleViewBiography = () => {
        setIsEllipsis(isEllipsis === null ? customBox : null);
    };


    let actorGallery = null;
    if (isArraysExist(actorImages)) {
        actorGallery = actorImages.map((image, index) => {
            const {file_path} = image;
            return (
                <img
                    key={index}
                    height={300}
                    src={getImageUrl(file_path, posterSizes.w500)}
                    alt=''
                />
            )
        });
    }


    return (
        <React.Fragment>
            <Box className={isEllipsis} onClick={handleViewBiography}>
                {biography}
            </Box>
            <Paper className={images}>
                {actorGallery}
            </Paper>
        </React.Fragment>
    );
};

export default biography;