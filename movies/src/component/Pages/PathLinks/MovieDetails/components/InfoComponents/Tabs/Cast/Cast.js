import React from 'react';

import Actor from "./Actor";

import {Divider, List} from "@material-ui/core";

const cast = (props) => {
    const {details} = props;

    let filteredCast = details.map(actor => <Actor key={actor.id} {...actor}/>);
    let filteredCastWithDivider = filteredCast.size === 0
        ? filteredCast
        : filteredCast.reduce((prev, curr, index) => [prev, <Divider key={index}/>, curr]);
    return (
        <List>
            {filteredCastWithDivider}
        </List>
    );
};

export default cast;