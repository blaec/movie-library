import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


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
