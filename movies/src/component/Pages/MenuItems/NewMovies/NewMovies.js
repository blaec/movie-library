import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import useGallery from "../../../../hooks/use-gallery";
import {collectionActions} from "../../../../store/state/collection/collection-slice";

const newMovies = () => {
    const {
        collectionItems: movies,
        isCollectionItemsLoaded: isMoviesLoaded
    } = useSelector(state => state.collection.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isMoviesLoaded) {
            const newMovies = movies.filter(movie => movie.location.includes("d_music"));
            dispatch(collectionActions.setNewMoviesCollection(newMovies));
        }
    }, [movies])

    return useGallery("newMovies");
};

export default newMovies;