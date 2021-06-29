import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector} from "react-redux";
import {isArrayExist} from "../../../../utils/Utils";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const createData = (name, data, loc) => {
    let moviesByLocation = data.filter(movie => movie.location.includes(loc));
    let count = moviesByLocation.length.toFixed(0).toLocaleString();
    let size = moviesByLocation.reduce(((sum, movie) => sum + movie.size), 0);
    return { name, count, size };
}


const stats = () => {
    const classes = useStyles();
    const movies = useSelector(state => state.collection.movies);
    let rows = [];

    if (isArrayExist(movies)) {
        rows = [
            createData('K | Cartoons', movies, 'k_cartoons'),
            createData('L | Movies', movies, 'l_movies'),
            createData('M | Serial Movies', movies, 'm_serial_movies'),
            createData('D | New Movies', movies, 'd_music'),
            createData('C | Videos', movies, 'c_videos'),
        ];
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell align="right">Count</TableCell>
                        <TableCell align="right">Size&nbsp;(Gb)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.count}</TableCell>
                            <TableCell align="right">{row.size}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};


export default stats;
