import React, {useEffect, useState} from 'react';
import MyTextField from "../../../../UI/MyTextField";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";

import {getImageUrl} from "../../../../utils/UrlUtils";
import ButtonGrid from "../../../../UI/Buttons/ButtonGrid";
import {year} from "../../../../utils/Utils";

import {Card, CardActions, CardContent, FormControl, FormLabel, LinearProgress, Paper} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import Carousel from "react-material-ui-carousel";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    image: {
        width: 200,
        height: 300,
        margin: 'auto',
    },
    imageFit: {
        width: 'inherit',
        height: 'inherit',
    }
}));


const inputs = {
    "wish-title": {
        label: "Movie title",
        helperText: "Enter movie title",
        text: "wishTitle"
    },
    "wish-year": {
        label: "Release year",
        helperText: "Enter movie release year",
        text: "wishYear"
    }
};

const wishLoader = props => {
    const {loading, wishResults, onChangeTextField, onSubmit, onAdd} = props;
    const classes = useStyles();
    const [selectedWishMovie, setSelectedWishMovie] = useState();
    useEffect(() => {
        if (wishResults) {
            setSelectedWishMovie(wishResults[0]);
        }
    }, [wishResults]);

    let movie = null;
    if (wishResults) {
        movie = <Carousel animation="slide"
                          autoPlay={false}
                          onChange={(active) => {setSelectedWishMovie(wishResults[active]);}}
                          navButtonsAlwaysVisible>
                    {wishResults.map((poster, idx) => {
                        const {title, release_date, poster_path} = poster;
                        let errImage = `https://via.placeholder.com/1000x1500.png?text=${title} (${year(release_date)})`;
                        return <div key={idx}>
                                    <Paper className={classes.image}
                                           style={{backgroundImage: `url("${errImage}")`}}
                                           elevation={3}>
                                        <img className={classes.imageFit}
                                             src={getImageUrl(poster_path)}
                                             onError={(e)=>{e.target.onerror = null; e.target.src=errImage}}
                                             alt=''/>
                                    </Paper>
                               </div>;
                        }
                    )}
                </Carousel>;
    }

    const movieInputs = Object.keys(inputs).map(inputKey =>
        <MyTextField key={inputKey}
                     id={inputKey}
                     text={props[inputs[inputKey].text]}
                     label={inputs[inputKey].label}
                     helperText={inputs[inputKey].helperText}
                     onChangeTextField={onChangeTextField}
        />
    );

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl component="wish-upload">
                    <FormLabel>Add to Wish List</FormLabel>
                    {movieInputs}
                </FormControl>
                <LinearProgress hidden={!loading}/>
            </CardContent>
            <CardActions>
                <ButtonGrid>
                    <MySubmitButton icon={<SearchTwoToneIcon/>}
                                    buttonStyles={{marginRight: 1}}
                                    caption="Search"
                                    onSubmit={onSubmit}
                    />
                    <MySubmitButton icon={<AddCircleTwoToneIcon/>}
                                    disabled={!wishResults}
                                    caption="Add"
                                    onSubmit={() => onAdd(selectedWishMovie)}
                    />
                </ButtonGrid>
            </CardActions>
            {movie}
        </Card>
    );
};

export default wishLoader;