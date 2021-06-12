import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchUploadHistory} from "../../../../store/upload-actions";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {isArrayExist} from "../../../../utils/Utils";
import TablePaginationActions from "./TablePaginationActions";

import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    withStyles
} from "@material-ui/core";


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.text.secondary,
        color: theme.palette.common.white,
        fontWeight: 700,
        fontSize: 15,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    caption: {
        padding: theme.spacing(3, 0, 1, 1),
    },
    table: {
        minWidth: 650,
    },
}));

const history = () => {
    const {caption, table} = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const uploadHistory = useSelector(state => state.upload.history);
    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(fetchUploadHistory());
    }, []);

    console.log(`${page * rowsPerPage} / ${page * rowsPerPage + rowsPerPage}`);
    let historyTable = <MyLoader/>;
    if (isArrayExist(uploadHistory)) {
        historyTable = (
            <TableContainer component={Paper}>
                <Table className={table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="left">Type</StyledTableCell>
                            <StyledTableCell align="left">Size&nbsp;(Gb)</StyledTableCell>
                            <StyledTableCell align="left">Creation date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uploadHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movie) => {
                            const {id, title, type, size, creationDate} = movie;
                            return (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align="left">{title}</StyledTableCell>
                                    <StyledTableCell align="left">{type}</StyledTableCell>
                                    <StyledTableCell align="right">{size}</StyledTableCell>
                                    <StyledTableCell align="right">{creationDate}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                colSpan={3}
                                count={uploadHistory.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
    }

    return (
        <React.Fragment>
            <Typography
                className={caption}
                variant='h6'
                color='primary'
            >
                Upload history for the last 7 days:
            </Typography>
            {historyTable}
        </React.Fragment>
    );
};

export default history;