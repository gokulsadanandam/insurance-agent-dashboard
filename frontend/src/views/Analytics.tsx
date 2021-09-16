import { Box, Typography, Card, MenuItem, TextField, Button } from '@material-ui/core';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, PieChart } from 'recharts';
import { getPoliciesSoldPerRegionPerMonth, getTotalCustomersPerRegion, getTotalPoliciesSoldPerMonth } from '../utils';

const NumberOfUserPerRegion = ({ data }: { data: any }) => {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <PieChart width={730} height={250}>
            <Tooltip />
            <Pie data={data} dataKey="count" nameKey="customer_region" fill="#8884d8" >
                {data.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    )
}

const NumberOfPoliciesSoldPerMonth = ({ data }: { data: any }) => (
    <ResponsiveContainer width="25%" minWidth={300} minHeight={300} maxHeight={300}  >
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
    </ResponsiveContainer>
)

export const Analytics = () => {

    const [data, updateData] = useState([])
    const [region, updateRegion] = useState('')
    const [totalPoliciesPerMonthPerRegion, updatetotalPoliciesPerMonthPerRegion] = useState()
    const [usersByRegion, updateUsersByRegion] = useState([])

    useEffect(() => {
        const data = getTotalPoliciesSoldPerMonth();
        const usersByRegion = getTotalCustomersPerRegion()

        data.then(value => {
            updateData((_prevState: any) => value.map((v: any) => {
                const date = new Date(v.month * 1000)
                return { ...v, month: `${date.getUTCMonth() + 1}/${date.getFullYear()}` }
            }))
        })

        usersByRegion.then(value => {
            updateUsersByRegion((_prevState: any) => value)
        })

    }, [])

    const fetchMonthlyStats = async () => {
        const results = await getPoliciesSoldPerRegionPerMonth(region)
        updatetotalPoliciesPerMonthPerRegion(results);
    }
    console.log(totalPoliciesPerMonthPerRegion)
    return (
        <Box pt={2} display="flex" textAlign="center" flexWrap="wrap" >
            <Box textAlign="center" >
                <Typography color="secondary" gutterBottom variant="h6">Total Policies Sold Per Month</Typography>
                {data.length > 0 && <NumberOfPoliciesSoldPerMonth data={data} />}
            </Box>
            <Box textAlign="center" >
                <Typography variant="h6">Total Users Per Region</Typography>
                <NumberOfUserPerRegion data={usersByRegion} />
            </Box>
            <Box textAlign="center" >
                <Typography variant="h6" gutterBottom>Policies Sold Per Month Per Region</Typography>
                <form>
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select a Region"
                    value={region}
                    onChange={e => updateRegion(e.target.value)}
                    helperText="Please select a region"
                    variant="filled"
                >
                    <MenuItem value={"North"}>North</MenuItem>
                    <MenuItem value={"South"}>South</MenuItem>
                    <MenuItem value={"East"}>East</MenuItem>
                    <MenuItem value={"West"}>West</MenuItem>
                </TextField>
                <Button color="secondary" variant="text" onClick={fetchMonthlyStats} >Fetch Stats</Button>
                {totalPoliciesPerMonthPerRegion && Object.keys(totalPoliciesPerMonthPerRegion).map( (key: string) => <li>
                    {new Date(parseInt(key)*1000).getMonth() + 1 } / {new Date(parseInt(key)*1000).getFullYear() } - {  totalPoliciesPerMonthPerRegion[key]}
                </li> )}
                </form>
            </Box>
        </Box>
    )
}
