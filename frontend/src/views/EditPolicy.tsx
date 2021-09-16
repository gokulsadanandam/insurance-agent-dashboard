import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useStoreContext } from "../+state/context";
import { Redirect, useHistory } from 'react-router';
import { Box, Breadcrumbs, Button, FormControl, FormControlLabel, FormLabel, InputLabel, Link, MenuItem, Radio, RadioGroup, Select, Typography } from '@material-ui/core';
import { useState } from 'react';
import { Policy } from '../+state/reducer';
import { updatePolicyInDb } from '../utils';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        justifyContent: 'space-evenly',
        display: 'flex',
        flexWrap: 'wrap'
    },
}));

export const EditPolicy = () => {
    const classes = useStyles();
    const { state, dispatch } = useStoreContext();
    const { selectedPolicyForEdit } = state;
    const history = useHistory();

    const updateValue = ({ value, type }: { value: string | boolean | number , type: string }) => {
        if (type == "premium" && typeof (value) === "number" && value > 1000000) { return alert('Error in Premium Value!') }
       return  dispatch({ type : 'update/selectedPolicy' , payload : { [type] : value } })
    }

    const updatePolicy = async () => {
        dispatch({ type : 'app/loader' , payload : true })
        await updatePolicyInDb(selectedPolicyForEdit as Policy );
        dispatch({ type : 'app/loader' , payload : false })
        dispatch({ type : 'app/resetState' , payload : false })
        dispatch({ type : "app/notification" , payload : "Policy Updated" })
        history.push('/')
    }

    const getDate = (d: number) => new Date(d * 1000).toDateString();

    const bool = (value: string) =>  { if(value==='true') return true; return false }

    return selectedPolicyForEdit ? (
        <Box m={2}>
            <Box display="flex" mb={3} width="100%" justifyContent="space-between">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" onClick={() => history.push('/')}>
                        Home
                    </Link>
                    <Typography color="textPrimary">edit policy</Typography>
                </Breadcrumbs>
                <Button color="secondary" variant="outlined" onClick={updatePolicy} >Update Policy</Button>
            </Box>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    variant="filled"
                    label="policy_id"
                    value={selectedPolicyForEdit.policy_id}
                    disabled
                />
                <TextField
                    variant="filled"
                    label="date_of_purchase"
                    value={getDate(selectedPolicyForEdit.date_of_purchase)}
                    disabled
                />
                <TextField
                    variant="filled"
                    label="premium"
                    type="number"
                    error={selectedPolicyForEdit.premium > 1000000}
                    helperText={selectedPolicyForEdit.premium > 1000000 && "Value should be less than million"}
                    inputProps={{ min: 0, max: 1000000 }}
                    value={selectedPolicyForEdit.premium}
                    onChange={e => updateValue({ value: parseInt(e.target.value), type: 'premium' })}
                />
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    value={selectedPolicyForEdit.fuel}
                    onChange={e => updateValue({ value: e.target.value as string, type: 'fuel' })}
                    helperText="Please select your vehicle fuel type"
                    variant="filled"
                >
                    <MenuItem value={"CNG"}>CNG</MenuItem>
                    <MenuItem value={"Petrol"}>Petrol</MenuItem>
                    <MenuItem value={"Diesel"}>Diesel</MenuItem>
                </TextField>
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    value={selectedPolicyForEdit.vehicle_segment}
                    onChange={e => updateValue({ value: e.target.value as string, type: 'vehicle_segment' })}
                    helperText="Please select vehicle segment"
                    variant="filled"
                >
                    <MenuItem value={"A"}>A</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"C"}>C</MenuItem>
                </TextField>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Any Bodily Injury Liability?</FormLabel>
                    <RadioGroup row aria-label="injury" name="injury" value={selectedPolicyForEdit.bodily_injury_liability}
                        onChange={e => updateValue({ value: bool(e.target.value) as boolean, type: 'bodily_injury_liability' })} >
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Any Collision?</FormLabel>
                    <RadioGroup row aria-label="collision" name="collision" value={selectedPolicyForEdit.collision}
                        onChange={e => updateValue({ value: bool(e.target.value) as boolean, type: 'collision' })} >
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Any comprehensive?</FormLabel>
                    <RadioGroup row aria-label="comprehensive" name="comprehensive" value={selectedPolicyForEdit.comprehensive}
                        onChange={e => updateValue({ value: bool(e.target.value) as boolean, type: 'comprehensive' })} >
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Any personal_injury_protection?</FormLabel>
                    <RadioGroup row aria-label="personal_injury_protection" name="personal_injury_protection" value={selectedPolicyForEdit.personal_injury_protection}
                        onChange={e => updateValue({ value: bool(e.target.value) as boolean, type: 'personal_injury_protection' })} >
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Any property_damage_liability?</FormLabel>
                    <RadioGroup row aria-label="property_damage_liability" name="property_damage_liability" value={selectedPolicyForEdit.property_damage_liability}
                        onChange={e => updateValue({ value: bool(e.target.value) as boolean, type: 'property_damage_liability' })} >
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </form>
        </Box>
    ) : <Redirect to="/" />;
}
