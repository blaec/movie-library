import React, {useState} from 'react';

import MyArrowBack from "../../../../UI/Buttons/Icons/MyArrowBack";
import MyDelete from "../../../../UI/Buttons/Icons/MyDelete";
import {getImageUrl} from "../../../../utils/UrlUtils";
import DeleteDialog from "./DeleteDialog";
import {drawer} from "../../../../utils/Constants";

import Carousel from "react-material-ui-carousel";
import {makeStyles} from "@material-ui/core/styles";

const TIMEOUT = 300;
const MOBILE_WIN_WIDTH = 600;

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    }
}));


const backdropImage = props => {
    const {id, backdrops, alt, onClose, onDelete} = props;
    const {root} = useStyles();
    const [isDeleting, setIsDeleting] = useState(false);

    const marginBorders = (window.innerHeight < window.innerWidth)
        ? window.innerWidth > 1000 ? .5 : .8
        : 1;
    const drawerWidth = window.innerWidth > MOBILE_WIN_WIDTH
        ? drawer.width
        : 0;
    const windowWidth = (window.innerWidth - drawerWidth) * marginBorders;

    const handleDeletedMovie = () => {
        setIsDeleting(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleting(false);
    };

    return (
        <React.Fragment>
            <div className={root}>
                <MyArrowBack onClose={onClose}/>
                <MyDelete onDelete={handleDeletedMovie}/>
                <Carousel timeout={TIMEOUT}
                          animation="fade"
                          navButtonsAlwaysInvisible>
                    {backdrops.map((backdrop, idx) => {
                        const {aspect_ratio, file_path} = backdrop;
                        return <img key={idx + 1}
                                    height={windowWidth / aspect_ratio}
                                    src={getImageUrl(file_path)}
                                    alt={alt}
                        />;
                    })}
                </Carousel>
            </div>
            <DeleteDialog open={isDeleting}
                          onExit={handleCloseDeleteDialog}
                          onDelete={() => onDelete(id)}
            />
        </React.Fragment>
    );
};

export default backdropImage;