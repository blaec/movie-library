import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    movies: {collectionItems: [], isCollectionItemsLoaded: false},
    newMovies: {collectionItems: [], isCollectionItemsLoaded: false},
    wishlist: {collectionItems: [], isCollectionItemsLoaded: false},
    topRated: {collectionItems: [], isCollectionItemsLoaded: false},
    nowPlaying: {collectionItems: [], isCollectionItemsLoaded: false},
    anticipated: {collectionItems: [], isCollectionItemsLoaded: false},
    filteredMovies: {filteredMovies: [], isFilteredMoviesLoaded: false},
    library: [],
    postersEn: {postersEn: [], isPostersEnLoaded: false},
    postersRu: {postersRu: [], isPostersRuLoaded: false},
    posterResults: {posterResults: [], isPosterResultsLoaded: false},
    genreResults: {genreResults: [], isGenreResultsLoaded: false},
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        setMoviesCollection(state, action) {
            state.movies = {collectionItems: action.payload, isCollectionItemsLoaded: true};
        },
        setNewMoviesCollection(state, action) {
            state.newMovies = {collectionItems: action.payload, isCollectionItemsLoaded: true};
        },
        setWishlistCollection(state, action) {
            state.wishlist = {collectionItems: action.payload, isCollectionItemsLoaded: true};
        },
        setTopRated(state, action) {
            state.topRated = {collectionItems: action.payload, isCollectionItemsLoaded: true};
        },
        appendTopRated(state, action) {
            state.topRated = {
                collectionItems: [...state.topRated.collectionItems, ...action.payload],
                isCollectionItemsLoaded: true
            };
        },
        setNowPlaying(state, action) {
            state.nowPlaying = {collectionItems: action.payload, isCollectionItemsLoaded: true};
        },
        setAnticipated(state, action) {
            state.anticipated = {collectionItems: action.payload, isCollectionItemsLoaded: true};
        },
        setFilteredMovies(state, action) {
            state.filteredMovies = {filteredMovies: action.payload, isFilteredMoviesLoaded: true};
        },
        resetFilteredMovies(state) {
            state.filteredMovies = initialState.filteredMovies;
        },
        setLibrary(state, action) {
            state.library = action.payload;
        },
        setPostersEn(state, action) {
            state.postersEn = {postersEn: action.payload, isPostersEnLoaded: true};
        },
        setPostersRu(state, action) {
            state.postersRu = {postersRu: action.payload, isPostersRuLoaded: true};
        },
        setPosterResults(state, action) {
            state.posterResults = {posterResults: action.payload, isPosterResultsLoaded: true};
        },
        resetPosterResults(state, action) {
            state.posterResults = initialState.posterResults;
        },
        setGenreResults(state, action) {
            state.genreResults = {genreResults: action.payload, isGenreResultsLoaded: true};
        },
        resetGenreResults(state, action) {
            state.genreResults = initialState.genreResults;
        },
    }
});

export const collectionActions = collectionSlice.actions;
export default collectionSlice.reducer;