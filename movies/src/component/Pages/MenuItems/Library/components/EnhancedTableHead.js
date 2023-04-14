import React from "react";
import {useTranslation} from "react-i18next";

import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import {StyledTableCell, StyledTableRow} from "./StyledTableElements";

const headCells = [
    {
        id: 'title',
        numeric: false,
        label: 'text.title'
    },
    {
        id: 'type',
        numeric: true,
        label: 'text.type'
    },
    {
        id: 'size',
        numeric: true,
        label: 'text.size'
    },
    {
        id: 'creationDate',
        numeric: true,
        label: 'text.creationDate'
    },
];


const enhancedTableHead = (props) => {
    const {order, orderBy, onRequestSort} = props;
    const {t} = useTranslation('common');

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
                                {t(label)}
                            </TableSortLabel>
                        </StyledTableCell>
                    )
                })}
            </StyledTableRow>
        </TableHead>
    );
};

export default enhancedTableHead;