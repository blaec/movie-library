import React from 'react';

import Carousel from "react-material-ui-carousel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

import './Details.css';
import {DRAWER_WIDTH, url_endpoints} from "../../utils/constants";

const TIMEOUT = 300;
const MOBILE_WIN_WIDTH = 600;

const backdropImage = props => {
    const drawerWidth = window.innerWidth > MOBILE_WIN_WIDTH
        ? DRAWER_WIDTH
        : 0;
    const windowWidth = window.innerWidth - drawerWidth;
    return (
        <div className="ImageBackdrop">
            <ArrowBackIcon onClick={props.closed}
                           className="ImageBack"
                           fontSize="large"/>
            <DeleteTwoToneIcon onClick={props.delete}
                               className="Delete"
                               fontSize="large"/>
            <Carousel timeout={TIMEOUT}
                      animation="fade"
                      navButtonsAlwaysInvisible>
                {props.backdrops.map( (backdrop, idx) => {
                    return <img key={idx}
                                height={windowWidth / backdrop.aspect_ratio}
                                src={url_endpoints.image + backdrop.file_path}
                                alt={props.alt}
                        />;
                    }
                )}
            </Carousel>
        </div>
    );
};

export default backdropImage;