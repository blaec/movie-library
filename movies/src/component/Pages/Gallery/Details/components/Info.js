import React from 'react';

import {Divider, Typography} from "@material-ui/core";

import {playTime, year} from "../../../../../utils/Utils";
import '../Details.css';

const info = props => {
    const metadata = {
        release_date: year(props.details.release_date),
        runtime: playTime(props.details.runtime),
        resolution: props.file.resolution,
        fileSize: `${props.file.size}Gb`
    };

    return (
        <div className="Info">
            <Typography variant="caption" display="block" gutterBottom color="textSecondary">
                {props.file.location}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                {Object.values(metadata).join(` \u2B24 `)}
            </Typography>
            <Typography variant="h5" gutterBottom>
                <strong>{props.details.title}</strong>
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                {props.genres}
            </Typography>
            <Divider/>
            <Typography variant="body1" gutterBottom>
                <strong>{props.details.tagline}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
                {props.details.overview}
            </Typography>
        </div>
    );
};

export default info;