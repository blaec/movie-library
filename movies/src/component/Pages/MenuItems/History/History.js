import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchUploadHistory} from "../../../../store/upload-actions";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {isArrayExist} from "../../../../utils/Utils";

import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles
} from "@material-ui/core";


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
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
    root: {
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 650,
    },
}));

const history = () => {
    const {root, table} = useStyles();

    const uploadHistory = useSelector(state => state.upload.history);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUploadHistory());
    }, []);

    let historyTable = <MyLoader/>;
    if (isArrayExist(uploadHistory)) {
        historyTable = (
            <TableContainer className={root} component={Paper}>
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
                        {uploadHistory.map((movie) => {
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
                </Table>
            </TableContainer>
        );
    }

    return (
        <React.Fragment>
            <p>Upload history for the last 7 days:</p>
            {historyTable}
        </React.Fragment>
    );
};

export default history;