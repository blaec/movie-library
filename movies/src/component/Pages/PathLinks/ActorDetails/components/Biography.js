import React, {useState} from 'react';
import {useSelector} from "react-redux";
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
        marginTop: theme.spacing(2),
    },
}));

const biography = (props) => {
    const {biography} = props;
    const {customBox, images} = useStyles();

    const [isEllipsis, setIsEllipsis] = useState(customBox);

    const {actorImages, isActorImagesLoaded} = useSelector(state => state.details.actorImages);

    const handleViewBiography = () => {
        setIsEllipsis(isEllipsis === null ? customBox : null);
    };


    let actorGallery = null;
    if (isActorImagesLoaded) {
        actorGallery = actorImages.map((image, index) => {
            const {file_path} = image;
            return (
                <img
                    key={index}
                    height={150}
                    src={getImageUrl(file_path, posterSizes.w342)}
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
            <Paper className={images} square>
                {actorGallery}
            </Paper>
        </React.Fragment>
    );
};

export default biography;