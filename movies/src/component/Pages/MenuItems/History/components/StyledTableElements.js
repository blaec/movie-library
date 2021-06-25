import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export const StyledTableCell = withStyles((theme) => ({
    head: {
        // backgroundColor: theme.palette.common.black,
        // color: theme.palette.common.white,
        fontWeight: 700,
        fontSize: 15,
    },
    body: {
        fontSize: 14,
        paddingLeft: theme.spacing(2),
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        },
    },
}))(TableRow);