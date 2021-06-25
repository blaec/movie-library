import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {fetchUploadHistory} from "../../../../store/upload-actions";
import {reactLinks} from "../../../../utils/UrlUtils";
import {getComparator, stableSort} from "../../../../utils/SortUtils";
import EnhancedTableHead from "./components/EnhancedTableHead";
import {StyledTableCell, StyledTableRow} from "./components/StyledTableElements";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";

import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
        width: '100%',
    },
    paper: {
        margin: theme.spacing(0, 2, 2, 2),
    },
    container: {
        maxHeight: 470,
    },
    table: {
        minWidth: 750,
    },
    switchElement: {
        marginLeft: theme.spacing(2),
    }
}));

const history = () => {
    const {root, paper, table, container, switchElement} = useStyles();

    const uploadHistory = useSelector(state => state.collection.movies);
    // const uploadHistory = useSelector(state => state.upload.history);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUploadHistory());
    }, []);

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('creationDate');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, uploadHistory.length - page * rowsPerPage);
    const denseSwitch = (
        <Switch
            className={switchElement}
            checked={dense}
            onChange={handleChangeDense}
        />
    );

    return (
        <div className={root}>
            <Paper className={paper}>
                <EnhancedTableToolbar/>
                <TableContainer className={container}>
                    <Table
                        className={table}
                        stickyHeader
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(uploadHistory, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, (1 + page) * rowsPerPage)
                                .map((row, index) => {
                                    const {id, tmdbId, title, type, size, creationDate} = row;

                                    return (
                                        <StyledTableRow
                                            key={id}
                                            hover
                                            component={NavLink} to={`${reactLinks.movieDetailsEndpoint}${tmdbId}`}
                                        >
                                            <StyledTableCell>{title}</StyledTableCell>
                                            <StyledTableCell align="right">{type}</StyledTableCell>
                                            <StyledTableCell align="right">{size}</StyledTableCell>
                                            <StyledTableCell align="right">{creationDate}</StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                    <StyledTableCell colSpan={4}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={uploadHistory.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <FormControlLabel
                    control={denseSwitch}
                    label="Dense padding"
                />
            </Paper>
        </div>
    );
}

export default history;