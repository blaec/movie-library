import React, {useState} from 'react';
import Card from "../Card/Card";
import "./Body.css";

const body = () => {
    const [movieList, setMovieList] = useState([]);

    // TODO sends unlimited requests
    fetch("http://localhost:8080/movies", {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).then(responseData => {
        setMovieList(responseData);
    }).catch(error => {
        console.log("error");
    });

    return (
        <div className="Body">
            {movieList.map(m => <Card key={m.id} {...m}/>
            )}
        </div>
    );
};

export default body;