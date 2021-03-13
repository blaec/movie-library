import React, {useEffect, useState} from 'react';
import axios from "../../../axios-movies";
import MyLoader from "../../../UI/Spinners/MyLoader";
import Details from "../Gallery/Details/Details";
import Movie from "../Gallery/Gallery/components/Movie/Movie";
import Pagination from "@material-ui/lab/Pagination";

const wishlist = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadedWishMovieList, setLoadedWishMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get('/movies/wishlist')
            .then(response => {
                setLoadedWishMovieList(response.data);
                console.log(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    let myGallery = <MyLoader/>;
    if (!isLoading) {
        // if (isViewingDetails) {
        //     myGallery = <Details closed={handleDetailsClose}
        //                          delete={handleDeleteMovie}
        //                          {...selectedMovie}/>;
        // } else {
            const lastMovieOnCurrentPage = currentPage * moviesPerPage;
            const moviesOnCurrentPage = loadedWishMovieList.slice(lastMovieOnCurrentPage - moviesPerPage, lastMovieOnCurrentPage);
            myGallery = (
                <React.Fragment>
                    <div className="Gallery">
                        {moviesOnCurrentPage.map(movie =>
                            <Movie key={movie.id}
                                   {...movie}
                                   // clicked={handleViewMovieDetails}
                            />
                        )}
                    </div>
                    <Pagination className="Pagination"
                                page={currentPage}
                                count={totalPages}
                                onChange={handlePageChange}
                                variant="outlined"
                                color="primary"/>
                </React.Fragment>
            );
        // }
    }

    return (
        <React.Fragment>
            {myGallery}
        </React.Fragment>
    );
};

export default wishlist;