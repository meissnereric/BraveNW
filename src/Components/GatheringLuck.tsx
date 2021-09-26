import React, { useState } from 'react';
import { Button, FormControlLabel, Grid, Typography } from "@material-ui/core";
import { Theme, useTheme } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from "@material-ui/core";
import GatheringNetwork from "./GatheringNetwork"
import { gatheringSplitRows } from './FilteringData';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1
    },
    input: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light
    },
    table: {
        minWidth: 650,
        borderRadius: '3px',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light

    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.dark
    },
    title: {

    },
    head: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.contrastText,
    },
    formControl: {
        margin: theme.spacing(1),
        // minWidth: 80,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light
    },
}));


export default function GatheringLuck(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [adjNodes, setAdjNodes] = React.useState([]);
    const [adjEdges, setAdjEdges] = React.useState([]);
    const [selectedGatheringNode, setSelectedGatheringNode] = React.useState("");
    const [luckBonus, setLuckBonus] = React.useState(0);
    // rows = [{}]

    const handleLuckBonusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var luckBonus = parseInt(event.target.value)
        if (isNaN(luckBonus)) {
            luckBonus = 1
        }
        setLuckBonus(luckBonus)
    }



    const makeFilterList = (filterType) => {
        var makeRow = (row) => {
            return <FormControlLabel
                style={{ backgroundColor: row.colorHex, color: 'white', margin: 2, padding: 5, textAlign: 'left' }}
                control={
                    <Button

                    />
                }
                label={row.filterValue}
            />
        }

        var rows = []
        if (filterType === 'Mining') {
            rows = gatheringSplitRows.mining.map((row) => makeRow(row))
        }
        else if (filterType === 'Logging') {
            rows = gatheringSplitRows.logging.map((row) => makeRow(row))
        }
        else if (filterType === 'Harvesting') {
            rows = gatheringSplitRows.harvesting.map((row) => makeRow(row))
        }

        return [rows]
    }

    const makeHeaderList = (adjEdges) => {
        var rows = []
        var range = Array.from(Array(adjEdges).keys())
        console.log(["range", range])
        adjEdges.forEach(edge=> {
            rows.push(<TableCell className={classes.input}>Item{adjEdges.indexOf(edge)}</TableCell>)
        });
        return rows
    }
    const makeItemNameList = (adjEdges) => {
        var rows = []
        adjEdges.forEach(edge => {
            rows.push(<TableCell className={classes.input}>{edge.target}</TableCell>)
        });
        return rows
    }
    const makeQuantityList = (adjEdges) => {
        var rows = []
        adjEdges.forEach(edge => {
            rows.push(<TableCell className={classes.input}>{edge.attributes.quantity}</TableCell>)
        });
        return rows
    }
    const makeProbabilityList = (adjEdges) => {
        var rows = []
        adjEdges.forEach(edge => {
            rows.push(<TableCell className={classes.input}>{edge.attributes.computedProbability}</TableCell>)
        });
        return rows
    }

    return (
        <Grid container className='root' spacing={0} style={{ backgroundColor: theme.palette.secondary.main, minHeight: '100vh' }}
            justifyContent="flex-start"
            alignItems="center">
                

            <Grid container item xs={4} style={{ backgroundColor: theme.palette.secondary.dark }}>
                <Grid container item>
                    <GatheringNetwork setAdjNodes={setAdjNodes} setAdjEdges={setAdjEdges}
                        selectedGatheringNode={'oreveinfinishsmall'} luckBonus={luckBonus}></GatheringNetwork>
                </Grid>
                <Grid item>
                    <Typography variant='h2'>Hello</Typography>
                </Grid>
            </Grid>

            <Grid container item xs={4} className={classes.table} style={{ backgroundColor: theme.palette.secondary.dark }}>
                <Grid item xs={2}> </Grid>
                <Grid item xs={10} alignItems='center' justifyContent='center'>
                    <Typography variant='h4'>Input Materials</Typography>
                </Grid>
                <Grid item xs={2} alignItems='center' justifyContent='center'>
                    <Typography variant='h4'>Output Materials</Typography>
                </Grid>

                <Grid item xs={10}>
                    <TableContainer component={Paper} style={{ backgroundColor: theme.palette.primary.main }}>
                        <Table className={classes.table} size="small" aria-label="arbitrage table" style={{ color: theme.palette.secondary.contrastText }}>
                            <TableHead className={classes.head}>
                                <TableRow>
                                    <TableCell align="center"></TableCell>
                                    {makeHeaderList(adjEdges)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" className={classes.input}>Item Name</TableCell>
                                    {makeItemNameList(adjEdges)}
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" className={classes.input}>Quantity</TableCell>
                                    {makeQuantityList(adjEdges)}
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" className={classes.input}>Probability</TableCell>
                                    {makeProbabilityList(adjEdges)}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Grid container item xs={2} style={{ backgroundColor: theme.palette.secondary.dark }}>
                <Grid container item justifyContent="space-evenly" alignItems='flex-end' style={{ padding: '10px' }}>
                    <Grid item>
                        <Typography>Luck Bonus</Typography>
                        <TextField id="luckBonus"
                            variant="filled" color="secondary"
                            onChange={handleLuckBonusChange}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>


        </Grid>
    )
}