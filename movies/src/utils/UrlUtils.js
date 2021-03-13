export const reactLinks = {
    home: "/",
    wishlist: "/wishlist",
    upload: "/upload"
};

export const getMovieDetailsUrl = (id) => {
    return `${url_endpoints.movie}${id}?${getParamsFrom(backdrop_params)}`
};

export const getImageUrl = (path) => {
    return url_endpoints.image + path
};

export const getSearchMovieUrl = (props) => {
    const params = {...caption_year_params, ...props};
    return `${url_endpoints.searchByNameAndYear}?${getParamsFrom(params)}`
};

const getParamsFrom = (obj) => {
    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
};

const settings = {
    api_key: 'd6c79c6e7c9d5f56185d9318481769bc',
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
    image: 'http://image.tmdb.org/t/p/original',
    movie: 'https://api.themoviedb.org/3/movie/',
    searchByNameAndYear: 'https://api.themoviedb.org/3/search/movie'
};

const backdrop_params = {
    api_key: settings.api_key,
    language: settings.language,
    append_to_response: settings.append_to_response,
    include_image_language: settings.include_image_language
};

// https://api.themoviedb.org/3/movie/9487/credits?api_key=<<key>>&language=en-US
const credits_params = {
    api_key: settings.api_key,
    language: settings.language
};

const caption_year_params = {
    api_key: settings.api_key,
    language: 'en-EN'
};


