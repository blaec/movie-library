import React from 'react';
import {Button, Card, CardActions, CardContent, FormControl, FormLabel, TextField} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";

const wishLoader = props => {
    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl>
                    <FormLabel >Add to Wish List</FormLabel>
                    <TextField
                        id="standard-full-width"
                        color="primary"
                        label="Label"
                        style={{ margin: 8 }}
                        placeholder="Placeholder"
                        helperText="Full width!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
            </CardContent>
            <CardActions >
                <Button variant="outlined"
                        color="primary"
                        startIcon={<AddCircleTwoToneIcon />}
                        onClick={props.submit}>
                    Add
                </Button>
            </CardActions>
        </Card>
    );
};

export default wishLoader;