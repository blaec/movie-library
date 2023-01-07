import React from 'react';
import {useTranslation} from "react-i18next";

import {Card, CardActions, CardContent, Grid, Input, makeStyles, Slider, Typography} from "@material-ui/core";
import {FileCopyTwoTone} from "@material-ui/icons";
import {infoPage} from "../../../../../../store/localStorage/actions";


const useStyles = makeStyles({
    input: {
        width: 52,
    },
});

const MAX_PAGES = 1000;


const PageSlider = () => {
    const {input} = useStyles();
    const [value, setValue] = React.useState(infoPage.get() || 1);
    const {t} = useTranslation('common');

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        let pageCount = event.target.value === '' ? '' : Number(event.target.value);
        setValue(pageCount);
        infoPage.set(pageCount === '' ? 1 : pageCount);
    };

    const handleBlur = () => {
        if (value <= 0) {
            setValue(1);
            infoPage.set(1);
        } else if (value > MAX_PAGES) {
            setValue(MAX_PAGES);
            infoPage.set(MAX_PAGES);
        }
    };


    return (
        <Card variant="elevation">
            <CardContent>
                <div>
                    <Typography id="input-slider" gutterBottom>
                        {t('text.pageSlider')}
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <FileCopyTwoTone />
                        </Grid>
                        <Grid item xs>
                            <Slider
                                max={MAX_PAGES}
                                value={typeof value === 'number' ? value : 0}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                className={input}
                                value={value}
                                margin="dense"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 1,
                                    min: 0,
                                    max: MAX_PAGES,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    );
};

export default PageSlider;