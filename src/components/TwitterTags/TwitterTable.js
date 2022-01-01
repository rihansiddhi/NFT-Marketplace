import React, { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import InputField from '../helperComponents/inputField';
import CustomButton from "../helperComponents/customButton";
import { Box, Hidden, Typography } from '@material-ui/core';
import CustomCheckbox from "../helperComponents/customCheckbox";
import cn from 'classnames';
import useStyles from "../TwitterTags/twitterTableStyles";

export default function BasicTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.tableData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Fragment>
      <Typography style={{marginTop: 25}} display="block">Your Balance:&nbsp;<Typography display="inline" className={classes.TwitterTable_balance}>{props.selectedAsset.balance} {props.selectedAsset.symbol} </Typography>{ props.tableErrors ? <Typography color="error" variant="caption" style={{marginLeft: 10}}>(Insufficient Funds)</Typography> : null }</Typography>
      <div className={classes.TwitterTags_buttonWrap}>
          <div>
            <div className={classes.TwitterTable_infoText}>
                <CustomCheckbox label={`Distribute till I run out of ${props.selectedAsset.symbol}`}  onChange={props.checkBoxChange} checked={props.checkboxData} onC classes={{label:classes.TwitterTable_label}}/>
            </div>
            <Typography display="block" className={classes.TwitterTable_infoText}>Press Airdrop to distribute the entered amount</Typography>
          </div>
          <CustomButton variant="contained" className={classes.TwitterTags_formButton} onClick={props.airDrop}  disabled={props.airdropDisable}>Airdrop</CustomButton>
      </div>
      <TableContainer className={classes.TwitterTable_TableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.TwitterTable_TableHeadCell} width="30%">Twitter User</TableCell>
              <TableCell className={classes.TwitterTable_TableHeadCell} align="left" width="30%">xHashtag User</TableCell>
              <TableCell className={classes.TwitterTable_TableHeadCell} align="left" width="20%">No # tweets</TableCell>
              <TableCell className={classes.TwitterTable_TableHeadCell} align="left" width="20%">Amount to distribute</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tableData && props.tableData.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell className={classes.TwitterTable_TableCell} component="th">
                  {row.twitterUser}
                </TableCell>
                <TableCell className={classes.TwitterTable_TableCell} align="left">{row.bitcoinMusicUser}</TableCell>
                <TableCell className={classes.TwitterTable_TableCell} align="left">{row.noOfTweets}</TableCell>
                <TableCell className={classes.TwitterTable_TableCell} align="left">
                  <InputField className={classes.TwitterTable_inputRoot} onChange={(e) => props.inputHandler(e,index)} InputProps={{ classes: { root: classes.TwitterTable_formInput },readOnly: props.checkboxData }} FormControlProps={{ classes: { root: classes.TwitterTable_formControl }}} value={row.amount} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={props.tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
        </Table>
        { !props.tableData || props.tableData.length == 0  ? <Typography display="block" className={ classes.TwitterTable_noResults }>No results found</Typography> : null}
      </TableContainer>
        <Hidden mdUp>
          <Box mt={1} pb={2}>
            <Box display="block" align="center" >Swipe table left for more information</Box>
            <CustomButton variant="contained" className={cn(classes.TwitterTags_formButton, classes.TwitterTable_buttonResponsive)} disabled={props.airdropDisable}>Airdrop</CustomButton>
          </Box>
        </Hidden>
    </Fragment>
  );
}