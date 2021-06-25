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
        padding: theme.spacing(0, 2, 2, 2),
    },
    container: {
        maxHeight: 470,
    },
    table: {
        minWidth: 750,
    },
}));

const history = () => {
    const {root, paper, table, container} = useStyles();

    const uploadHistory = useSelector(state => state.collection.movies);
    // const uploadHistory = useSelector(state => state.upload.history);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUploadHistory());
    }, []);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('creationDate');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
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

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, uploadHistory.length - page * rowsPerPage);

    return (
        <div className={root}>
            <Paper className={paper}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <TableContainer className={container}>
                    <Table
                        className={table}
                        stickyHeader
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(uploadHistory, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <StyledTableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            style={{textDecoration:'none'}}
                                            component={NavLink} to={`${reactLinks.movieDetailsEndpoint}${row.tmdbId}`}
                                        >
                                            <StyledTableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.title}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.type}</StyledTableCell>
                                            <StyledTableCell align="right">{row.size}</StyledTableCell>
                                            <StyledTableCell align="right">{row.creationDate}</StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                    <StyledTableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={uploadHistory.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="Dense padding"
                />
            </Paper>
        </div>
    );
}

export default history;