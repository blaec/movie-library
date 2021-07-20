import React, {useState} from 'react';
import {Box, makeStyles, Paper} from "@material-ui/core";
import {useSelector} from "react-redux";
import {isArraysExist} from "../../../../../utils/Utils";
import {getImageUrl, posterSizes} from "../../../../../utils/UrlUtils";

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
            const {key, file_path} = image;
            return (
                <img
                    key={key}
                    height={300}
                    src={getImageUrl(file_path, posterSizes.w500)}
                    alt=''
                />
            )
        });
    }


    console.log(actorGallery);
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