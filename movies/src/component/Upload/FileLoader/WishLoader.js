import React from 'react';
import MyTextField from "../../../UI/MyTextField";
import MySubmitButton from "../../../UI/Buttons/MySubmitButton";

import {Card, CardActions, CardContent, FormControl, FormLabel} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";

const wishLoader = props => {
    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl component="wish-upload">
                    <FormLabel>Add to Wish List</FormLabel>
                    <MyTextField id="wish-movie"
                                 label="Movie name"
                                 helperText="Enter movie name"
                                 onChangeTextField={props.onChangeTextField}
                    />
                </FormControl>
            </CardContent>
            <CardActions >
                <MySubmitButton icon={<AddCircleTwoToneIcon />}
                                submit={props.submit}
                                caption="Add"
                />
            </CardActions>
        </Card>
    );
};

export default wishLoader;