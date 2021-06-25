import React from "react";

import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {StyledTableCell, StyledTableRow} from "./StyledTableElements";
import {makeStyles} from "@material-ui/core/styles";

const headCells = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Title'
    },
    {
        id: 'type',
        numeric: true,
        disablePadding: false,
        label: 'Type'
    },
    {
        id: 'size',
        numeric: true,
        disablePadding: false,
        label: 'Size (Gb)'
    },
    {
        id: 'creationDate',
        numeric: true,
        disablePadding: false,
        label: 'Creation date'
    },
];

const useStyles = makeStyles((theme) => ({
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));


const enhancedTableHead = (props) => {
    const {order, orderBy, onRequestSort} = props;
    const {visuallyHidden} = useStyles();
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <StyledTableRow>
                {headCells.map((headCell) => {
                    const {id, numeric, disablePadding, label} = headCell;
                    return (
                        <StyledTableCell
                            key={id}
                            align={numeric ? 'right' : 'left'}
                            padding={disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === id ? order : false}
                        >
                            <TableSortLabel
                                style={{marginLeft: '16px'}}
                                active={orderBy === id}
                                direction={orderBy === id ? order : 'asc'}
                                onClick={createSortHandler(id)}
                            >
                                {label}
                                {
                                    orderBy === id
                                        ? (
                                            <span className={visuallyHidden}>
                                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        )
                                        : null
                                }
                            </TableSortLabel>
                        </StyledTableCell>
                    )
                })}
            </StyledTableRow>
        </TableHead>
    );
}

export default enhancedTableHead;