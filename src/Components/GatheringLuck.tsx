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

class GatheringLuck extends React.Component<Props, State> {
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



    makeFilterList = (classes, filterType) => {
        var makeGRow = (row) => {
            return <FormControlLabel
                style={{ backgroundColor: row.colorHex, color: 'white', margin: 2, padding: 5 }} // , textAlign: 'left' 
                labelPlacement='end' className={classes.input} value={row.nodeId} control={<Radio />} label={row.nodeName} />
        }
        console.log(["Rows", filterType, gatheringSplitRows])

        return <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
                aria-label="gatheringNode"
                defaultValue="oreveinfinishsmall"
                name="gathering-nodes-radio-group"
                onChange={this.handleRadioChange}
                value={this.state.selectedGatheringNode}
            >

                <FormLabel className={classes.head} component="legend"><Typography align='left' variant='h3' className={classes.head}>Gathering Nodes</Typography></FormLabel>

                {/* <Accordion className={classes.formControl}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Mining</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    </AccordionDetails>
                </Accordion> */}
                {gatheringSplitRows.mining.map((row) => makeGRow(row))}
                {gatheringSplitRows.logging.map((row) => makeGRow(row))}
                {gatheringSplitRows.harvesting.map((row) => makeGRow(row))}
            </RadioGroup>
        </FormControl>
    }

    makeRows = (classes, adjEdges) => {
        var rows = []
        for (let key in adjEdges) {
            let edge = adjEdges[key];
            rows.push(<TableRow className={classes.input}>{this.makeRow(classes, edge)}</TableRow>)
        };
        return rows

    }

    makeRow = (classes, edge) => {
        var cells = []
        cells.push(<TableCell className={classes.input}>{titleCase(edge.attributes.targetName)}</TableCell>)
        cells.push(<TableCell className={classes.input} align="center">{edge.attributes.quantitylow}-{edge.attributes.quantityhigh}</TableCell>)
        cells.push(<TableCell className={classes.input} align="center">{(edge.attributes.computedProbability * 100).toFixed(2)}%</TableCell>)
        return cells

    }

    makeLegend = (isDesktop: boolean, classes: any, graphReactObject: Object) => {
        var legend = (
            <Box>
                <Grid item xs={12}>
                    <Paper className={classes.formControl} style={{ maxHeight: '80vh', overflow: 'auto' }}>
                        {this.makeFilterList(classes, 'Mining')}
                    </Paper>
                </Grid>
                <Grid item>
                    {graphReactObject}
                </Grid>
            </Box>
        )
        return legend

    }
    makeTable = (isDesktop: boolean, classes: any) => {
        var tableClass = classes.table
        if(!isDesktop)
            tableClass = classes.mobileTable
        var table = (
            <Box>
                <Grid item xs={12} alignItems='center' justifyContent="center">
                    <Typography variant='h3' className={classes.tableHeading} >Probability of Items</Typography>
                    <Typography variant='h3' className={classes.tableHeading} >{gatheringLabelsMap[this.state.selectedGatheringNode]}</Typography>

                </Grid>
                <Grid item alignItems='center' justifyContent="center">
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table className={tableClass} size="small" aria-label="gathering table" style={{}}>
                            <TableHead className={classes.head}>
                                <TableRow>
                                    <TableCell align="center" className={classes.input}>Item</TableCell>
                                    <TableCell align="center" className={classes.input}>Quantity</TableCell>
                                    <TableCell align="center" className={classes.input}>Chance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.makeRows(classes, this.state.adjEdges)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Box >
        )
        return table

    }
    makeLuckBox = (isDesktop: boolean, classes: any) => {
        var luckBox = (
            <Grid container item justifyContent="space-evenly" alignItems='flex-start' style={{ padding: '10px' }} spacing={1}>
                <Grid item xs={12}>
                    <Typography variant='h3' className={classes.tableHeading} >Luck Bonuses</Typography>
                    
                    <Typography variant='h4'>Maths References</Typography>
                    <Typography variant='body1' className={classes.highlightBox}>1% Luck on item = 100 Luck</Typography>
                    <Typography variant='body1' className={classes.highlightBox}><a href='https://github.com/meissnereric/BraveNW/blob/master/src/Components/GatheringNodeSelector.tsx#L103'>This</a> is the math in the code if you're interested.</Typography>
                    <Typography variant='body1' className={classes.highlightBox}><a href='https://colab.research.google.com/drive/1HHu04Z-DTrw0FPl3BDhGLLAY1Ys9Q0mK#scrollTo=fVoQM8xGWoXx'>This</a> is a notebook I wrote a while ago with reasoning for the maths.</Typography>
                    
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h4'>Total Luck Bonus: <i>{this.state.luckBonus}</i></Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Armor</Typography>
                    <Typography>0-2500</Typography>
                    <TextField id="armorLuck"
                        variant="filled" color="secondary"
                        defaultValue={0}
                        onChange={this.handleLuckBonusChange}
                        onBlurCapture={this.handleLuckBonusChange}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.handleLuckBonusChange(ev)
                            }
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography>Amulet</Typography>
                    <Typography>0-955</Typography>
                    <TextField id="amuletLuck"
                        variant="filled" color="secondary"
                        defaultValue={0}
                        onChange={this.handleLuckBonusChange}
                        onBlurCapture={this.handleLuckBonusChange}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.handleLuckBonusChange(ev)
                            }
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography>Housing</Typography>
                    <Typography>0-4500</Typography>
                    <TextField id="housingLuck"
                        variant="filled" color="secondary"
                        defaultValue={0}
                        onChange={this.handleLuckBonusChange}
                        onBlurCapture={this.handleLuckBonusChange}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.handleLuckBonusChange(ev)
                            }
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography>Skill Level</Typography>
                    <Typography>0-2000</Typography>
                    <TextField id="skillLuck"
                        variant="filled" color="secondary"
                        defaultValue={0}
                        onChange={this.handleLuckBonusChange}
                        onBlurCapture={this.handleLuckBonusChange}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.handleLuckBonusChange(ev)
                            }
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography>Tool</Typography>
                    <Typography>0-927</Typography>
                    <TextField id="toolLuck"
                        variant="filled" color="secondary"
                        defaultValue={0}
                        onChange={this.handleLuckBonusChange}
                        onBlurCapture={this.handleLuckBonusChange}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.handleLuckBonusChange(ev)
                            }
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography>Food</Typography>
                    <Typography>0-2000</Typography>
                    <TextField id="foodLuck"
                        variant="filled" color="secondary"
                        defaultValue={0}
                        onChange={this.handleLuckBonusChange}
                        onBlurCapture={this.handleLuckBonusChange}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.handleLuckBonusChange(ev)
                            }
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography>Settlement Project</Typography>
                    <Typography>0-500</Typography>
                    <TextField id="settlementLuck"
                        variant="filled" color="secondary"
                        defaultValue={0}
                        onChange={this.handleLuckBonusChange}
                        onBlurCapture={this.handleLuckBonusChange}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.handleLuckBonusChange(ev)
                            }
                        }}
                        InputProps={{
                            className: classes.input,
                        }}
                    />
                </Grid>
            </Grid>
        )
        return luckBox

    }


    render() {
        const { classes, IsDesktop = true } = this.props;
        console.log("Render IsDesktop", IsDesktop)

        var graphReactObject = (
            <GatheringNetwork setAdjNodes={this.getAdjNodes} setAdjEdges={this.getAdjEdges}
                selectedGatheringNode={this.state.selectedGatheringNode} luckBonus={this.state.luckBonus}></GatheringNetwork>
        )
        var legend = this.makeLegend(IsDesktop, classes, graphReactObject)
        var table = this.makeTable(IsDesktop, classes)
        var luckBox = this.makeLuckBox(IsDesktop, classes)

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
                    <Grid container item alignItems='center' justifyContent="center" xs={6} className={classes.table}>
                        <Paper className={classes.formControl} style={{ maxHeight: '80vh', overflow: 'auto' }}>
                            {table}
                        </Paper>
                    </Grid>
                    <Grid container item xs={2} className={classes.luckBox}>
                        {luckBox}
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
                            rLabel="Luck Bonuses"
                            rDisplay={luckBox}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {table}
                    </Grid>
                </Grid>
            )
        }
    }
}

export const withMediaQuery = (queries = []) => Component => props => {
    const mediaProps = {}
    queries.forEach(q => {
        console.log("media shit", q)
        mediaProps[q[0]] = useMediaQuery(q[1])
        console.log("media shit2", mediaProps)
    })
    return <Component {...mediaProps} {...props} />
}

export default withStyles(styles)(withMediaQuery([
    ['IsDesktop', theme => theme.breakpoints.up('sm'), {
        defaultMatches: true
    }]
])(GatheringLuck));
