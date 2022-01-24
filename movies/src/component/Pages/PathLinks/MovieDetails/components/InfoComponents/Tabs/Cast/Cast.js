import React from 'react';

import Actor from "./Actor";

import {Divider, List} from "@material-ui/core";
import MyResponse from "../../../../../../../../UI/MyResponse";
import {useTranslation} from "react-i18next";

const cast = (props) => {
    const {details} = props;
    const {t} = useTranslation('common');

    // TODO may display no-cast message before cast is loaded
    let filteredCast = details.map(actor => <Actor key={actor.id} {...actor}/>);
    let filteredCastWithDivider = filteredCast.length === 0
        ? <MyResponse message={t('text.noCastIsAvailableAtThisStage')}/>
        : filteredCast.reduce((prev, curr, index) => [prev, <Divider key={`${index}.${curr.key}`} val={`${index}.${curr.key}`}/>, curr]);
    console.log(filteredCast);
    return (
        <List>
            {filteredCastWithDivider}
        </List>
    );
};

export default cast;