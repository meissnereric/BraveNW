import React from 'react';
import {Sigma, LoadGEXF} from 'react-sigma';
import UpdateNodes from './UpdateNodes';
import SigmaSidebar from './SigmaSideBar';
import Grid from '@material-ui/core/Grid';

import Legend from './SigmaLegend';


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
const sigmaContainerName = 'sigma-container'
const sigmaStyle = {
    height: 800,
    width: 800,
    maxWidth: 'inherit',
    'background-color': 'black'
}

type State = {
    adjNodes:any, hasNodes: boolean,
    adjEdges:any, hasEdges: boolean,
    filePath:string,
    shownFilter: any
}

class ItemGraph extends React.Component <{}, State> {

    constructor(props) {
        super(props)
        this.state = {
            adjNodes: null,
            hasNodes: false,
            adjEdges: null,
            hasEdges: false,
            filePath: "../data/pretty_graph_8_28_2021.gexf",
            // filePath: "../data/filtered_recipe_graph_8_21_2021.gexf",

            shownFilter: false
        }
        //makes it update this components state when called from outside itself
        this.getAdjNodes = this.getAdjNodes.bind(this) 
        //makes it update this components state when called from outside itself
        this.getAdjEdges = this.getAdjEdges.bind(this) 
        //makes it update this components state when called from outside itself
        this.updateItemFilters = this.updateItemFilters.bind(this) 

    }
    componentDidUpdate(){
        if(this.state.adjNodes != null){
            
        }
    }
    getAdjNodes(toKeepNodes){
        this.setState({adjNodes: toKeepNodes, hasNodes: true})
    }
    getAdjEdges(toKeepEdges){
        this.setState({adjEdges: toKeepEdges, hasEdges: true})
    }
    updateItemFilters(sFilter){
        this.setState({shownFilter: sFilter})
        console.log(["Item graph state shown filter", this.state.shownFilter])
    }

    render() {
        return (
            <div>
            <Grid container spacing={3}>
                <Grid item xs={3}> 
                    <Legend updateItemFilters={this.updateItemFilters}/>
                </Grid>
                <Grid item xs={7}>
                    <Sigma
                        settings={sigmaSettings}
                        style={sigmaStyle}
                        >
                        <LoadGEXF path={this.state.filePath}>
                        </LoadGEXF>
                        <UpdateNodes path='red' shownFilter={this.state.shownFilter} adjNodesGetter={this.getAdjNodes} adjEdgesGetter={this.getAdjEdges}>
                        </UpdateNodes>
                    </Sigma>
                </Grid>
                <Grid item xs={2}>
                    <SigmaSidebar nodes={this.state.adjNodes} edges={this.state.adjEdges}/>
                </Grid>
            </Grid>
            </div>
        )
    }
  
}

export default ItemGraph
