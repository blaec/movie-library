import React from "react";

import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {StyledTableCell, StyledTableRow} from "./StyledTableElements";

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

const enhancedTableHead = (props) => {
    const {classes, order, orderBy, onRequestSort} = props;
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
                                            <span className={classes.visuallyHidden}>
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