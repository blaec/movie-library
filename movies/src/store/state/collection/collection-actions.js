import axios from "../../../axios-movies";
import {
    getDeleteUrl,
    getNowPlayingUrl,
    getAnticipatedUrl,
    movieApi,
    getMoviePostersUrl,
    getTopRatedUrl
} from "../../../utils/UrlUtils";
import {collectionActions} from "./collection-slice";
import {feedbackActions} from "../feedback/feedback-slice";
import {settingsActions} from "../settings/settings-slice";
import {Language} from "../../../utils/Constants";

export const fetchMovies = () => {
    return async (dispatch) => {
        axios.get(movieApi.get.getAllMovies)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setMoviesCollection(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load movies`,
                    type: 'error'
                }));
            });
    };
};

export const fetchWishlist = () => {
    return async (dispatch) => {
        axios.get(movieApi.get.getAllWishMovies)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setWishlistCollection(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load wishlist`,
                    type: 'error'
                }));
            });
    };
};

export const fetchFilteredCollection = (genreIds) => {
    return async (dispatch) => {
        axios.get(`${movieApi.get.getAllByGenres}?genre-ids=${genreIds.split(",")}`)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setFilteredMovies(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load filtered movie list`,
                    type: 'error'
                }));
            });
    };
};

export const deleteMovie = (tmdbId) => {
    return async (dispatch) => {
        axios.delete(getDeleteUrl(tmdbId))
            .then(response => {
                const {data} = response;
                dispatch(settingsActions.setResult(data));
                dispatch(fetchMovies());
                dispatch(fetchWishlist());
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to deleted movie with tmdbId '${tmdbId}'`,
                    type: 'error'
                }));
            });
    };
};

export const fetchTopRated = (tmdbApi, page) => {
    return async (dispatch) => {
        fetchByPage(dispatch, getTopRatedUrl(tmdbApi, page), "setTopRated", "Failed getting top rated movies");
    }
};

export const fetchNowPlaying = (tmdbApi, page) => {
    return async (dispatch) => {
        fetchByPage(dispatch, getNowPlayingUrl(tmdbApi, page), "setNowPlaying", "Failed getting now playing movies");
    }
};

export const fetchAnticipated = (tmdbApi, page) => {
    return async (dispatch) => {
        fetchByPage(dispatch, getAnticipatedUrl(tmdbApi, page), "setAnticipated", "Failed getting anticipated movies");
    }
};

const fetchByPage = (dispatch, url, fetchType, errMessage) => {
    axios.get(url)
        .then(response => {
            const {data: {results}} = response;
            const movies = results.map(movie => {
                const {id, poster_path, title, release_date} = movie;
                return {
                    id: id + new Date().getTime(),
                    tmdbId: id,
                    posterPath: poster_path,
                    title,
                    releaseDate: release_date
                };
            });
            dispatch(collectionActions[fetchType](movies));
        })
        .catch(error => {
            console.log(error);
            dispatch(feedbackActions.setSnackbar({
                message: `${error} | ${errMessage}`,
                type: 'error'
            }));
        });
};

export const fetchLibrary = () => {
    return async (dispatch) => {
        axios.get(movieApi.get.getAll)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setLibrary(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load entire library`,
                    type: 'error'
                }));
            });
    };
};

export const fetchPostersByLanguage = (id, tmdbApi, language) => {
    return async (dispatch) => {
        axios.get(getMoviePostersUrl(id, tmdbApi, language))
            .then(response => {
                const {data: {posters}} = response;
                switch (language) {
                    case Language.english:
                        dispatch(collectionActions.setPostersEn(posters));
                        break;
                    case Language.russian:
                        dispatch(collectionActions.setPostersRu(posters));
                        break;
                    default:
                        throw new Error(`not implemented language ${language}`);
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load posters to movie ${id}`,
                    type: 'error'
                }));
            });
    };
};

export const updateMoviePosters = (movie) => {
    return async (dispatch) => {
        axios.put(movieApi.put.updatePosters, movie)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setPosterResults(data));
                dispatch(fetchMovies());
                dispatch(fetchWishlist());
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to update posters to movie with id #${movie.id}`,
                    type: 'error'
                }));
            });
    };
};