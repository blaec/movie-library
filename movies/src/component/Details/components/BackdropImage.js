import React, {useState} from 'react';

import Carousel from "react-material-ui-carousel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

import '../Details.css';
import {getImageUrl} from "../../../utils/UrlUtils";
import DeleteDialog from "./DeleteDialog";
import {DRAWER_WIDTH} from "../../../utils/Constants";

const TIMEOUT = 300;
const MOBILE_WIN_WIDTH = 600;

const backdropImage = props => {
    const [isDeleting, setIsDeleting] = useState(false);

    const drawerWidth = window.innerWidth > MOBILE_WIN_WIDTH
        ? DRAWER_WIDTH
        : 0;
    const windowWidth = window.innerWidth - drawerWidth;

    const handleDeletedMovie = () => {
        setIsDeleting(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleting(false);
    };

    return (
        <React.Fragment>
            <div className="ImageBackdrop">
                <ArrowBackIcon onClick={props.closed}
                               className="ImageBack"
                               fontSize="large"/>
                <DeleteTwoToneIcon onClick={handleDeletedMovie}
                                   className="Delete"
                                   fontSize="large"/>
                <Carousel timeout={TIMEOUT}
                          animation="fade"
                          navButtonsAlwaysInvisible>
                    {props.backdrops.map( (backdrop, idx) => {
                        return <img key={idx}
                                    height={windowWidth / backdrop.aspect_ratio}
                                    src={getImageUrl(backdrop.file_path)}
                                    alt={props.alt}
                            />;
                        }
                    )}
                </Carousel>
            </div>
            <DeleteDialog open={isDeleting}
                          exit={handleCloseDeleteDialog}
                          delete={() => props.delete(props.movieId)}
            />
        </React.Fragment>
    );
};

export default backdropImage;