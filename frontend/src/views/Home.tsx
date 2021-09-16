import React, { FC, useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router';
import { getMessage, getPolicyDetail, getUserPoliciesDetail } from '../utils/api';
import { isAuthenticated } from '../utils/auth';
import { Box, TextField, Typography, MenuItem, FormControl,InputLabel, Select, Button } from '@material-ui/core';
import { reducer, initialState } from '../+state/reducer';
import Table from './Table';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  link: {
    color: '#61dafb',
  },
  formControl: {
    marginRight: 24,
    minWidth: 160
  },
  buttonClass:{
    marginLeft: 24,
    minWidth: 60
  }
}));

export const Home: FC = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  
  const { query } = state;

  const { endOfRecords } = query;

  const dispatchQueryAction =  (value: any,type: string) => dispatch({ type : 'query/update' , payload :  { [type] :  value } })

  const fetchResults = async () => {
    const { value , type } = query;
    let results;

    if(!(value&&type)){ alert('Error') }

    switch(type){
      case 'policy':
        results = await getPolicyDetail(value);
        console.log(results)
        dispatch({ type : 'query/results' , payload : [results] })
        break;
      default:
        results = await getUserPoliciesDetail(value);
        dispatch({ type : 'query/results' , payload : results })
        if(results.length === 0){
          dispatch({ type : 'query/update' , payload :  { endOfRecords: true } });
        }
        break;
    }
  }

  const loadMoreData = async () => {
    dispatch({ type : 'query/update' , payload :  { skip : state.query.skip + 25 } });
    await fetchResults();
  }

  return (
    <Box width="100%" textAlign="center" mt={3}>
      <Collapse in={query.results.length === 0}>
        <Typography variant="h3" color="textSecondary" gutterBottom >Search For Policy Details using Customer or Policy Id</Typography>
      </Collapse>
      <Box display="flex"  alignItems="center" justifyContent="center" mx="auto" mt={3} >
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel>Query Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e) => dispatchQueryAction(e.target.value,'type')}
        >
          <MenuItem value={"policy"}>Search By Policy</MenuItem>
          <MenuItem value={"customer"}>Search By Customer</MenuItem>
        </Select>
      </FormControl>
          <TextField
          required
          style={{ minWidth : 540 }}
          label="customerid/policyid"
          variant="outlined"
          onChange={(e) => dispatchQueryAction(e.target.value,'value')}
        />
        <Button color="secondary"  size="large" variant="contained" className={classes.buttonClass} onClick={fetchResults} >
            Search Query
        </Button>
      </Box>
      <Box width="75%" mx="auto" mt={3}>
      <Table  rows={query.results} onLoadMore={loadMoreData} endOfRecords={endOfRecords} />
      </Box>
    {/* { !isAuthenticated() && <Redirect to="/login" /> } */}
    </Box>
  );
};
