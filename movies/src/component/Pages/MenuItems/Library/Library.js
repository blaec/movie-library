import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";

import {reactLinks} from "../../../../utils/UrlUtils";
import {getComparator, stableSort} from "../../../../utils/SortUtils";
import EnhancedTableHead from "./components/EnhancedTableHead";
import {StyledTableCell, StyledTableRow} from "./components/StyledTableElements";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";
import {fetchLibrary} from "../../../../store/state/collection/collection-actions";
import {fullTitle} from "../../../../utils/Utils";
import {tableDensePadding, tableRowsPerPage} from "../../../../store/localStorage/actions";

import {makeStyles} from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


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

const library = () => {
    const {root, paper, table, container, switchElement} = useStyles();
    const history = useHistory();
    const {t} = useTranslation('common');

    const library = useSelector(state => state.collection.library);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLibrary());
    }, []);

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('creationDate');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(tableDensePadding.get());
    const [rowsPerPage, setRowsPerPage] = React.useState(tableRowsPerPage.get() || 5);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        tableRowsPerPage.set(parseInt(event.target.value, 10));
        setRowsPerPage(tableRowsPerPage.get());
        setPage(0);
    };

    const handleChangeDense = (event) => {
        tableDensePadding.set(event.target.checked);
        setDense(tableDensePadding.get());
    };

    const handleDisplayMovie = (id, tmdbId) => {
        history.push(`${reactLinks.movieDetailsEndpoint}${tmdbId}`);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, library.length - page * rowsPerPage);
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
                            {stableSort(library, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, (1 + page) * rowsPerPage)
                                .map(row => {
                                    const {id, tmdbId, title, releaseDate, type, size, creationDate} = row;

                                    return (
                                        <StyledTableRow
                                            key={id}
                                            hover
                                            onClick={() => handleDisplayMovie(id, tmdbId)}
                                        >
                                            <StyledTableCell>{fullTitle(title, releaseDate)}</StyledTableCell>
                                            <StyledTableCell align="right">{type}</StyledTableCell>
                                            <StyledTableCell align="right">{(size || 0).toFixed(2)}</StyledTableCell>
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
                    count={library.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <FormControlLabel
                    control={denseSwitch}
                    label={t('text.densePadding')}
                />
            </Paper>
        </div>
    );
}

export default library;