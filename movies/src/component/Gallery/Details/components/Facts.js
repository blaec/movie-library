import React from 'react';
import {Box, Typography} from "@material-ui/core";

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
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightBold">
                    Original title:
                </Box>
                    <Box fontSize="subtitle2.fontSize"
                     fontWeight="fontWeightLight">
                    {tmdbDetails.original_title}
                </Box>
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightBold">
                    Original Language:
                </Box>
                    <Box fontSize="subtitle2.fontSize"
                     fontWeight="fontWeightLight">
                    {tmdbDetails.original_language}
                </Box>
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightBold">
                    Directed By:
                </Box>
                    <Box fontSize="subtitle2.fontSize"
                     fontWeight="fontWeightLight">
                    {omdbDetails.Director}
                </Box>
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightBold">
                    Budget:
                </Box>
                    <Box fontSize="subtitle2.fontSize"
                     fontWeight="fontWeightLight">
                    {formatter.format(tmdbDetails.budget)}
                </Box>
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightBold">
                    Revenue:
                </Box>
                    <Box fontSize="subtitle2.fontSize"
                     fontWeight="fontWeightLight">
                    {formatter.format(tmdbDetails.revenue)}
                </Box>
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightBold">
                    Released:
                </Box>
                    <Box fontSize="subtitle2.fontSize"
                     fontWeight="fontWeightLight">
                    {omdbDetails.Released}
                </Box>
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightBold">
                    DVD:
                </Box>
                    <Box fontSize="subtitle2.fontSize"
                     fontWeight="fontWeightLight">
                    {omdbDetails.DVD}
                </Box>
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightBold">
                    Production Companies:
                </Box>
                    <Box fontSize="subtitle2.fontSize"
                     fontWeight="fontWeightLight">
                    {tmdbDetails.production_companies.map(company => company.name).join(', ')}
                </Box>
                <Box fontSize="subtitle1.fontSize"
                     fontWeight="fontWeightBold">
                    Production Countries:
                </Box>
                    <Box fontSize="subtitle2.fontSize"
                     fontWeight="fontWeightLight">
                    {tmdbDetails.production_countries.map(country=>country.name).join(', ')}
                </Box>
            </Typography>
        </div>
    );
};

export default facts;