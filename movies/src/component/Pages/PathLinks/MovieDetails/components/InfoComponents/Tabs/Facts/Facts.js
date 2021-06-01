import React from 'react';

import Fact from "./Fact";
import {joinNames} from "../../../../../../../../utils/Utils";

import {Typography} from "@material-ui/core";

const facts = (props) => {
    const {
        details: {
            Director,
            Awards,
            Released,
            DVD,
            Title,
            budget,
            revenue,
            production_companies,
            production_countries,
            original_language
        },
    } = props;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return (
        <Typography component="div">
            <Fact header="English title: "
                  text={Title}/>
            <Fact header="Directed By: "
                  text={Director}/>
            <Fact header="Budget: "
                  text={formatter.format(budget)}/>
            <Fact header="Revenue: "
                  text={formatter.format(revenue)}/>
            <Fact header="Awards: "
                  text={Awards}/>
            <Fact header="Released: "
                  text={Released}/>
            <Fact header="DVD: "
                  text={DVD}/>
            <Fact header="Production Companies: "
                  text={joinNames(production_companies)}/>
            <Fact header="Production Countries: "
                  text={joinNames(production_countries)}/>
            <Fact header="Original Language: "
                  text={original_language}/>
        </Typography>
    );
};

export default facts;