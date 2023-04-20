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
                console.error(error);
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
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load wishlist`,
                    type: 'error'
                }));
            });
    };
};

export const fetchFilteredCollection = (url, genreIds) => {
    return async (dispatch) => {
        axios.get(`${url}?genre-ids=${genreIds.split(",")}`)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setFilteredMovies(data));
            })
            .catch(error => {
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to load filtered movie list`,
                    type: 'error'
                }));
            });
    };
};

export const fetchDualFilteredCollection = (url, inclGenreIds, exclGenreIds) => {
    return async (dispatch) => {
        axios.get(`${url}?include-genre-ids=${inclGenreIds.split(",")}&exclude-genre-ids=${exclGenreIds.split(",")}`)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setFilteredMovies(data));
            })
            .catch(error => {
                console.error(error);
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
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to deleted movie with tmdbId '${tmdbId}'`,
                    type: 'error'
                }));
            });
    };
};

export const fetchTopRated = (tmdbApi) => {
    return async (dispatch) => {
        fetchByPage(dispatch, getTopRatedUrl(tmdbApi), "setTopRated", "Failed getting top rated movies");
    }
};

export const appendTopRated = (tmdbApi, page) => {
    return async (dispatch) => {
        fetchByPage(dispatch, getTopRatedUrl(tmdbApi, page), "appendTopRated", "Failed getting top rated movies");
    }
};

export const fetchNowPlaying = (tmdbApi) => {
    return async (dispatch) => {
        fetchByPage(dispatch, getNowPlayingUrl(tmdbApi), "setNowPlaying", "Failed getting now playing movies");
    }
};

export const fetchAnticipated = (tmdbApi) => {
    return async (dispatch) => {
        fetchByPage(dispatch, getAnticipatedUrl(tmdbApi), "setAnticipated", "Failed getting anticipated movies");
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
            console.error(error);
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
                console.error(error);
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
                console.error(error);
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
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to update posters to movie with id #${movie.id}`,
                    type: 'error'
                }));
            });
    };
};

export const updateMovieGenres = (movie) => {
    return async (dispatch) => {
        axios.put(movieApi.put.updateGenres, movie)
            .then(response => {
                const {data} = response;
                dispatch(collectionActions.setGenreResults(data));
                dispatch(fetchMovies());
                dispatch(fetchWishlist());
            })
            .catch(error => {
                console.error(error);
                dispatch(feedbackActions.setSnackbar({
                    message: `${error} | Failed to update genres to movie with id #${movie.id}`,
                    type: 'error'
                }));
            });
    };
};