import {withStyles} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";

const styledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        },
    },
}))(TableRow);

export default styledTableRow;