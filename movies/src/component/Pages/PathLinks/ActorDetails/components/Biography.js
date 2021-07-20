import React, {useState} from 'react';
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    customBox: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 3,
        overflow: "hidden"
    }
}));

const biography = (props) => {
    const {biography} = props;
    const {customBox} = useStyles();

    const [isEllipsis, setIsEllipsis] = useState(customBox);

    const handleViewBiography = () => {
        setIsEllipsis(isEllipsis === null ? customBox : null);
    };

    return (
        <Box className={isEllipsis} onClick={handleViewBiography}>
            {biography}
        </Box>
    );
};

export default biography;