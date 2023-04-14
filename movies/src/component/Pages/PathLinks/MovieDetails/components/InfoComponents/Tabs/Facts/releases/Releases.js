import React from 'react';
import {useTranslation} from "react-i18next";

import Fact from "../../../../../../../../../UI/Fact";
import {isArrayExist} from "../../../../../../../../../utils/Utils";
import Release from "./Release";

import {makeStyles} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflow: 'auto',
    },
}));

const releases = (props) => {
    const{releaseDates} = props
    const {root} = useStyles();
    const {t} = useTranslation('common');

    const usReleaseDates = releaseDates.results
        .filter(result => {
            const {iso_3166_1} = result;
            return iso_3166_1 === 'US';
        })
        .map(usRelease => {
            const {release_dates} = usRelease;
            return release_dates;
        });

    let usReleases = null;
    if (isArrayExist(usReleaseDates)) {
        usReleases = usReleaseDates[0].map((rd, index) => (
            <Release
                key={index}
                data={rd}
            />
        ));
    }
    const showReleases = usReleases === null ? null : ' ';


    return (
        <React.Fragment>
            <Fact header={t('text.releases')}
                  text={showReleases}/>
            <div className={root}>
                {usReleases}
            </div>
        </React.Fragment>
    );
};

export default releases;