import React, { useState, useEffect } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Grid, Typography, Box } from "@material-ui/core";
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
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(1),


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
        padding: theme.spacing(1),
        // minWidth: 80,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light,
    },
    maxWidth: {
        //   width: "100%"
    }
}));


export default function GatheringLuck(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [adjNodes, setAdjNodes] = React.useState([]);
    const [adjEdges, setAdjEdges] = React.useState([]);
    const [selectedGatheringNode, setSelectedGatheringNode] = React.useState("oreveinfinishsmall");
    const [luckBonus, setLuckBonus] = React.useState(0);

    const handleLuckBonusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var luckBonus = parseInt(event.target.value)
        if (isNaN(luckBonus)) {
            luckBonus = 1
        }
        setLuckBonus(luckBonus)
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGatheringNode(event.target.value);
        console.log(["Selected gathering node", event.target.value, selectedGatheringNode])
    }



    const makeFilterList = (filterType) => {
        var makeRow = (row) => {
            return <FormControlLabel className={classes.input} value={row.nodeId} control={<Radio />} label={row.nodeName} />
        }
        console.log(["Rows", filterType, gatheringSplitRows])
        return <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
                aria-label="gatheringNode"
                defaultValue="oreveinfinishsmall"
                name="gathering-nodes-radio-group"
                onChange={handleRadioChange}
                value={selectedGatheringNode}
            >

                <FormLabel className={classes.head} component="legend" >Gathering Node</FormLabel>
                {gatheringSplitRows.mining.map((row) => makeRow(row))}
                {gatheringSplitRows.logging.map((row) => makeRow(row))}
                {gatheringSplitRows.harvesting.map((row) => makeRow(row))}
            </RadioGroup>
        </FormControl>
    }

    const makeHeaderList = (adjEdges) => {
        var rows = []
        var range = Array.from(Array(adjEdges).keys())
        console.log(["range", range])
        var i = 0
        range.forEach(edge => {
            i = i + 1
            rows.push(<TableCell className={classes.input}>Item{i}</TableCell>)
        });
        return rows
    }
    const makeItemNameList = (adjEdges) => {
        var rows = []
        for (let key in adjEdges) {
            let edge = adjEdges[key];
            rows.push(<TableCell className={classes.input}>{edge.attributes.targetName}</TableCell>)
        };
        return rows
    }
    const makeQuantityList = (adjEdges) => {
        var rows = []
        for (let key in adjEdges) {
            let edge = adjEdges[key];
            rows.push(<TableCell className={classes.input}>{edge.attributes.quantitylow}-{edge.attributes.quantityhigh}</TableCell>)
        };
        return rows
    }
    const makeProbabilityList = (adjEdges) => {
        var rows = []
        for (let key in adjEdges) {
            let edge = adjEdges[key];
            rows.push(<TableCell className={classes.input}>{(edge.attributes.computedProbability * 100).toFixed(2)}%</TableCell>)
        };
        return rows
    }
    var graphReactObject = (
        <GatheringNetwork setAdjNodes={setAdjNodes} setAdjEdges={setAdjEdges}
            selectedGatheringNode={selectedGatheringNode} luckBonus={0}></GatheringNetwork>
    )

    var thing = (
        <Grid container className='root' spacing={0} style={{ backgroundColor: theme.palette.secondary.main, minHeight: '100vh' }}
            justifyContent="flex-start"
            alignItems="center">

            <Grid container item style={{ backgroundColor: theme.palette.secondary.dark }}>
                <Grid item xs={12}>
                    <Typography variant='h2'>{makeFilterList('Mining')}</Typography>
                </Grid>
                <Grid item>
                    {graphReactObject}
                </Grid>)
            </Grid>

            <Grid container item xs={6} className={classes.table} style={{ backgroundColor: theme.palette.secondary.dark }}>
                <TableContainer component={Paper} style={{ backgroundColor: theme.palette.primary.main }}>
                    <Table className={classes.table} size="small" aria-label="arbitrage table" style={{ color: theme.palette.secondary.contrastText }}>
                        {/* <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                {makeHeaderList(adjEdges)}
                            </TableRow>
                        </TableHead> */}
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

            <Grid container item xs={2} style={{ backgroundColor: theme.palette.secondary.dark }}>
                <Grid container item justifyContent="space-evenly" alignItems='flex-end' style={{ padding: '10px' }}>
                    <Grid item>
                        <Typography>Luck Bonus</Typography>
                        <TextField id="luckBonus"
                            variant="filled" color="secondary"
                            defaultValue="5000"
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
    console.log("Thing", graphReactObject)
    return thing
}