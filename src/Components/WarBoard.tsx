import React from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Grid, Typography, Box, Accordion, AccordionSummary, AccordionDetails, useMediaQuery, GridSize } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Paper from '@material-ui/core/Paper';
import { serversSplitRows, defaultWarBoard, testCharacters, testCompanies } from './WarBoardData';
import PersistentDrawer from './PersistentDrawer';
import { ExpandMore } from '@material-ui/icons';
import { TextField } from '@material-ui/core';

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
    head: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.contrastText,
    },
    charactersBox: {
        minWidth: '100%',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.dark,
        // topMargin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    characterBox: {
        minWidth: '93%',
        backgroundColor: theme.palette.secondary.main,
    },
    characterName: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(1)
    },
    role: {
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(1),
    },
    company: {
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(1),
    },
    warBoardCharacterBox: {
        minWidth: '93%',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.dark,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    warRowPaper: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main
    },
    warGroupPaper: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light
    },
    warBoardTitle: {
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.dark,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    warBoardBacking: {
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    factionsBox: {
        minWidth: '93%',
        borderRadius: '1',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.light,
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
    }

});

type State = {
    selectedServer: string,
    selectedFaction: string,
    warBoardConfiguration: any,
}

type Props = {
    classes: any,
    IsDesktop: boolean
}

class WarBoard extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            selectedServer: "Orofena",
            selectedFaction: "Syndicate",
            warBoardConfiguration: defaultWarBoard,
        }
        this.updateSelectedServer = this.updateSelectedServer.bind(this)
        this.updateSelectedFaction = this.updateSelectedFaction.bind(this)
        this.updateWarBoard = this.updateWarBoard.bind(this)
    }

    updateSelectedServer(server) {
        this.setState({ selectedServer: server }, () => { console.log("Done server update"); this.forceUpdate(); })
    }
    updateSelectedFaction(faction) {
        this.setState({ selectedFaction: faction }, () => { console.log("Done faction update"); this.forceUpdate(); })
    }
    updateWarBoard(wb) {
        this.setState({ warBoardConfiguration: wb }, () => { console.log("Done war board updating", wb); })
    }


    handleWarBoardChange = (event: any) => {
        var warBoardEntry = event.target.value
        var warBoardSlot = event.target.id
        console.log('wbentry', warBoardEntry)
        console.log('wbSlot', warBoardSlot)
        var i = warBoardSlot[3]
        var j = warBoardSlot[4]
        var k = warBoardSlot[5]
        console.log('ijk', i,j,k)

        var cp = [ ...this.state.warBoardConfiguration ]
        console.log("Cp before", cp)
        cp[i][j][k] = {"name": warBoardEntry}
        console.log("Cp after ", cp)
        this.updateWarBoard(cp)
    }


    handleServerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            defaultValue = 'Orofena'
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
                        onChange={this.handleServerChange}
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

        return <FormControl component="fieldset" className={classes.factionsBox}>
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

    displayUsers = (classes, characters, companies) => {
        var makeCharacterLegendRow = (character) => {
            return <Grid container className={classes.charactersBox}>
                <Box className={classes.characterBox}>
                    <Grid item className={classes.role}>
                        {character.role}
                    </Grid>
                    <Grid item>
                        <Typography className={classes.characterName}>
                            {character.name}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.company}>
                        {companies[character.company].abbreviation}
                    </Grid>
                </Box>
            </Grid>
        }
        let serverChars = characters[this.state.selectedServer]
        let factionChars = serverChars[this.state.selectedFaction]
        console.log(this.state.selectedServer, this.state.selectedFaction)
        console.log(characters, serverChars, factionChars)
        let characterRows = factionChars["characters"].map((row) => makeCharacterLegendRow(row))
        return (characterRows)
    }

    makeLegend = (isDesktop: boolean, classes: any, characters: any, companies: any) => {
        var legend = (
            <Box>
                <Grid item xs={12}>
                    <Paper className={classes.warBoardTitle} style={{ overflow: 'auto' }}>
                        {this.makeServerList(classes)}
                        {this.makeFactions(classes)}
                        {this.displayUsers(classes, characters, companies)}
                    </Paper>
                </Grid>
            </Box>
        )
        return legend

    }

    makeWarBoxes = (classes: any) => {
        let wbConfig = this.state.warBoardConfiguration
        let handleWBConfigChange = this.handleWarBoardChange
        console.log("Warboard default", wbConfig)
        return (
            // Outer Grid for entire war board - 1 of these
            <Grid container item spacing={1}
                justifyContent="space-evenly"
                alignItems="center"
                direction='column'
                style={{ padding: '10px' }}
                className={classes.root}>
                {wbConfig.map(function (row, i) {
                    // return <Grid item>
                    // Row Container - 2 of these 
                    return <Grid container item
                        spacing={1}
                        justifyContent="space-evenly"
                        alignItems="center"
                        direction='row'
                        className={classes.warRowPaper}>

                        {/* War Group Grid - 5 of these in each row */}
                        {row.map(function (column, j) {
                            return <Grid container item xs={2} direction='column'
                                className={classes.warGroupPaper}>
                                <Grid item xs={2} className={classes.warBoardCharacterBox}>
                                    <Typography variant='h3'> Group {j + 1}</Typography>
                                </Grid>
                                {column.map(function (groupSlot, k) {

                                    {/* Character slot inside a war group - 5 of these in each war group */ }
                                    return <Grid item xs={2} className={classes.warBoardCharacterBox}>
                                        {/* <Typography>{wbConfig[i][j][k].name}</Typography> */}

                                        <TextField id={"wb-" + i + j + k}
                                            variant="filled" color="secondary"
                                            defaultValue={wbConfig[i][j][k].name}
                                            // onChange={handleWBConfigChange}
                                            onBlurCapture={handleWBConfigChange}
                                            onKeyPress={(ev) => {
                                                if (ev.key === 'Enter') {
                                                    handleWBConfigChange(ev)
                                                }
                                            }}
                                            InputProps={{
                                                className: classes.input,
                                            }}
                                        />
                                    </Grid>
                                })}
                            </Grid>
                        })}
                    </Grid>
                })}
            </Grid>
        )

    }

    makeWarBoard = (isDesktop: boolean, classes: any) => {
        let warBoxes = this.makeWarBoxes(classes)
        var warBoard = (
            <Box>
                <Grid item xs={12}>
                    <Grid>
                        <Paper className={classes.warBoardTitle} style={{ overflow: 'auto' }}>

                        <TextField id={"warboard-title"}
                                            variant="filled" color="secondary"
                                            defaultValue={"War Board - Default War"}
                                            // onChange={handleWBConfigChange}
                                            // onBlurCapture={handleWBConfigChange}
                                            // onKeyPress={(ev) => {
                                            //     if (ev.key === 'Enter') {
                                            //         handleWBConfigChange(ev)
                                            //     }
                                            // }}
                                            InputProps={{
                                                className: classes.input,
                                            }}
                                        />
                            <Typography variant='h4'>Cutlass Keys War - Black Powder Trading Company - 11/26/2021</Typography>
                        </Paper>
                    </Grid>
                    <Grid>
                        <Paper className={classes.warBoardBacking} style={{ overflow: 'auto' }}>
                            {warBoxes}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        )
        return warBoard

    }

    render() {
        const { classes, IsDesktop = true } = this.props;

        let characters = testCharacters
        let companies = testCompanies

        var legend = this.makeLegend(IsDesktop, classes, characters, companies)
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
