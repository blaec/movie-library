import React from 'react';
import {useTranslation} from "react-i18next";
import MyResponse from "../../../../../../../../UI/MyResponse";

import {Divider, List} from "@material-ui/core";
import Person from "./Person";
import {groupBy} from "../../../../../../../../utils/Utils";


const crew = (props) => {
    const {details} = props;
    const {t} = useTranslation('common');

    console.log(details);

    // const grouped = groupBy(details, detail => detail.id);
    // console.log(grouped);

    let filteredCast = details.map(actor => <Person key={actor.credit_id} {...actor}/>);
    let filteredCastWithDivider = filteredCast.length === 0
        ? <MyResponse message={t('text.noCastIsAvailableAtThisStage')}/>
        : filteredCast.reduce((prev, curr, index) => [prev, <Divider key={`${index}.${curr.key}`} val={`${index}.${curr.key}`}/>, curr]);

    return (
        <List>
            {filteredCastWithDivider}
        </List>
    );
};

export default crew;