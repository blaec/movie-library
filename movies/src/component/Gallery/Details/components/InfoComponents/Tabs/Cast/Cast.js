import React from 'react';

import Actor from "./Actor";

import {Divider, List} from "@material-ui/core";

const cast = (props) => {
    const {castDetails, onActorSelect} = props;

    let filteredCast = castDetails.map(actor => <Actor key={actor.id} {...actor} onActorSelect={onActorSelect}/>);
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