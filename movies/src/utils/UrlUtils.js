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
    settings: "/settings",
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

/**
 * https://www.omdbapi.com/
 *
 * @param imdbId imdb movie id
 * @param omdbApi omdb api key
 * @returns {`http://www.omdbapi.com/?i=<<imdbId>>&apikey=<<omdbApi>>`}
 */
export const getOmdbMovieDetails = (imdbId, omdbApi) => {
    const params = {i: imdbId, apikey: omdbApi};

    return `${url_endpoints.omdb.movie}?${getParamsFrom(params)}`;
};

/**
 * https://developers.themoviedb.org/3/movies/get-movie-details
 * https://developers.themoviedb.org/3/getting-started/append-to-response
 * https://developers.themoviedb.org/3/getting-started/image-languages
 *
 * @param id tmdb movie id
 * @param tmdbApi tmdb api key
 * @returns {`https://api.themoviedb.org/3/movie/{id}?api_key=<<tmdbApi>>&language=en-US&append_to_response=images&include_image_language=en,null`}
 */
export const getMovieDetailsUrl = (id, tmdbApi) => {
    const backdropParams = {
        ...api_lang_params(),
        append_to_response: 'images',
        include_image_language: `${language.get()},null`
    };
    const params = {...backdropParams, ...{api_key: tmdbApi}};

    return `${url_endpoints.tmdb.movies.getDetails}${id}?${getParamsFrom(params)}`;
};

/**
 * https://developers.themoviedb.org/3/movies/get-now-playing
 *
 * @param tmdbApi tmdb api key
 * @param showPage number of page to show
 * @returns {`https://api.themoviedb.org/3/movie/now_playing?api_key=<<tmdbApi>>&language=en-US&page=<<showPage>>`}
 */
export const getNowPlayingUrl = (tmdbApi, showPage = 1) => {
    const params = {...api_lang_params(), ...{api_key: tmdbApi, page: showPage}};

    return `${url_endpoints.tmdb.movies.getNowPlaying}?${getParamsFrom(params)}`;
};

/**
 * https://developers.themoviedb.org/3/discover/movie-discover
 *
 * @param tmdbApi tmdb api key
 * @param showPage number of page to show
 * @returns {`https://api.themoviedb.org/3/discover/movie?api_key=<<tmdbApi>>&page=<<showPage>>&release_date.gte=<<from date>>&release_date.lte=<<to date>>`}
 */
export const getAnticipatedUrl = (tmdbApi, showPage = 1) => {
    const params = {
        ...api_lang_params(),
        ...{
            api_key: tmdbApi,
            page: showPage,
            'release_date.gte': getFutureDate(0, 6),
            'release_date.lte': getFutureDate(2, 6)
        }
    };

    return `${url_endpoints.tmdb.movies.anticipated}?${getParamsFrom(params)}`;
};

/**
 * https://developers.themoviedb.org/3/movies/get-movie-credits
 *
 * @param id tmdb movie id
 * @param tmdbApi tmdb api key
 * @returns {`https://api.themoviedb.org/3/movie/{id}/credits?api_key=<<tmdbApi>>&language=en-US`}
 */
export const getMovieCreditsUrl = (id, tmdbApi) => {
    const params = {...api_lang_params(), ...{api_key: tmdbApi}};

    return `${url_endpoints.tmdb.movies.getDetails}${id}/credits?${getParamsFrom(params)}`;
};

/**
 * https://developers.themoviedb.org/3/search/search-movies
 *
 * @param props
 * @returns {`https://api.themoviedb.org/3/search/movie?language=en&query=<<movie_name>>&year=<<year>>&api_key=<<api_key>>`}
 */
export const getSearchMovieUrl = (props) => {
    const params = {...api_lang_params(), ...props};

    return `${url_endpoints.tmdb.search.getDetails}?${getParamsFrom(params)}`;
};

/**
 * https://developers.themoviedb.org/3/genres/get-movie-list
 *
 * @param tmdbApi tmdb api key
 * @returns {`https://api.themoviedb.org/3/genre/movie/list?api_key=<<tmdbApi>>&language=en-US`}
 */
export const getAllGenresUrl = (tmdbApi) => {
    const params = {...api_lang_params(), ...{api_key: tmdbApi}};

    return `${url_endpoints.tmdb.genres.getMovieList}?${getParamsFrom(params)}`;
};

/**
 * https://developers.themoviedb.org/3/people/get-person-details
 *
 * @param actorId actor id
 * @param tmdbApi tmdb api key
 * @returns {`https://api.themoviedb.org/3/person/<<actorId>>?api_key=<<tmdbApi>>&language=en-US&append_to_response=credits`}
 */
export const getActorDetailsUrl = (actorId, tmdbApi) => {
    const actorDetailsParams = {
        ...api_lang_params(),
        append_to_response: 'credits',
    };
    const params = {...actorDetailsParams, ...{api_key: tmdbApi}};

    return `${url_endpoints.tmdb.people.getDetails}${actorId}?${getParamsFrom(params)}`;
};

//

/**
 * https://developers.themoviedb.org/3/people/get-person-images
 *
 * @param actorId actor id
 * @param tmdbApi tmdb api key
 * @returns {`https://api.themoviedb.org/3/person/{actorId}/images?api_key=<<tmdbApi>>`}
 */
export const getActorImagesUrl = (actorId, tmdbApi) => {
    const params = {api_key: tmdbApi};

    return `${url_endpoints.tmdb.people.getDetails}${actorId}/images?${getParamsFrom(params)}`;
};

/**
 * https://developers.themoviedb.org/3/movies/get-movie-videos
 *
 * @param id movie tmdb id
 * @param tmdbApi tmdb api key
 * @returns {`https://api.themoviedb.org/3/movie/<<id>>/videos?api_key=<<tmdbApi>>&language=en-US`}
 */
export const getTrailersUrl = (id, tmdbApi) => {
    const params = {...api_lang_params(), ...{api_key: tmdbApi}};

    return `${url_endpoints.tmdb.movies.getDetails}${id}/videos?${getParamsFrom(params)}`;
}

/**
 * https://developers.themoviedb.org/3/getting-started/images
 *
 * @param path image path
 * @param posterSize poster size
 * @returns {`https://image.tmdb.org/t/p/<<posterSize>>/<<path>>`}
 */
export const getImageUrl = (path, posterSize = posterSizes.original) => {
    let size = Object.values(posterSizes).includes(posterSize)
        ? `${posterSize}`
        : `${posterSizes.original}`;

    return `${(url_endpoints.tmdb.gettingStarted.images)}${size}${path}`;
};

const getParamsFrom = (obj) => {
    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
};

/**
 * https://developers.themoviedb.org/3/configuration/get-api-configuration
 * https://api.themoviedb.org/3/configuration?api_key=<<api_key>>
 */
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
        movie: 'http://www.omdbapi.com/',
    },
};

const api_lang_params = () => {
    return {language: language.get()};
};
