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
    const [dense, setDense] = useState(false);
    const {t} = useTranslation('common');

    const handleChangeDense = () => {
        setDense(!dense);
        onSwitchChange(!dense);
    };

    const switchElement = (
        <Switch
            checked={dense}
            onChange={handleChangeDense}
        />
    );

    return (
        <FormControlLabel
            className={root}
            control={switchElement}
            label={t('text.densePadding')}
        />
    );
};

export default movieStatusSwitch;