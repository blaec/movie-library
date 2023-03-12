import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {useHistory, useParams} from "react-router";

import {reactLinks} from "../../../../../utils/UrlUtils";

import Switch from "@material-ui/core/Switch";
import {FormGroup, Grid, makeStyles, Typography, withStyles} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(5),
    },
    _switch: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(5)
    }
}));

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 32,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 1,
        color: theme.palette.common.white,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 14,
        height: 14,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
    },
    checked: {},
}))(Switch);


const movieStatusSwitch = (props) => {
    const {onSwitchChange} = props;
    const history = useHistory();
    const params = useParams();
    const {actorId, type} = params;
    const {root, _switch} = useStyles();
    const [isCollectionMovie, setIsCollectionMovie] = useState(false);
    const {t} = useTranslation('common');
    const [state, setState] = React.useState(type === 'crew');

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

    const handleChange = () => {
        setState(!state);
        const newType = state ? 'cast' : 'crew';
        history.push(`${reactLinks.actorDetailsEndpoint}${actorId}/type/${newType}`)
    };


    return (
        <FormGroup row={true}>
            <FormControlLabel
                className={root}
                control={switchControl}
                label={t('text.movieSwitch')}
            />
            <Typography
                component="div"
                className={_switch}
            >
                <Grid
                    container
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item>{t('tab.cast')}</Grid>
                    <Grid item>
                        <AntSwitch
                            checked={state}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>{t('tab.crew')}</Grid>
                </Grid>
            </Typography>
        </FormGroup>
    );
};

export default movieStatusSwitch;