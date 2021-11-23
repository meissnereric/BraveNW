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
// import { ser, gatheringLabelsMap } from './FilteringData';
import { serversSplitRows } from './WarBoardData';
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
    character: {
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.dark,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    formControl: {
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    serverFormControl: {
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
    selectedServer: string,
    selectedFaction: string,
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
            selectedServer: "Xibalba",
            selectedFaction: "Covenant",
            luckBonus: 0,
            luckBonuses: initLucks,
            firstLoad: true
        }
        this.getAdjNodes = this.getAdjNodes.bind(this)
        this.getAdjEdges = this.getAdjEdges.bind(this)
        this.updateSelectedServer = this.updateSelectedServer.bind(this)
        this.updateSelectedFaction = this.updateSelectedFaction.bind(this)
        this.updateLuckBonus = this.updateLuckBonus.bind(this)
        this.updateLuckBonuses = this.updateLuckBonuses.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)

    }

    getAdjNodes(toKeepNodes) {
        this.setState({ adjNodes: toKeepNodes })
    }
    getAdjEdges(toKeepEdges) {
        this.setState({ adjEdges: toKeepEdges })
    }
    updateSelectedServer(server) {
        this.setState({ selectedServer: server }, () => { console.log("Done server update"); this.forceUpdate(); })
    }
    updateSelectedFaction(faction) {
        this.setState({ selectedFaction: faction }, () => { console.log("Done faction update"); this.forceUpdate(); })
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
        this.updateSelectedServer(event.target.value)
        console.log(["Selected server", event.target.value, this.state.selectedServer])
    }


    handleFactionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.updateSelectedFaction(event.target.value)
        console.log(["Selected faction", event.target.value, this.state.selectedFaction])
    }

    makeServerAccordian = (classes, region) => {
        var makeGRow = (row) => {
            return <FormControlLabel
                style={{ backgroundColor: row.colorHex, color: 'white', margin: 2, padding: 5 }} // , textAlign: 'left' 
                labelPlacement='end' className={classes.input} value={row.server} control={<Radio />} label={row.server} />
        }

        let defaultValue = ''
        let title = ''
        if (region == 'uswest') {
            defaultValue = 'Xibalba'
            title = 'US West'
        }
        else if (region == 'useast') {
            defaultValue = 'Xibalba'
            title = 'US East'
        }
        else if (region == 'eucentral') {
            defaultValue = 'Xibalba'
            title = 'EU Central'
        }
        else if (region == 'apsoutheast') {
            defaultValue = 'Xibalba'
            title = 'AP Southeast'
        }
        else if (region == 'saeast') {
            defaultValue = 'Xibalba'
            title = 'SA East'
        }

        let groupName = "servers-" + region + "-radio-group"
        return <Accordion className={classes.formControl}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup
                        aria-label="servers"
                        defaultValue={defaultValue}
                        name={groupName}
                        onChange={this.handleRadioChange}
                        value={this.state.selectedServer}
                    >

                        {/* <FormLabel className={classes.head} component="legend"><Typography align='left' variant='h3' className={classes.head}>{title}</Typography></FormLabel> */}
                        {serversSplitRows[region].map((row) => makeGRow(row))}
                    </RadioGroup>
                </FormControl>
            </AccordionDetails>
        </Accordion>

    }

    makeServerList = (classes) => {
        return <Accordion className={classes.serverFormControl}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Servers</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid>
                    <Grid item> {this.makeServerAccordian(classes, 'uswest')}</Grid>
                    {this.makeServerAccordian(classes, 'useast')}
                    {this.makeServerAccordian(classes, 'eucentral')}
                    {this.makeServerAccordian(classes, 'apsoutheast')}
                    {this.makeServerAccordian(classes, 'saeast')}
                </Grid>
            </AccordionDetails>
        </Accordion>
    }

    makeFactions = (classes) => {
        return <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
                aria-label="servers"
                defaultValue="Covenant"
                name="factions-radio-group"
                onChange={this.handleFactionChange}
                value={this.state.selectedFaction}
            >

                <FormLabel className={classes.head} component="legend">
                    <Typography align='left' variant='h3' className={classes.head}>Faction</Typography>
                </FormLabel>
                <FormControlLabel
                    style={{ backgroundColor: "orange   ", color: 'white', margin: 2, padding: 5 }} // , textAlign: 'left' 
                    labelPlacement='end' className={classes.input}
                    value="Covenant" control={<Radio />} label="Covenant" />
                <FormControlLabel
                    style={{ backgroundColor: "green", color: 'white', margin: 2, padding: 5 }} // , textAlign: 'left' 
                    labelPlacement='end' className={classes.input}
                    value="Marauders" control={<Radio />} label="Marauders" />
                <FormControlLabel
                    style={{ backgroundColor: "purple", color: 'white', margin: 2, padding: 5 }} // , textAlign: 'left' 
                    labelPlacement='end' className={classes.input}
                    value="Syndicate" control={<Radio />} label="Syndicate" />
            </RadioGroup>
        </FormControl>
    }

    displayUsers = (classes, characters) => {
        var makeCharacterLegendRow = (character) => {
            return <Box>
                <Typography className={classes.character}>{character.name}</Typography>
            </Box>
        }
        let serverChars = characters[this.state.selectedServer]
        let factionChars = serverChars[this.state.selectedFaction]
        console.log(this.state.selectedServer, this.state.selectedFaction)
        console.log(characters, serverChars, factionChars)
        let characterRows = factionChars["characters"].map((row) => makeCharacterLegendRow(row))
        return (characterRows
        )
    }

    makeLegend = (isDesktop: boolean, classes: any, characters: any) => {
        var legend = (
            <Box>
                <Grid item xs={12}>
                    <Paper className={classes.formControl} style={{ overflow: 'auto' }}>
                        {this.makeServerList(classes)}
                        {this.makeFactions(classes)}
                        {this.displayUsers(classes, characters)}
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
        let characters = {
            "Xibalba":
            {
                "Covenant":
                    { "characters": [{ name: "Xibalba Yellow Gertrude" }] },
                "Marauders":
                    { "characters": [{ name: "Xibalba Green Getrude" }] },
                "Syndicate":
                    { "characters": [{ name: "Xibalba Purple Getrude" }] },
            },
            "Orofena":
            {
                "Covenant":
                    { "characters": [{ name: "Orofena Yellow Gertrude" }] },
                "Marauders":
                    { "characters": [{ name: "Orofena Green Getrude" }] },
                "Syndicate":
                    { "characters": [{ name: "Orofena Purple Getrude" }] },
            }
        }

        var legend = this.makeLegend(IsDesktop, classes, characters)
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
