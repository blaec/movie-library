import React from 'react';

import {Divider, Typography} from "@material-ui/core";

import {playTime, year} from "../../../../utils/Utils";
import '../Details.css';

const info = props => {
    const metadata = {
        release_date: year(props.details.release_date),
        runtime: props.details.runtime !== 0
            ? playTime(props.details.runtime)
            : null,
        resolution: props.file.resolution,
        fileSize: props.file.size
            ? `${props.file.size}Gb`
            : null
    };

    return (
        <div className="Info">
            <Typography variant="caption" display="block" gutterBottom color="textSecondary">
                {props.file.location}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                {Object.values(metadata)
                    .filter(val => val !== null)
                    .join(` \u2B24 `)}
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