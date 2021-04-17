import React, {useState} from 'react';

import '../Details.css';
import {getImageUrl} from "../../../../utils/UrlUtils";
import DeleteDialog from "./DeleteDialog";
import {DRAWER_WIDTH} from "../../../../utils/Constants";

import Carousel from "react-material-ui-carousel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

const TIMEOUT = 300;
const MOBILE_WIN_WIDTH = 600;

const backdropImage = props => {
    const {id, backdrops, alt, onClose, onDelete} = props;
    const [isDeleting, setIsDeleting] = useState(false);

    const marginBorders = (window.innerHeight < window.innerWidth)
        ? window.innerWidth > 1000 ? .5 : .8
        : 1;
    const drawerWidth = window.innerWidth > MOBILE_WIN_WIDTH
        ? DRAWER_WIDTH
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
            <div className="ImageBackdrop">
                <ArrowBackIcon onClick={onClose}
                               className="ImageBack"
                               fontSize="large"/>
                <DeleteTwoToneIcon onClick={handleDeletedMovie}
                                   className="Delete"
                                   fontSize="large"/>
                <Carousel timeout={TIMEOUT}
                          animation="fade"
                          navButtonsAlwaysInvisible>
                    {backdrops.map((backdrop, idx) =>
                        <img key={idx + 1}
                             height={windowWidth / backdrop.aspect_ratio}
                             src={getImageUrl(backdrop.file_path)}
                             alt={alt}
                        />
                    )}
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