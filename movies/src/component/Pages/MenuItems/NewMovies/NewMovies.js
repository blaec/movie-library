import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import useGallery from "../../../../hooks/use-gallery";
import {isArrayExist} from "../../../../utils/Utils";
import {collectionActions} from "../../../../store/state/collection/collection-slice";

const newMovies = () => {
    const movies = useSelector(state => state.collection.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isArrayExist(movies)) {
            const newMovies = movies.filter(movie => movie.location.includes("d_music"));
            dispatch(collectionActions.setNewMoviesCollection(newMovies));
        }
    }, [movies])

    return useGallery("newMovies");
};

export default newMovies;