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
// Add quantity scaling

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
        backgroundColor: theme.palette.secondary.light
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light
    },
}));

var initValues = {
    'tier1': {
        'sandpaper': ["Coarse Sandpaper", NaN],
        'weave': ["Crossweave", NaN],
        'flux': ["Sand Flux", NaN],
        'tannin': ["Tannin", NaN],
        'solvent': ["Weak Solvent", NaN],
        'converter': ["Common Material Converter", {
            'gold': 0,
            'factionPoints': 100
        }]
    },
    'tier2': {
        'sandpaper': ["Coarse Sandpaper", NaN],
        'weave': ["Crossweave", NaN],
        'flux': ["Sand Flux", NaN],
        'tannin': ["Tannin", NaN],
        'solvent': ["Weak Solvent", NaN],
        'converter': ["Uncommon Material Converter", {
            'gold': 0,
            'factionPoints': 100
        }]
    },
    'tier3': {
        'sandpaper': ["Coarse Sandpaper", NaN],
        'weave': ["Crossweave", NaN],
        'flux': ["Sand Flux", NaN],
        'tannin': ["Tannin", NaN],
        'solvent': ["Weak Solvent", NaN],
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
    const [quantity, setQuantity] = React.useState(1);
    // rows = [{}]

    const handleQuantityChange =  (event: React.ChangeEvent<HTMLInputElement>) => {setQuantity(parseInt(event.target.value))}

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

    const computeArbitrageRate = (startItemCost, endItemCost, converterCost, quantity) => {
        if (isNaN(startItemCost) || isNaN(endItemCost)) {
            return "NaN"
        }
        var rate = (endItemCost * 15) - (startItemCost * 20)
        console.log("Arbitrage Rate", startItemCost, endItemCost, converterCost, rate)
        if (converterType == 'gold') {
            return (rate - converterCost) * quantity
        }
        else {
            return (rate) * quantity
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
                <Grid xs={12}>
                    <Typography variant='h2'>Refining Reagent Conversions</Typography>

                </Grid>
                <Grid xs={12}>
                    <Typography variant='h4'>How to use</Typography>

                </Grid>
                <Grid xs={12}>
                    <Typography variant='body2' style={{ fontSize: '1rem' }}>
                        Type in the prices of refining materials at your local trading post (you can fill out only a portion of them).<br />
                        If you're using Material Converters purchased through Faction Points or otherwise, leave that blank or put 0 there. If you're buying them on the AH, fill out their price as well.<br />
                        The rows in the table represent your intended <b>output material</b>, and the columns are the <b>input material</b>. <br />
                    </Typography>

                    <Typography variant='h4'>Example</Typography>
                    <Typography variant='body2' style={{ fontSize: '1rem' }}>
                        Sand Flux is going for 10g on the TP,  Weak Solvent is going for 2g, and you have 500 spare faction points that you'll be using to buy 5 converters. <br />
                        If you want to know what the profit per conversion of changing Weak Solvent into Sand Flux is, go 3 rows down and 5 columns over in the column after filling out the fields.<br />
                        Thus, if you use 5 converters you can make 550 gold by reselling the converted Sand Flux back on the TP.
                    </Typography>
                </Grid>

            </Grid>



            <Grid container item xs={12} style={{ backgroundColor: theme.palette.secondary.dark }}>
                {/* 
                <Grid container item justifyContent="space-evenly" alignItems='center' spacing={3} style={{ backgroundColor: theme.palette.secondary.light, }}>
                    
                    <FormControl className={classes.formControl}>
                        <InputLabel id="tier-selector-label">Refining Reagent Tier</InputLabel>
                        <Select
                        labelId="tier-selector-label"
                        id="tier-selector"
                        value={currentTier}
                        onChange={handleTierChange}
                        inputProps={{
                            className: classes.input
                        }}
                        >
                        <MenuItem value={'tier1'}>Tier 1</MenuItem>
                        <MenuItem value={'tier2'}>Tier 2</MenuItem>
                        <MenuItem value={'tier3'}>Tier 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid> */}

                <Grid container item justifyContent="space-evenly" alignItems='flex-end' style={{ padding: '10px' }}>


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

                    <Grid item>
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
                        <Grid item xs={12}>
                            <Typography variant='body2'>100 Faction Points</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{reagentCosts[currentTier]['converter'][0]}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="converter"
                                variant="filled" color="secondary"
                                onChange={handleReagentCostChanges}
                                InputProps={{
                                    className: classes.input,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography>Quantity</Typography>
                        <TextField id="quantity"
                            variant="filled" color="secondary"
                            onChange={handleQuantityChange}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>

                </Grid>
            </Grid>
            <Grid container item xs={12} className={classes.table} style={{ backgroundColor: theme.palette.secondary.dark }}>
                {/* <Typography className={classes.head} id="tableTitle" variant='h3' component="div">
                    Table
                    </Typography> */}
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
                                            reagentCosts[currentTier]['converter'][1]['gold'],
                                            quantity)}g</Typography></TableCell>

                                        <TableCell align="center"><Typography variant='body2'>{computeArbitrageRate(reagentCosts[currentTier]['weave'][1],
                                            reagentCosts[currentTier][row.name][1],
                                            reagentCosts[currentTier]['converter'][1]['gold'],
                                            quantity)}g</Typography></TableCell>

                                        <TableCell align="center"><Typography variant='body2'>{computeArbitrageRate(reagentCosts[currentTier]['flux'][1],
                                            reagentCosts[currentTier][row.name][1],
                                            reagentCosts[currentTier]['converter'][1]['gold'],
                                            quantity)}g</Typography></TableCell>

                                        <TableCell align="center"><Typography variant='body2'>{computeArbitrageRate(reagentCosts[currentTier]['tannin'][1],
                                            reagentCosts[currentTier][row.name][1],
                                            reagentCosts[currentTier]['converter'][1]['gold'],
                                            quantity)}g</Typography></TableCell>

                                        <TableCell align="center"><Typography variant='body2'>{computeArbitrageRate(reagentCosts[currentTier]['solvent'][1],
                                            reagentCosts[currentTier][row.name][1],
                                            reagentCosts[currentTier]['converter'][1]['gold'],
                                            quantity)}g</Typography></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>


        </Grid>
    )
}