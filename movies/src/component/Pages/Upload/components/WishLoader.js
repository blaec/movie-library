import React from 'react';
import MyTextField from "../../../../UI/MyTextField";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";

import Movie from "../../Gallery/Gallery/components/Movie/Movie";

import {Card, CardActions, CardContent, FormControl, FormLabel, LinearProgress} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

const wishLoader = props => {
    let movie = null;
    if (props.wishResults) {
        movie = <Movie posterPath={props.wishResults[0].poster_path}
                       releaseDate={props.wishResults[0].release_date}/>
    }
    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl component="wish-upload">
                    <FormLabel>Add to Wish List</FormLabel>
                    <MyTextField id="wish-title"
                                 label="Movie title"
                                 helperText="Enter movie title"
                                 onChangeTextField={props.onChangeTextField}
                    />
                    <MyTextField id="wish-year"
                                 label="Release year"
                                 helperText="Enter movie release year"
                                 onChangeTextField={props.onChangeTextField}
                    />
                </FormControl>
                <LinearProgress hidden={!props.loading}/>
            </CardContent>
            <CardActions>
                <MySubmitButton icon={<SearchTwoToneIcon/>}
                                submit={props.submit}
                                caption="Search"
                />
                <MySubmitButton icon={<AddCircleTwoToneIcon/>}
                                submit={props.submit}
                                caption="Add"
                />
            </CardActions>
            {movie}
        </Card>
    );
};

export default wishLoader;