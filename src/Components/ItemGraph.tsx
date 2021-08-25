import React from 'react';
import {Sigma, LoadGEXF, RandomizeNodePositions} from 'react-sigma';
import SetNodeColors from './SetNodeColors';
import SigmaSidebar from './SigmaSideBar';

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
    //labelThreshold: 5
}
const sigmaContainerName = 'sigma-container'
const gephiFile = 'data/filtered_recipe_graph_8_21_2021.gexf'
const sigmaStyle = {
    height: '400px',
    maxWidth: 'inherit'
}
type State = {
    adjNodes:any, hasNodes: boolean
}
class GraphWrapper extends React.Component <{}, State> {
    constructor(props) {
        super(props)
        this.state = {
            adjNodes: null,
            hasNodes: false
        }
        //makes it update this components state when called from outside itself
        this.getAdjNodes = this.getAdjNodes.bind(this) 

    }
    componentDidUpdate(){
        if(this.state.adjNodes != null){
            
        }
    }
    getAdjNodes(toKeep){
        this.setState({adjNodes: toKeep, hasNodes: true})
    }

    render() {
        return (
            <div>
                <Sigma
                    settings={sigmaSettings}
                    style={sigmaStyle}
                    >
                    <SetNodeColors path='red' adjNodesGetter={this.getAdjNodes} />
                    <LoadGEXF path="../data/filtered_recipe_graph_8_21_2021.gexf"  />
                    <RandomizeNodePositions/>
                </Sigma>
                <SigmaSidebar cards={this.state.adjNodes}/>
            </div>
        )
    }
  
}


export default GraphWrapper