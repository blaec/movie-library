import {withStyles} from "@mui/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";


export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {},
        cursor: 'pointer',
    },
}))(TableRow);

export const StyledTableCell = withStyles((theme) => ({
    head: {
        fontWeight: 700,
        fontSize: 15,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
