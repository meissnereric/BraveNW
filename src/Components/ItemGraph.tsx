import React from 'react';
import {Sigma, LoadGEXF, RandomizeNodePositions} from 'react-sigma';
import SetNodeColors from './SetNodeColors';
import SigmaSidebar from './SigmaSideBar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
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
const gephiFile = 'data/filtered_recipe_graph_8_21_2021.gexf'
const sigmaStyle = {
    height: 800,
    width: 800,
    maxWidth: 'inherit'
}

type State = {
    adjNodes:any, hasNodes: boolean,
    adjEdges:any, hasEdges: boolean,
    filePath:string
}


// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//   }),
// );

class GraphWrapper extends React.Component <{}, State> {

    constructor(props) {
        super(props)
        this.state = {
            adjNodes: null,
            hasNodes: false,
            adjEdges: null,
            hasEdges: false,
            filePath: "../data/filtered_recipe_graph_8_21_2021.gexf"
        }
        //makes it update this components state when called from outside itself
        this.getAdjNodes = this.getAdjNodes.bind(this) 
        //makes it update this components state when called from outside itself
        this.getAdjEdges = this.getAdjEdges.bind(this) 

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

    render() {
        // const { classes } = this.props;
        return (
            // <div className={classes.root}>
            <div>
            <Grid container spacing={3}>
                <Grid item xs={2}> 
                    <Legend />
                </Grid>
                <Grid item xs={8}>
                    <Sigma
                        settings={sigmaSettings}
                        style={sigmaStyle}
                        >
                        <SetNodeColors path='red' adjNodesGetter={this.getAdjNodes} adjEdgesGetter={this.getAdjEdges} />
                        <LoadGEXF path={this.state.filePath} />
                        <RandomizeNodePositions/>
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


// GraphWrapper.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };
  
// export default withStyles(useStyles)(GraphWrapper);
export default GraphWrapper