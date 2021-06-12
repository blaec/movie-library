import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchUploadHistory} from "../../../../store/upload-actions";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {isArrayExist} from "../../../../utils/Utils";

import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const history = () => {
    const {table} = useStyles();

    const uploadHistory = useSelector(state => state.upload.history);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUploadHistory());
    }, []);

    let historyTable = <MyLoader/>;
    if (isArrayExist(uploadHistory)) {
        historyTable = (
            <TableContainer component={Paper}>
                <Table className={table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="left">Size&nbsp;(Gb)</TableCell>
                            <TableCell align="left">Creation date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uploadHistory.map((movie) => {
                            const {id, title, type, size, creationDate} = movie;
                            return (
                                <TableRow key={id}>
                                    <TableCell align="left">{title}</TableCell>
                                    <TableCell align="left">{type}</TableCell>
                                    <TableCell align="right">{size}</TableCell>
                                    <TableCell align="right">{creationDate}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <React.Fragment>
            {historyTable}
        </React.Fragment>
    );
};

export default history;