import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import {getActorDetailsUrl} from "../../../utils/UrlUtils";
import {useSelector} from "react-redux";
import ActorMovie from "./ActorMovie";
import {Box, List, ListItem, makeStyles} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import '../Gallery/Gallery.css';
import '../Details/Details.css';

const useStyles = makeStyles((theme) => ({
    actor: {
        paddingLeft: theme.spacing(7),
    }
}));

const actorDetails = (props) => {
    const {id, onClose} = props;
    const classes = useStyles();

    const configs = useSelector(state => state.api);
    const [actorMovies, setActorMovies] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(getActorDetailsUrl(id, configs.tmdbApi))
            .then(response => {
                setActorMovies(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    let allMovies = null;
    if (!isLoading) {
        allMovies =
            <React.Fragment>
                <ArrowBackIcon onClick={onClose}
                               className="ImageBack"
                               fontSize="large"/>
                <Box className={classes.actor}
                     fontSize="h5.fontSize"
                     fontWeight="fontWeightBold">
                    {actorMovies.name}
                </Box>
                {actorMovies.credits.cast
                    .filter(movie => movie.release_date !== undefined && movie.release_date !== "")
                    .sort((a, b) => (new Date(a.release_date) < new Date(b.release_date) ? 1 : -1))
                    .map(movie => <ActorMovie key={movie.id} {...movie}/>)}
            </React.Fragment>
    }

    return (
        <div className="Details">
            <List>
                {allMovies}
            </List>
        </div>
    );
};

export default actorDetails;