import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import Theming from './Theming';
import MobileSwitch from './MobileSwitch';
import { GRAPH_PATH } from './GraphConfig';


const styles = theme => ({
    root: {
        display: 'flex',
        background: Theming.theme.palette.secondary.main
    },

    legend: {
        background: Theming.theme.palette.secondary.main
    },

    graphouter: {
        background: Theming.theme.palette.primary.dark,

    },

    sidebar: {
        background: Theming.theme.palette.secondary.main,
    }
  });

type State = {
    adjNodes: any, hasNodes: boolean,
    adjEdges: any, hasEdges: boolean,
    filePath: string,
    shownFilter: any,
    searchText: string
}

type Props = {
    classes: any
}

class ItemGraph extends React.Component <Props, State> {

    constructor(props) {
        super(props)
        this.state = {
            adjNodes: null,
            hasNodes: false,
            adjEdges: null,
            hasEdges: false,
            filePath: GRAPH_PATH,
            shownFilter: false,
            searchText: ""
        }
        //makes it update this components state when called from outside itself
        this.getAdjNodes = this.getAdjNodes.bind(this)
        //makes it update this components state when called from outside itself
        this.getAdjEdges = this.getAdjEdges.bind(this)
        //makes it update this components state when called from outside itself
        this.updateItemFilters = this.updateItemFilters.bind(this)
        //makes it update this components state when called from outside itself
        this.updateSearchText = this.updateSearchText.bind(this)

    }

    getAdjNodes(toKeepNodes) {
        this.setState({ adjNodes: toKeepNodes, hasNodes: true })
    }
    getAdjEdges(toKeepEdges) {
        this.setState({ adjEdges: toKeepEdges, hasEdges: true })
    }
    updateItemFilters(sFilter) {
        this.setState({ shownFilter: sFilter }, () => this.forceUpdate())
    }
    updateSearchText(sText) {
        this.setState({ searchText: sText }, () => this.forceUpdate())
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid  container className={classes.root}  spacing={3}
            justifyContent="flex-start"
            alignItems="center">
                <MobileSwitch updateItemFilters={this.updateItemFilters} updateSearchText={this.updateSearchText} 
                              filePath={this.state.filePath} getAdjNodes={this.getAdjNodes} getAdjEdges={this.getAdjEdges}
                              adjNodes={this.state.adjNodes} adjEdges={this.state.adjEdges}
                              shownFilter={this.state.shownFilter} searchText={this.state.searchText}></MobileSwitch>
            </Grid>

        )
    }

}


export default withStyles(styles)(ItemGraph)
