import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

const styledTableCell = withStyles((theme) => ({
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

export default styledTableCell;