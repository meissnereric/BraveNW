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
import { gatheringSplitRows, gatheringLabelsMap } from './FilteringData';
import { titleCase } from './GraphConfig';

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
    tableHeading: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.contrastText,
        textAlign: 'center',
        padding: theme.spacing(1),

    },
    formControl: {
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    legend: {
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(1),
        padding: theme.spacing(1),

    },
    luckBox: {
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(1),
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
        var makeGRow = (row) => {
            return <FormControlLabel labelPlacement='end' className={classes.input} value={row.nodeId} control={<Radio />} label={row.nodeName} />
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

                <FormLabel className={classes.head} component="legend"><Typography align='left' variant='h3' className={classes.head}>Gathering Nodes</Typography></FormLabel>
                {gatheringSplitRows.mining.map((row) => makeGRow(row))}
                {gatheringSplitRows.logging.map((row) => makeGRow(row))}
                {gatheringSplitRows.harvesting.map((row) => makeGRow(row))}
            </RadioGroup>
        </FormControl>
    }

    const makeRows = (adjEdges) => {
        var rows = []
        for (let key in adjEdges) {
            let edge = adjEdges[key];
            rows.push(<TableRow className={classes.input}>{makeRow(edge)}</TableRow>)
        };
        return rows

    }

    const makeRow = (edge) => {
        var cells = []
        cells.push(<TableCell className={classes.input}>{titleCase(edge.attributes.targetName)}</TableCell>)
        cells.push(<TableCell className={classes.input} align="center">{edge.attributes.quantitylow}-{edge.attributes.quantityhigh}</TableCell>)
        cells.push(<TableCell className={classes.input} align="center">{(edge.attributes.computedProbability * 100).toFixed(2)}%</TableCell>)
        return cells

    }
    var graphReactObject = (
        <GatheringNetwork setAdjNodes={setAdjNodes} setAdjEdges={setAdjEdges}
            selectedGatheringNode={selectedGatheringNode} luckBonus={luckBonus}></GatheringNetwork>
    )

    var thing = (
        <Grid container className='root' spacing={0} style={{ backgroundColor: theme.palette.secondary.main, minHeight: '100vh', minWidth: '100vw' }}
            justifyContent="flex-start"
            alignItems="flex-start">

            <Grid container item xs={2} 
                justifyContent="flex-start"
                alignItems="flex-start"
                style={{ backgroundColor: theme.palette.secondary.dark }}
                className={classes.legend}>
                <Grid item xs={12}>
                    {makeFilterList('Mining')}
                </Grid>
                <Grid item>
                    {graphReactObject}
                </Grid>
            </Grid>

            <Grid container item alignItems='center' justifyContent="center" xs={6} className={classes.table} style={{ backgroundColor: theme.palette.secondary.dark }}>
                <Grid item xs={12}>
                    <Typography variant='h3' className={classes.tableHeading} >Probability of Items</Typography>
                    <Typography variant='h3' className={classes.tableHeading} >{gatheringLabelsMap[selectedGatheringNode]}</Typography>

                </Grid>
                <Grid item>
                    <TableContainer component={Paper} style={{ backgroundColor: theme.palette.primary.main }}>
                        <Table className={classes.table} size="small" aria-label="gathering table" style={{ color: theme.palette.secondary.contrastText }}>
                            <TableHead className={classes.head}>
                                <TableRow>
                                    <TableCell align="center" className={classes.input}>Item</TableCell>
                                    <TableCell align="center" className={classes.input}>Quantity</TableCell>
                                    <TableCell align="center" className={classes.input}>Chance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {makeRows(adjEdges)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Grid container item xs={2} className={classes.luckBox} style={{ backgroundColor: theme.palette.secondary.dark }}>
                <Grid container item justifyContent="space-evenly" alignItems='flex-end' style={{ padding: '10px' }}>
                    <Grid item>                    
                        <Typography variant='h3' className={classes.tableHeading} >Luck Bonuses</Typography>
                        <Typography>Total Luck Bonus</Typography>
                        <TextField id="luckBonus"
                            variant="filled" color="secondary"
                            defaultValue={luckBonus}
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