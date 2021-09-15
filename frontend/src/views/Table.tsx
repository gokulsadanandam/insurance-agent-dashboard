import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    textAlign: 'center'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props: { rows : object[] }) {
  const classes = useStyles();
  const {rows} = props;

  return rows.length > 0 ?  (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
             <StyledTableCell> policy_id </StyledTableCell>
            <StyledTableCell> date_of_purchase </StyledTableCell>
            <StyledTableCell> customer_id </StyledTableCell>
            <StyledTableCell> fuel </StyledTableCell>
            <StyledTableCell> vehicle_segment </StyledTableCell>
            <StyledTableCell> premium </StyledTableCell>
            {/* <StyledTableCell> bodily_injury_liability </StyledTableCell>
            <StyledTableCell> personal_injury_protection </StyledTableCell>
            <StyledTableCell> property_damage_liability </StyledTableCell>
            <StyledTableCell> collision </StyledTableCell>
            <StyledTableCell> comprehensive </StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.policy_id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.date_of_purchase}</StyledTableCell>
              <StyledTableCell align="right">{row.customer_id}</StyledTableCell>
              <StyledTableCell align="right">{row.fuel}</StyledTableCell>
              <StyledTableCell align="right">{row.vehicel_segment && 'True' || 'False' }</StyledTableCell>
              <StyledTableCell align="right">{row.premium}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.bodily_injury_liability&& 'True' || 'False'}</StyledTableCell>
              <StyledTableCell align="right">{row.personal_injury_protection&& 'True' || 'False'}</StyledTableCell>
              <StyledTableCell align="right">{row.property_damage_liability&& 'True' || 'False'}</StyledTableCell>
              <StyledTableCell align="right">{row.collision && 'True' || 'False'}</StyledTableCell>
              <StyledTableCell align="right">{row.comprehensive&& 'True' || 'False'}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ): null;
}
