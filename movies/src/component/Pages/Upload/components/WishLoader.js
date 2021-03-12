import React from 'react';
import MyTextField from "../../../../UI/MyTextField";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";

import {Card, CardActions, CardContent, FormControl, FormLabel, LinearProgress} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import Carousel from "react-material-ui-carousel";
import {getImageUrl} from "../../../../utils/UrlUtils";

const wishLoader = props => {
    let movie = null;
    if (props.wishResults) {
        movie = <Carousel animation="slide"
                          autoPlay={false}
                          navButtonsAlwaysVisible>
                    {props.wishResults.map((poster, idx) => {
                            return <div>
                                        <p>{poster.title}</p>
                                        <img key={idx}
                                             height={200}
                                             onError={(e)=>{e.target.onerror = null; e.target.src="https://via.placeholder.com/200x300.png?text=NOT FOUND"}}
                                             src={getImageUrl(poster.poster_path)}
                                             alt={props.alt}
                                        />
                                    </div>;
                        }
                    )}
                </Carousel>
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