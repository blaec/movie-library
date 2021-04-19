export const reactLinks = {
    home: "/",
    filtered: "/filtered",
    wishlist: "/wishlist",
    filter: "/filter",
    upload: "/upload",
};

let baseMovieApi = "/movies/";
export const movieApi = {
    get: {
        getAllMovies: `${baseMovieApi}gallery`,
        getAllWishMovies: `${baseMovieApi}wishlist`,
        getAllByGenres: `${baseMovieApi}filter`,
    },
    post: {
        saveWishMovie: `${baseMovieApi}wish`,
        uploadMovie: `${baseMovieApi}file`,
        scanFolder: baseMovieApi,
    },
    delete: {
        delete: baseMovieApi,
    },
};

export const configApi = {
    get: {
        getConfigs: "/configs"
    }
}

export const getMovieDetailsUrl = (id, tmdbApi) => {
    const params = {...backdrop_params, ...{api_key: tmdbApi}};
    return `${url_endpoints.tmdb.movies.getDetails}${id}?${getParamsFrom(params)}`
};

export const getOmdbMovieDetails = (imdbId, omdbApi) => {
    return `${url_endpoints.omdb.movie}${imdbId}&apikey=${omdbApi}`
};

export const getMovieCreditsUrl = (id, tmdbApi) => {
    const params = {...api_lang_params, ...{api_key: tmdbApi}};
    return `${url_endpoints.tmdb.movies.getDetails}${id}/credits?${getParamsFrom(params)}`
};

export const getImageUrl = (path) => {
    return `${url_endpoints.tmdb.gettingStarted.images}${path}`
};

export const getSearchMovieUrl = (props) => {
    const params = {...caption_year_params, ...props};
    return `${url_endpoints.tmdb.search.getDetails}?${getParamsFrom(params)}`
};

export const getAllGenresUrl = (tmdbApi) => {
    const params = {...api_lang_params, ...{api_key: tmdbApi}};
    return `${url_endpoints.tmdb.genres.getMovieList}?${getParamsFrom(params)}`
};

export const getDeleteUrl = (id) => {
    return `${movieApi.delete.delete}${id}`
};

export const getScanFolderUrl = (fileLocation) => {
    return `${movieApi.post.scanFolder}${fileLocation}`
};

// https://api.themoviedb.org/3/person/<<actorId>>?api_key=<<api_key>>&append_to_response=credits
export const getActorDetailsUrl = (actorId, tmdbApi) => {
    const params = {...actor_details_params, ...{api_key: tmdbApi}};
    return `${url_endpoints.tmdb.people.getDetails}${actorId}?${getParamsFrom(params)}`
};

const getParamsFrom = (obj) => {
    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
};

const settings = {
    language: 'ru-RU',
    append_to_response: 'images',
    include_image_language: 'ru-RU,null'
};

// https://api.themoviedb.org/3/configuration?api_key=
// "poster_sizes": [
//     "w92",
//     "w154",
//     "w185",
//     "w342",
//     "w500",
//     "w780",
//     "original"
// ]
const url_endpoints = {
    // used original tmdb-api menu structure
    tmdb: {
        gettingStarted: {
            images: 'http://image.tmdb.org/t/p/original'
        },
        movies: {
            getDetails: 'https://api.themoviedb.org/3/movie/',
        },
        search: {
            getDetails: 'https://api.themoviedb.org/3/search/movie'
        },
        genres: {
            getMovieList: 'https://api.themoviedb.org/3/genre/movie/list'
        },
        people: {
            getDetails: 'https://api.themoviedb.org/3/person/'
        },
    },
    omdb: {
        movie: 'http://www.omdbapi.com/?i=',
    },
};

const backdrop_params = {
    language: settings.language,
    append_to_response: settings.append_to_response,
    include_image_language: settings.include_image_language
};

// https://api.themoviedb.org/3/movie/9487/credits?api_key=<<key>>&language=en-US
const api_lang_params = {
    language: settings.language
};

const caption_year_params = {
    language: 'en-EN'
};

const actor_details_params = {
    append_to_response: 'credits'
};

