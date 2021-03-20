import React from 'react';
import Fact from "./Fact";
import {Typography} from "@material-ui/core";

const facts = (props) => {
    const {omdbDetails, tmdbDetails} = props;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return (
        <div>
            <Typography component="div">
                <Fact header="Original title:"
                      text={tmdbDetails.original_title}/>
                <Fact header="Original Language:"
                      text={tmdbDetails.original_language}/>
                <Fact header="Directed By:"
                      text={omdbDetails.Director}/>
                <Fact header="Budget:"
                      text={formatter.format(tmdbDetails.budget)}/>
                <Fact header="Revenue:"
                      text={formatter.format(tmdbDetails.revenue)}/>
                <Fact header="Released:"
                      text={omdbDetails.Released}/>
                <Fact header="DVD:"
                      text={omdbDetails.DVD}/>
                <Fact header="Production Companies:"
                      text={tmdbDetails.production_companies.map(company => company.name).join(', ')}/>
                <Fact header="Production Countries:"
                      text={tmdbDetails.production_countries.map(country => country.name).join(', ')}/>
            </Typography>
        </div>
    );
};

export default facts;