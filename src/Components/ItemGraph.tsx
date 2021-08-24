import React from 'react';
import {Sigma, LoadGEXF, RandomizeNodePositions} from 'react-sigma';

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

class GraphWrapper extends React.Component {


    render() {
        return (
            <div>
                <Sigma
                    settings={sigmaSettings}
                    style={sigmaStyle}
                    // onClickNode={this.clickNode}
                    // onClickStage={this.clickStage}
                    >
                    <LoadGEXF path="../data/filtered_recipe_graph_8_21_2021.gexf" />
                    <RandomizeNodePositions/>
                </Sigma>
            </div>
        )
    }
  
}


export default GraphWrapper