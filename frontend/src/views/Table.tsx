import React from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useStoreContext } from "../+state/context";
import { useHistory } from 'react-router';
import { Box, Button } from '@material-ui/core';

const StyledTableCell = withStyles((theme: { palette: { common: { black: any; white: any; }; }; }) => ({
  root: {
    borderBottom: 0
  },
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

const StyledTableRow = withStyles((theme: { palette: { action: { hover: any; }; }; }) => ({
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

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props: { count: any; page: any; rowsPerPage: any; onPageChange: any; }) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const CollapsibleTableRow = (props: { row: any }) => {
  const [open, setOpen] = React.useState(false);
  const { row } = props;
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = useStoreContext();

  const dispatchEditPolicyAction = (policy: any) => {
    dispatch({ type: 'update/editPolicy', payload: policy });
    history.push('/policy/edit');
  }

  return (
    <>
      <StyledTableRow key={row.policy}>
        <StyledTableCell component="th" scope="row">
          {row.policy_id}
        </StyledTableCell>
        <StyledTableCell align="right">{row.date_of_purchase}</StyledTableCell>
        <StyledTableCell align="right">{row.customer_id}</StyledTableCell>
        <StyledTableCell align="right">{row.fuel}</StyledTableCell>
        <StyledTableCell align="right">{row.vehicel_segment && 'True' || 'False'}</StyledTableCell>
        <StyledTableCell align="right">{row.premium}</StyledTableCell>
        <StyledTableCell>
          <IconButton style={{ marginRight: 8 }} aria-label="expand row" size="small" onClick={() => dispatchEditPolicyAction(row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ borderBottom: 0, padding: open ? 16 : 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table className={classes.table} size="small" aria-label="purchases">
              <TableBody>
                <TableRow style={{ borderBottom: 0 }}>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="right">{row.bodily_injury_liability && 'True' || 'False'}</StyledTableCell>
                  <StyledTableCell align="right">{row.personal_injury_protection && 'True' || 'False'}</StyledTableCell>
                  <StyledTableCell align="right">{row.property_damage_liability && 'True' || 'False'}</StyledTableCell>
                  <StyledTableCell align="right">{row.collision && 'True' || 'False'}</StyledTableCell>
                  <StyledTableCell align="right">{row.comprehensive && 'True' || 'False'}</StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  )
}

export default function CustomizedTables(props: { rows: object[], onLoadMore: () => void, endOfRecords: boolean }) {
  const classes = useStyles();
  const { rows, onLoadMore, endOfRecords } = props;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return rows.length > 0 ? (
    <TableContainer component={Paper} style={{ maxHeight: 360 }} >
      <Table className={classes.table} aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell> policy_id </StyledTableCell>
            <StyledTableCell> date_of_purchase </StyledTableCell>
            <StyledTableCell> customer_id </StyledTableCell>
            <StyledTableCell> fuel </StyledTableCell>
            <StyledTableCell> vehicle_segment </StyledTableCell>
            <StyledTableCell> premium </StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
            {/* <StyledTableCell> bodily_injury_liability </StyledTableCell>
            <StyledTableCell> personal_injury_protection </StyledTableCell>
            <StyledTableCell> property_damage_liability </StyledTableCell>
            <StyledTableCell> collision </StyledTableCell>
            <StyledTableCell> comprehensive </StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows).map((row: any) => <CollapsibleTableRow row={row} />)}
          {!endOfRecords && <TableRow>
            <StyledTableCell colSpan={7}>
              <Button variant="text" color="primary" onClick={onLoadMore} >Load More</Button>
            </StyledTableCell>
          </TableRow>
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={7}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ) : null;
}


