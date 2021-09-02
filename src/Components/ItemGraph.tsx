import React from 'react';
import {Sigma, LoadGEXF} from 'react-sigma';
import UpdateNodes from './UpdateNodes';
import SigmaSidebar from './SigmaSideBar';
import Grid from '@material-ui/core/Grid';
import { withStyles, useTheme } from '@material-ui/styles';

import Theming from './Theming';
import Legend from './SigmaLegend';


const styles = theme => ({
    root: {
        height: '100%',
        display: 'flex',
    },

    legend: {
        background: Theming.theme.palette.secondary.main,
    },

    graphouter: {
        background: Theming.theme.palette.primary.dark,

    },

    sidebar: {
        background: Theming.theme.palette.secondary.main,
    }
  });



var sigmaSettings = {
    batchEdgesDrawing: true,
    defaultNodeColor: '#ec5148',
    defaultLabelColor: '#ffffff',
    defaultLabelSize: 8,
    hoverFontStyle: 'text-size: 11',
    drawEdgeLabels: false,
    drawEdges: true,
    edgeColor: 'target',
    nodesPowRatio: 0.2,
    edgesPowRatio: 0.2,
    labelThreshold: 12
}


type State = {
    adjNodes:any, hasNodes: boolean,
    adjEdges:any, hasEdges: boolean,
    filePath:string,
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
            filePath: "../data/pretty_graph_smaller_8_28_2021.gexf",
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

    getAdjNodes(toKeepNodes){
        this.setState({adjNodes: toKeepNodes, hasNodes: true})
    }
    getAdjEdges(toKeepEdges){
        this.setState({adjEdges: toKeepEdges, hasEdges: true})
    }
    updateItemFilters(sFilter){
        this.setState({shownFilter: sFilter}, () => this.forceUpdate())
    }
    updateSearchText(sText){
        this.setState({searchText: sText}, () => this.forceUpdate())
    }

    render() {
        const { classes } = this.props;
        const theme = Theming.theme

        const sigmaStyle = {
            height: '580px',
            // display: 'flex',
            'backgroundColor': theme.palette.primary.main
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={3} alignItems='stretch'>
                    <Grid item xs={12} md={3} className={classes.legend} color='primary'> 
                        <Legend updateItemFilters={this.updateItemFilters} updateSearchText={this.updateSearchText}/>
                    </Grid>
                    <Grid item xs={12} md={7} className={classes.graphouter}>
                        <Sigma
                            settings={sigmaSettings}
                            style={sigmaStyle}
                            >
                            <LoadGEXF path={this.state.filePath}>
                                <UpdateNodes path='red' shownFilter={this.state.shownFilter}
                                 searchText={this.state.searchText}
                                 adjNodesSetter={this.getAdjNodes} 
                                 adjEdgesSetter={this.getAdjEdges}>
                                </UpdateNodes>
                            </LoadGEXF>
                        </Sigma>
                    </Grid>
                    <Grid item xs={12} md={2} className={classes.sidebar}>
                        <SigmaSidebar nodes={this.state.adjNodes} edges={this.state.adjEdges}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
  
}


export default withStyles(styles)(ItemGraph)
