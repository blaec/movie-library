export const reactLinks = {
    home: "/",
    filtered: "/filtered",
    wishlist: "/wishlist",
    filter: "/filter",
    upload: "/upload",
};

export const movieApi = {
    get: {
        getAllMovies: "/movies/gallery",
        getAllWishMovies: "/movies/wishlist",
        getAllByGenres: "/movies/filter",
    },
    post: {
        saveWishMovie: "/movies/wish",
        uploadMovie: "/movies/file",
        scanFolder: "/movies/",
    },
    delete: {
        delete: "/movies/",
    },
};

export const configApi = {
    get: {
        getConfigs: "/configs"
    }
}

export const getMovieDetailsUrl = (id, tmdbApi) => {
    const params = {...backdrop_params, ...{api_key: tmdbApi}};
    return `${url_endpoints.movie}${id}?${getParamsFrom(params)}`
};

export const getOmdbMovieDetails = (imdbId, omdbApi) => {
    return `${url_endpoints.omdb_movie}${imdbId}&apikey=${omdbApi}`
};

export const getMovieCreditsUrl = (id, tmdbApi) => {
    const params = {...api_lang_params, ...{api_key: tmdbApi}};
    return `${url_endpoints.movie}${id}/credits?${getParamsFrom(params)}`
};

export const getImageUrl = (path) => {
    return url_endpoints.image + path
};

export const getSearchMovieUrl = (props) => {
    const params = {...caption_year_params, ...props};
    return `${url_endpoints.searchByNameAndYear}?${getParamsFrom(params)}`
};

export const getAllGenresUrl = (tmdbApi) => {
    const params = {...api_lang_params, ...{api_key: tmdbApi}};
    return `${url_endpoints.genres}?${getParamsFrom(params)}`
};

export const getDeleteUrl = (id) => {
    return `${movieApi.delete.delete}${id}`
};

export const getScanFolderUrl = (fileLocation) => {
    return `${movieApi.post.scanFolder}${fileLocation}`
};

const getParamsFrom = (obj) => {
    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
};

const settings = {
    tmdb: {
        language: 'ru-RU',
        append_to_response: 'images',
        include_image_language: 'ru-RU,null'
    }
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
// TODO sort by tmdb and omdb
const url_endpoints = {
    image: 'http://image.tmdb.org/t/p/original',
    movie: 'https://api.themoviedb.org/3/movie/',
    searchByNameAndYear: 'https://api.themoviedb.org/3/search/movie',
    omdb_movie: 'http://www.omdbapi.com/?i=',
    genres: 'https://api.themoviedb.org/3/genre/movie/list'
};

const backdrop_params = {
    language: settings.tmdb.language,
    append_to_response: settings.tmdb.append_to_response,
    include_image_language: settings.tmdb.include_image_language
};

// https://api.themoviedb.org/3/movie/9487/credits?api_key=<<key>>&language=en-US
const api_lang_params = {
    language: settings.tmdb.language
};

const caption_year_params = {
    language: 'en-EN'
};


