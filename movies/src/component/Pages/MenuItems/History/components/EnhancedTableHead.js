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
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            style={{marginLeft:'16px'}}
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        </TableHead>
    );
}

export default enhancedTableHead;