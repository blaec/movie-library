import React from "react";

import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {StyledTableCell, StyledTableRow} from "./StyledTableElements";

const headCells = [
    {
        id: 'title',
        numeric: false,
        label: 'Title'
    },
    {
        id: 'type',
        numeric: true,
        label: 'Type'
    },
    {
        id: 'size',
        numeric: true,
        label: 'Size (Gb)'
    },
    {
        id: 'creationDate',
        numeric: true,
        label: 'Creation date'
    },
];


const enhancedTableHead = (props) => {
    const {order, orderBy, onRequestSort} = props;

    return (
        <TableHead>
            <StyledTableRow>
                {headCells.map((headCell) => {
                    const {id, numeric, label} = headCell;
                    const isSorted = orderBy === id;
                    return (
                        <StyledTableCell
                            key={id}
                            align={numeric ? 'right' : 'left'}
                            sortDirection={isSorted ? order : false}
                        >
                            <TableSortLabel
                                active={isSorted}
                                direction={isSorted ? order : 'asc'}
                                onClick={() => onRequestSort(id)}
                            >
                                {label}
                            </TableSortLabel>
                        </StyledTableCell>
                    )
                })}
            </StyledTableRow>
        </TableHead>
    );
};

export default enhancedTableHead;