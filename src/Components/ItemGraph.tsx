import React from 'react';
import { Sigma, LoadGEXF } from 'react-sigma';
import UpdateNodes from './UpdateNodes';
import SigmaSidebar from './SigmaSideBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Legend from './SigmaLegend';
import PersistentDrawerLeft from './PersistantDrawer';

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

const sigmaStyle = {
    height: 800,
    // width: 800,
    maxWidth: 'inherit',
    'backgroundColor': 'black'
}
const centerStyle = {
    textAlign: "center"
}

type State = {
    adjNodes: any, hasNodes: boolean,
    adjEdges: any, hasEdges: boolean,
    filePath: string,
    shownFilter: any,
    searchText: string
}

class ItemGraph extends React.Component<{}, State> {

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
        return (
            <div>
                <Grid container >
                    <Grid item xs={12}>
                        <PersistentDrawerLeft
                            lLabel="Filters"
                            lDisplay={<Legend updateItemFilters={this.updateItemFilters} updateSearchText={this.updateSearchText} />}
                            rLabel="Selected Item"
                            rDisplay={<SigmaSidebar nodes={this.state.adjNodes} edges={this.state.adjEdges} />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box width="100%">
                        <Sigma
                            settings={sigmaSettings}
                            style={sigmaStyle}
                        >
                            <LoadGEXF path={this.state.filePath}>
                                <UpdateNodes path='red' shownFilter={this.state.shownFilter} searchText={this.state.searchText} adjNodesSetter={this.getAdjNodes} adjEdgesSetter={this.getAdjEdges}>
                                </UpdateNodes>
                            </LoadGEXF>
                        </Sigma>
                        </Box>
                    </Grid>
                </Grid>

            </div>

        )
    }

}

export default ItemGraph
