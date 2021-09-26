import React, { useState } from 'react';
import { Grid, Typography } from "@material-ui/core";
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
import { rows } from './FilteringData';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1
    },
    input: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light
    },
    table: {
        minWidth: 300,
        borderRadius: '3px',

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

    const makeItemNameList = (adjEdges) => {
        var rows = []
        console.log(adjEdges)
        adjEdges.forEach(edge => {
            console.log([edge, adjEdges])
            rows.push(<TableCell>id {edge.target} prob {edge.attributes.computedProbability} quant{edge.attributes.quantity}</TableCell>)
        });
        return rows
    }

    return (
        <Grid container className='root' spacing={0} style={{ backgroundColor: theme.palette.secondary.main, minHeight: '100vh' }}
            justifyContent="flex-start"
            alignItems="center"
        >
            <Grid container item xs={4}>
                <Grid xs={12}>
                    <Typography variant='h2'>Gathering Reagent Stuff</Typography>
                </Grid>
                <Grid container item>
                    <GatheringNetwork setAdjNodes={setAdjNodes} setAdjEdges={setAdjEdges}
                        selectedGatheringNode={'oreveinfinishsmall'} luckBonus={luckBonus}></GatheringNetwork>
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
                                    <TableCell> </TableCell>
                                    <TableCell align="center"><Typography variant='body2'>Header</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {makeItemNameList(adjEdges)}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Grid container item xs={4} style={{ backgroundColor: theme.palette.secondary.dark }}>
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