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
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// TODO
// Add white column lines to table

function createData(name, sandpaper, weave, flux, tannin, solvent) {
    return { name, sandpaper, weave, flux, tannin, solvent };
}

const rows = [
    createData('sandpaper', 159, 6.0, 24, 4.0, 5.0),
    createData('weave', 237, 9.0, 37, 4.3, 5.0),
    createData('flux', 262, 16.0, 24, 6.0, 5.0),
    createData('tannin', 305, 3.7, 67, 4.3, 5.0),
    createData('solvent', 356, 16.0, 49, 3.9, 5.0),
];

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
      minWidth: 120,
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.secondary.dark
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.secondary.dark
    },
}));

var initValues = {
    'tier1': {
        'sandpaper': ["Coarse Sandpaper", "0"],
        'weave': ["Crossweave", "0"],
        'flux': ["Sand Flux", "0"],
        'tannin': ["Tannin", "0"],
        'solvent': ["Weak Solvent", "0"],
        'converter': ["Common Material Converter", {
            'gold': 0,
            'factionPoints': 100
        }]
    },
    'tier2': {
        'sandpaper': ["Coarse Sandpaper", "0"],
        'weave': ["Crossweave", "0"],
        'flux': ["Sand Flux", "0"],
        'tannin': ["Tannin", "0"],
        'solvent': ["Weak Solvent", "0"],
        'converter': ["Uncommon Material Converter", {
            'gold': 0,
            'factionPoints': 100
        }]
    },
    'tier3': {
        'sandpaper': ["Coarse Sandpaper", "0"],
        'weave': ["Crossweave", "0"],
        'flux': ["Sand Flux", "0"],
        'tannin': ["Tannin", "0"],
        'solvent': ["Weak Solvent", "0"],
        'converter': ["Rare Material Converter", {
            'gold': 0,
            'factionPoints': 100
        }]
    },
}


export default function Arbitrage(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [reagentCosts, setReagentCosts] = React.useState(initValues);
    const [currentTier, setCurrentTier] = React.useState("tier1");
    const [converterType, setConverterType] = React.useState("gold");
    // rows = [{}]


    const handleReagentCostChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        var value = event.target.value.toLowerCase()
        var fValue = event.target.id

        var prevValue = reagentCosts[currentTier][fValue]
        var newValue = [prevValue[0], value]
        if (fValue == 'converter') {
            newValue = [prevValue[0], { ...prevValue[1], 'gold': value }]
        }
        setReagentCosts(reagentCosts => ({
            ...reagentCosts, [currentTier]: {
                ...reagentCosts[currentTier], [fValue]: newValue
            }
        }))
        console.log(reagentCosts)
    };

    const computeArbitrageRate = (startItemCost, endItemCost, converterCost) => {
        if (isNaN(startItemCost) || isNaN(endItemCost)) {
            return "NaN"
        }
        var rate = (endItemCost * 15) - (startItemCost * 20)
        console.log("Arbitrage Rate", startItemCost, endItemCost, converterCost, rate)
        if (converterType == 'gold') {
            return rate - converterCost
        }
        else {
            return rate
        }
    };

    const handleTierChange = () => {
        console.log("Tier change")
    };

    return (
        <Grid container className='root' spacing={0} style={{ backgroundColor: theme.palette.secondary.main, minHeight: '100vh' }}
            justifyContent="flex-start"
            alignItems="center"
        >
            <Grid container item xs={12}>
                <Typography variant='h2'>Refining Reagent Costs</Typography>
            </Grid>


            <Grid container item xs={12} style={{ backgroundColor: theme.palette.secondary.dark }}>

                <Grid container item justifyContent="space-evenly" alignItems='center' spacing={3} style={{ backgroundColor: theme.palette.secondary.light, }}>
                    
                    <FormControl className={classes.formControl}>
                        <InputLabel id="tier-selector-label">Refining Reagent Tier</InputLabel>
                        <Select
                        labelId="tier-selector-label"
                        id="tier-selector"
                        value={currentTier}
                        onChange={handleTierChange}
                        >
                        <MenuItem value={'tier1'}>Tier 1</MenuItem>
                        <MenuItem value={'tier2'}>Tier 2</MenuItem>
                        <MenuItem value={'tier3'}>Tier 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid container item justifyContent="space-evenly"  alignItems='flex-end' style={{padding: '10px'}}>
                    <Grid item>
                        <Typography>{reagentCosts[currentTier]['sandpaper'][0]}</Typography>
                        <TextField id="sandpaper"
                            variant="filled" color="primary"
                            onChange={handleReagentCostChanges}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <Typography>{reagentCosts[currentTier]['weave'][0]}</Typography>
                        <TextField id="weave"
                            variant="filled" color="primary"
                            onChange={handleReagentCostChanges}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <Typography>{reagentCosts[currentTier]['flux'][0]}</Typography>
                        <TextField id="flux"
                            variant="filled" color="primary"
                            onChange={handleReagentCostChanges}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <Typography>{reagentCosts[currentTier]['tannin'][0]}</Typography>
                        <TextField id="tannin"
                            variant="filled" color="secondary"
                            onChange={handleReagentCostChanges}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <Typography>{reagentCosts[currentTier]['solvent'][0]}</Typography>
                        <TextField id="solvent"
                            variant="filled" color="secondary"
                            onChange={handleReagentCostChanges}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <Typography>{reagentCosts[currentTier]['converter'][0]}</Typography>
                        <TextField id="converter"
                            variant="filled" color="secondary"
                            onChange={handleReagentCostChanges}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={12} className={classes.table} style={{ backgroundColor: theme.palette.primary.main }}>
                {/* <Typography className={classes.head} id="tableTitle" variant='h3' component="div">
                    Table
                    </Typography> */}
                <TableContainer component={Paper} style={{ backgroundColor: theme.palette.primary.main }}>
                    <Table className={classes.table} size="small" aria-label="arbitrage table" style={{ color: theme.palette.secondary.contrastText }}>
                        <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell> </TableCell>
                                <TableCell align="center"><Typography variant='body2'>{reagentCosts[currentTier]['sandpaper'][0]}</Typography></TableCell>
                                <TableCell align="center"><Typography variant='body2'>{reagentCosts[currentTier]['weave'][0]}</Typography></TableCell>
                                <TableCell align="center"><Typography variant='body2'>{reagentCosts[currentTier]['flux'][0]}</Typography></TableCell>
                                <TableCell align="center"><Typography variant='body2'>{reagentCosts[currentTier]['tannin'][0]}</Typography></TableCell>
                                <TableCell align="center"><Typography variant='body2'>{reagentCosts[currentTier]['solvent'][0]}</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="center" className={classes.head}><Typography variant='body2'>{reagentCosts[currentTier][row.name][0]}</Typography></TableCell>

                                    <TableCell align="center"><Typography variant='body2'>{computeArbitrageRate(reagentCosts[currentTier]['sandpaper'][1],
                                        reagentCosts[currentTier][row.name][1],
                                        reagentCosts[currentTier]['converter'][1]['gold'])}</Typography></TableCell>

                                    <TableCell align="center"><Typography variant='body2'>{computeArbitrageRate(reagentCosts[currentTier]['weave'][1],
                                        reagentCosts[currentTier][row.name][1],
                                        reagentCosts[currentTier]['converter'][1]['gold'])}</Typography></TableCell>

                                    <TableCell align="center"><Typography variant='body2'>{computeArbitrageRate(reagentCosts[currentTier]['flux'][1],
                                        reagentCosts[currentTier][row.name][1],
                                        reagentCosts[currentTier]['converter'][1]['gold'])}</Typography></TableCell>

                                    <TableCell align="center"><Typography variant='body2'>{computeArbitrageRate(reagentCosts[currentTier]['tannin'][1],
                                        reagentCosts[currentTier][row.name][1],
                                        reagentCosts[currentTier]['converter'][1]['gold'])}</Typography></TableCell>

                                    <TableCell align="center"><Typography variant='body2'>{computeArbitrageRate(reagentCosts[currentTier]['solvent'][1],
                                        reagentCosts[currentTier][row.name][1],
                                        reagentCosts[currentTier]['converter'][1]['gold'])}</Typography></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>


        </Grid>
    )
}