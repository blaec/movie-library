import React from 'react';

import {FormControl, makeStyles, MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 50,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        '&:before': {
            borderColor: 'white',
        },
        '&:after': {
            borderColor: 'white',
        },
        '&:not(.Mui-disabled):hover::before': {
            borderColor: 'white',
        },
    },
    icon: {
        fill: 'white',
    },
    root: {
        color: 'white',
    },
}));

const LanguagePicker = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState(10);

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    return (
        <FormControl className={classes.formControl}>
            <Select
                className={classes.select}
                inputProps={{
                    classes: {
                        icon: classes.icon,
                        root: classes.root,
                    },
                }}
                value={age}
                onChange={handleChange}
            >
                <MenuItem value={10}>EN</MenuItem>
                <MenuItem value={20}>RU</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguagePicker;