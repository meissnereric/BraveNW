import React from 'react'

import sigma from 'react-sigma';

import { initShownFilter } from './FilteringData';

export function embedProps(elements, extraProps) {
    return React.Children.map(elements,
        (element) => React.cloneElement(element, extraProps))
}

type State = {
    loaded: boolean,
    initColors: boolean,
    selectedGatheringNode?: string
    
};

type Props = {
    path: string,
    onGraphLoaded?: () => void,
    children?: any,
    sigma?: sigma
    adjNodesSetter?: any
    adjEdgesSetter?: any
    selectedGatheringNode?: string
    luckBonus?: any
};

class GatheringNodeSelector extends React.PureComponent {
    state: State;
    props: Props;
    onLoad: () => void;


    constructor(props: Props) {
        super(props)
        this.state = { loaded: false, initColors: false }
        this.onLoad = this._onLoad.bind(this)
    }

    componentDidMount() {
        console.info("UpdateNodes componentDidMount", this.props)
        this.props.sigma.refresh()
    }

    componentWillReceiveProps(props: Props) {
        console.info("UpdateNodes componentWillReceiveProps")
        // reload only if path changes
        if (this.props.path !== props.path) {
            this.setState({ loaded: false })
            console.info("UpdateNodes componentWillReceiveProps inner path thing")
        }
        if (this.state.selectedGatheringNode === props.selectedGatheringNode) {
            console.info("UpdateNodes componentWillReceiveProps inner path thing")
            return
        }
        console.info(this.props.sigma)
        this.setState({selectedGatheringNode: props.selectedGatheringNode})

        var nodeId = this.props.selectedGatheringNode

        var res = this._neighbors(this.props.sigma.graph, nodeId, {})
        var toKeepNodes = res[0]
        var toKeepEdges = res[1]

        props.adjNodesSetter(toKeepNodes)
        props.adjEdgesSetter(toKeepEdges)

        this.props.sigma.refresh()
    }

    _computeProbability = function (luckBonus = 0, maxRoll = 100000, nodeProb = 0, existingProb = 1.) {
        var luck = luckBonus
        // If maxRoll < 100000, just treat the table as luckSafe bc not sure.
        if(maxRoll < 100000){
            luck = 0 
        }
        return existingProb
    }
    _neighbors = function (graph, nodeId, existingNodes) {
        // nodeId='oreveinfinishsmall'
        existingNodes[nodeId] = graph.nodes(nodeId)
        var adjNodes = graph.adjacentNodes(nodeId)
        var adjEdges = graph.adjacentEdges(nodeId)
        if (Object.keys(adjNodes).length === 0 || Object.keys(adjEdges).length === 0) {
            // short circuit
        }
        else {
            var tmpNeighbors = Object.assign({}, adjNodes);
            console.log(["Adjacency stuff", existingNodes, adjNodes, adjEdges, nodeId, graph, tmpNeighbors, existingNodes])
            adjEdges.forEach(element => {
                console.log(["0"])
                if (element.attributes.computedProbability) {

                    console.log(element.attributes.computedProbability)
                }
                else {
                    var sourceNode = graph.nodes(element.source)
                    console.log(["1"])

                    var existingProbability = 1.
                    console.log(["2"])
                    existingProbability = sourceNode.attributes.probability
                    console.log(["3"])
                    element.attributes.computedProbability = this._computeProbability(this.props.luckBonus, sourceNode.attributes.maxRoll, element.attributes.probability, existingProbability)
                    console.log(["Edge processing / probabilities", element, sourceNode])
                }

            });
            for (let key in tmpNeighbors) {
                console.log(["4"])
                let element = tmpNeighbors[key];
                console.log(["5"])
                if (element.itemType === 'LootTable' && !(element.id in existingNodes)) {
                    console.log(["Element", element, existingNodes])
                    var subNeighbors = this._neighbors(graph, element.id, existingNodes)
                    var subNodes = subNeighbors[0]
                    var subEdges = subNeighbors[1]

                    adjNodes = Object.assign({}, subNodes, adjNodes);
                    adjEdges = Object.assign({}, subEdges, adjEdges);
                }
            }
        }
        console.log(["6"])
        var neighbors = []
        adjNodes.forEach(element => {
            neighbors[element.id] = element
        });

        var edges = []
        adjEdges.forEach(element => {
            edges[element.id] = element
        });
        console.log(["7"])

        return [neighbors, edges];
    };

    _onLoad() {
        if (this.props.sigma)
            this.props.sigma.refresh()
        this.setState({ loaded: true })
        if (this.props.onGraphLoaded)
            return this.props.onGraphLoaded()
    }

    render() {
        if (!this.state.loaded) {
            console.warn("State not loaded in render in UpdateNodes.")
            return null
        }
        return <div>{embedProps(this.props.children, { sigma: this.props.sigma })}</div>
    }

}

export default GatheringNodeSelector;