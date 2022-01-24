import React from 'react';
import {useTranslation} from "react-i18next";

import Actor from "./Actor";
import MyResponse from "../../../../../../../../UI/MyResponse";

import {Divider, List} from "@material-ui/core";


const cast = (props) => {
    const {details} = props;
    const {t} = useTranslation('common');

    let filteredCast = details.map(actor => <Actor key={actor.id} {...actor}/>);
    let filteredCastWithDivider = filteredCast.length === 0
        ? <MyResponse message={t('text.noCastIsAvailableAtThisStage')}/>
        : filteredCast.reduce((prev, curr, index) => [prev, <Divider key={`${index}.${curr.key}`} val={`${index}.${curr.key}`}/>, curr]);

    return (
        <List>
            {filteredCastWithDivider}
        </List>
    );
};

export default cast;