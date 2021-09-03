import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

import Switch from "@material-ui/core/Switch";
import {makeStyles} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(5),
    }
}));

const movieStatusSwitch = (props) => {
    const {onSwitchChange} = props;
    const {root} = useStyles();
    const [isCollectionMovie, setIsCollectionMovie] = useState(false);
    const {t} = useTranslation('common');

    const handleCollectionMovieToggle = () => {
        setIsCollectionMovie(!isCollectionMovie);
        onSwitchChange(!isCollectionMovie);
    };

    const switchControl = (
        <Switch
            checked={isCollectionMovie}
            onChange={handleCollectionMovieToggle}
        />
    );

    return (
        <FormControlLabel
            className={root}
            control={switchControl}
            label={t('text.movieSwitch')}
        />
    );
};

export default movieStatusSwitch;