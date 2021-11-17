import React, { useState, useEffect, useReducer } from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Grid, Typography, Box, Accordion, AccordionSummary, AccordionDetails, useMediaQuery, GridSize } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
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
import PersistentDrawer from './PersistentDrawer';
import { ExpandMore } from '@material-ui/icons';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.main,
        minHeight: '100vh',
        minWidth: '100vw'
    },
    input: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light
    },
    table: {
        minWidth: '600px',
        borderRadius: '3px',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.dark,
        margin: theme.spacing(1),
    },
    mobileTable: {
        minWidth: '100%',
        borderRadius: '3px',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.dark,
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(1),
        // textAlign: 'center',
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
        // textAlign: 'center',
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
        backgroundColor: theme.palette.secondary.dark
    },
    mobileLegend: {
        minWidth: '100%',
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.secondary.dark
    },
    luckBox: {
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.dark
    },
    mobileLuckBox: {
        minWidth: '100%',
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.dark
    },
    tableContainer: {
        backgroundColor: theme.palette.primary.main
    },
    highlightBox: {
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(1),

    }

});

const initLucks = {
    armorLuck: 0,
    toolLuck: 0,
    amuletLuck: 0,
    housingLuck: 0,
    foodLuck: 0,
    settlementLuck: 0,
    skillLevel: 0
}


type State = {
    adjNodes: any,
    adjEdges: any,
    selectedGatheringNode: string,
    luckBonus: number,
    luckBonuses: Object,
    firstLoad: boolean
}

type Props = {
    classes: any,
    IsDesktop: boolean
}

class WarBoard extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            adjNodes: [],
            adjEdges: [],
            selectedGatheringNode: "oreveinfinishsmall",
            luckBonus: 0,
            luckBonuses: initLucks,
            firstLoad: true
        }
        this.getAdjNodes = this.getAdjNodes.bind(this)
        this.getAdjEdges = this.getAdjEdges.bind(this)
        this.updateSelectedGatheringNode = this.updateSelectedGatheringNode.bind(this)
        this.updateLuckBonus = this.updateLuckBonus.bind(this)
        this.updateLuckBonuses = this.updateLuckBonuses.bind(this)
        this.updateSelectedGatheringNode = this.updateSelectedGatheringNode.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)

    }

    getAdjNodes(toKeepNodes) {
        this.setState({ adjNodes: toKeepNodes })
    }
    getAdjEdges(toKeepEdges) {
        this.setState({ adjEdges: toKeepEdges })
    }
    updateSelectedGatheringNode(gnode) {
        this.setState({ selectedGatheringNode: gnode }, () => { console.log("Done gathering node updating"); this.forceUpdate(); console.log("Extra done gathering node updating"); })
    }
    updateLuckBonus(lb) {
        this.setState({ luckBonus: lb },
            () => { console.log("Done luck bonus updating", lb, this.state.luckBonus); this.forceUpdate(); console.log("Extra done luck bonus updating", lb, this.state.luckBonus); })
    }
    updateLuckBonuses(lbs) {
        this.setState({ luckBonuses: lbs }, () => { console.log("Done luck bonuses updating"); })
    }

    handleLuckBonusChange = (event: any) => {
        var lb = parseInt(event.target.value)
        if (isNaN(lb)) {
            lb = 0
        }

        var luckType = event.target.id
        var cp = { ...this.state.luckBonuses }
        cp[luckType] = lb
        this.updateLuckBonuses(cp)

        let sum = 0
        for (let key in this.state.luckBonuses) {
            sum = sum + this.state.luckBonuses[key];
        }
        this.updateLuckBonus(sum)
        console.log(["Luck bonus", event.target.value, this.state.luckBonus])
        console.log(["Luck bonuses", cp, this.state.luckBonuses])
    }

    handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.updateSelectedGatheringNode(event.target.value)
        console.log(["Selected gathering node", event.target.value, this.state.selectedGatheringNode])
    }



    makeServerList = (classes, filterType) => {
        var makeGRow = (row) => {
            return <FormControlLabel
                style={{ backgroundColor: row.colorHex, color: 'white', margin: 2, padding: 5 }} // , textAlign: 'left' 
                labelPlacement='end' className={classes.input} value={row.nodeId} control={<Radio />} label={row.nodeName} />
        }

        return <Accordion className={classes.formControl}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Servers</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup
                        aria-label="gatheringNode"
                        defaultValue="oreveinfinishsmall"
                        name="gathering-nodes-radio-group"
                        onChange={this.handleRadioChange}
                        value={this.state.selectedGatheringNode}
                    >

                        <FormLabel className={classes.head} component="legend"><Typography align='left' variant='h3' className={classes.head}>Characters</Typography></FormLabel>

                        {gatheringSplitRows.mining.map((row) => makeGRow(row))}
                    </RadioGroup>
                </FormControl>
            </AccordionDetails>
        </Accordion>
    }

    makeLegend = (isDesktop: boolean, classes: any) => {
        var legend = (
            <Box>
                <Grid item xs={12}>
                    <Paper className={classes.formControl} style={{ overflow: 'auto' }}>
                        {this.makeFilterList(classes, 'Mining')}
                    </Paper>
                </Grid>
            </Box>
        )
        return legend

    }
    makeWarBoard = (isDesktop: boolean, classes: any) => {
        var legend = (
            <Box>
                <Grid item xs={12}>
                    <Paper className={classes.formControl} style={{ overflow: 'auto' }}>
                        <Typography>War Board.</Typography>
                    </Paper>
                </Grid>
            </Box>
        )
        return legend

    }

    render() {
        const { classes, IsDesktop = true } = this.props;

        var legend = this.makeLegend(IsDesktop, classes)
        var warBoard = this.makeWarBoard(IsDesktop, classes)

        if (IsDesktop) {
            return (
                <Grid container spacing={0}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    className={classes.root}>

                    <Grid container item xs={3}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        className={classes.legend}>
                        {legend}
                    </Grid>
                    <Grid container item alignItems='center' justifyContent="center" xs={8} className={classes.table}>
                        <Paper className={classes.formControl} style={{ maxHeight: '80vh', overflow: 'auto' }}>
                            {warBoard}
                        </Paper>
                    </Grid>
                </Grid>
            )
        }
        else {
            return (
                <Grid container alignItems='flex-start' justifyContent="center"  >
                    <Grid item xs={12}>
                        <PersistentDrawer
                            lLabel="Gathering Nodes"
                            lDisplay={legend}
                            rLabel="Gathering Nodes"
                            rDisplay={legend}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {warBoard}
                    </Grid>
                </Grid>
            )
        }
    }
}

export const withMediaQuery = (queries = []) => Component => props => {
    const mediaProps = {}
    queries.forEach(q => {
        mediaProps[q[0]] = useMediaQuery(q[1])
    })
    return <Component {...mediaProps} {...props} />
}

export default withStyles(styles)(withMediaQuery([
    ['IsDesktop', theme => theme.breakpoints.up('sm'), {
        defaultMatches: true
    }]
])(WarBoard));
