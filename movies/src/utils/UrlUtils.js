import {getFutureDate} from "./Utils";
import {language} from "../store/localStorage/actions";

export const reactLinks = {
    home: "/movies/collection",
    collection: "/movies/collection",
    newMovies: "/movies/new-movies",
    wishlist: "/movies/wishlist",
    filter: "/filter",
    filterByGenreEndpoint: "/movies/by-genre/",
    filterByGenre: "/movies/by-genre/:genreIds",
    upload: "/upload",
    movieDetailsEndpoint: "/movies/",
    movieDetails: "/movies/:movieTmdbId",
    actorDetailsEndpoint: "/actors/",
    actorDetails: "/actors/:actorId",
    nowPlaying: "/info/now-playing",
    anticipated: "/info/anticipated",
    library: "/stats/library",
};

export const isSearchable = (pathname) => {
    const {collection, wishlist, filterByGenreEndpoint, newMovies, nowPlaying, anticipated} = reactLinks;
    const searchable = [collection, wishlist, filterByGenreEndpoint, newMovies, nowPlaying, anticipated];
    return searchable.filter(url => pathname.startsWith(url)).length === 1;
};

let baseMovieApi = "/movies/";
export const movieApi = {
    get: {
        getAllMovies: `${baseMovieApi}gallery`,
        getAllWishMovies: `${baseMovieApi}wishlist`,
        getAllByGenres: `${baseMovieApi}filter`,
        getAll: `${baseMovieApi}library`,
    },
    post: {
        saveWishMovie: `${baseMovieApi}upload/wish`,
        uploadMovie: `${baseMovieApi}upload/file`,
        scanFolder: `${baseMovieApi}upload/`,
    },
    delete: {
        delete: `${baseMovieApi}delete/`,
    },
};

export const configApi = {
    get: {
        getConfigs: "/configs"
    }
}

export const getDeleteUrl = (tmdbId) => {
    return `${movieApi.delete.delete}${tmdbId}`;
};

export const getScanFolderUrl = (fileLocation) => {
    return `${movieApi.post.scanFolder}${fileLocation}`;
};

export const getMovieDetailsUrl = (id, tmdbApi) => {
    const params = {...backdrop_params, ...{api_key: tmdbApi}};
    // console.log(`getMovieDetailsUrl: ${url_endpoints.tmdb.movies.getDetails}${id}?${getParamsFrom(params)}`);
    return `${url_endpoints.tmdb.movies.getDetails}${id}?${getParamsFrom(params)}`;
};

// https://developers.themoviedb.org/3/movies/get-now-playing
// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
export const getNowPlayingUrl = (tmdbApi, showPage = 1) => {
    const params = {...api_lang_params, ...{api_key: tmdbApi, page: showPage}};
    return `${url_endpoints.tmdb.movies.getNowPlaying}?${getParamsFrom(params)}`;
};

// https://developers.themoviedb.org/3/discover/movie-discover
// https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
export const getAnticipatedUrl = (tmdbApi, showPage = 1) => {
    const params = {
        ...api_lang_params,
        ...{
            api_key: tmdbApi,
            page: showPage,
            'release_date.gte': getFutureDate(0, 6),
            'release_date.lte': getFutureDate(2, 6)
        }
    };
    return `${url_endpoints.tmdb.movies.anticipated}?${getParamsFrom(params)}`;
};

export const getOmdbMovieDetails = (imdbId, omdbApi) => {
    // console.log(`getOmdbMovieDetails: ${url_endpoints.omdb.movie}${imdbId}&apikey=${omdbApi}`);
    return `${url_endpoints.omdb.movie}${imdbId}&apikey=${omdbApi}`;
};

// https://developers.themoviedb.org/3/movies/get-movie-credits
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
export const getMovieCreditsUrl = (id, tmdbApi) => {
    const params = {...api_lang_params, ...{api_key: tmdbApi}};
    return `${url_endpoints.tmdb.movies.getDetails}${id}/credits?${getParamsFrom(params)}`;
};

export const getImageUrl = (path, posterSize = posterSizes.original) => {
    let size = Object.values(posterSizes).includes(posterSize)
        ? `${posterSize}`
        : `${posterSizes.original}`;
    return `${(url_endpoints.tmdb.gettingStarted.images)}${size}${path}`;
};

export const getSearchMovieUrl = (props) => {
    const params = {...caption_year_params, ...props};
    // console.log(`getSearchMovieUrl: ${url_endpoints.tmdb.search.getDetails}?${getParamsFrom(params)}`);
    return `${url_endpoints.tmdb.search.getDetails}?${getParamsFrom(params)}`;
};

export const getAllGenresUrl = (tmdbApi) => {
    const params = {...api_lang_params, ...{api_key: tmdbApi}};
    // console.log(`getAllGenresUrl: ${url_endpoints.tmdb.genres.getMovieList}?${getParamsFrom(params)}`);
    return `${url_endpoints.tmdb.genres.getMovieList}?${getParamsFrom(params)}`;
};

// https://api.themoviedb.org/3/person/<<actorId>>?api_key=<<api_key>>&append_to_response=credits
export const getActorDetailsUrl = (actorId, tmdbApi) => {
    const params = {...actor_details_params, ...{api_key: tmdbApi}};
    // console.log(`getActorDetailsUrl: ${url_endpoints.tmdb.people.getDetails}${actorId}?${getParamsFrom(params)}`);
    return `${url_endpoints.tmdb.people.getDetails}${actorId}?${getParamsFrom(params)}`;
};

// https://api.themoviedb.org/3/person/{person_id}/images?api_key=<<api_key>>
export const getActorImagesUrl = (actorId, tmdbApi) => {
    const params = {...actor_details_params, ...{api_key: tmdbApi}};
    // console.log(`getActorImagesUrl: ${url_endpoints.tmdb.people.getDetails}${actorId}/images?${getParamsFrom(params)}`);
    return `${url_endpoints.tmdb.people.getDetails}${actorId}/images?${getParamsFrom(params)}`;
};

export const getTrailersUrl = (tmdbId, tmdbApi) => {
    // console.log(`getTrailersUrl: https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${tmdbApi}`);
    return `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${tmdbApi}`;
}

const getParamsFrom = (obj) => {
    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
};

const settings = {
    language: language.get(),
    append_to_response: 'images',
    include_image_language: `${language.get()},null`
};

// https://api.themoviedb.org/3/configuration?api_key=
export const posterSizes = Object.freeze({
    w92: "w92",
    w154: "w154",
    w185: "w185",
    w342: "w342",
    w500: "w500",
    w780: "w780",
    original: "original",
});
const url_endpoints = {
    // used original tmdb-api menu structure
    tmdb: {
        gettingStarted: {
            images: 'http://image.tmdb.org/t/p/',
        },
        movies: {
            getDetails: 'https://api.themoviedb.org/3/movie/',
            getNowPlaying: 'https://api.themoviedb.org/3/movie/now_playing',
            anticipated: 'https://api.themoviedb.org/3/discover/movie',
        },
        search: {
            getDetails: 'https://api.themoviedb.org/3/search/movie',
        },
        genres: {
            getMovieList: 'https://api.themoviedb.org/3/genre/movie/list',
        },
        people: {
            getDetails: 'https://api.themoviedb.org/3/person/',
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
    language: language.get(),
};

const actor_details_params = {
    append_to_response: 'credits',
    language: settings.language
};

