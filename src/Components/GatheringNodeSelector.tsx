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
        this.props = props

        this.updateNeighbors()
        this.props.sigma.refresh()
        console.log("Finish componentWillReceiveProps")
    }

    updateNeighbors = function () {
        console.log(["Update neighbors", this.props])
        var nodeId = this.props.selectedGatheringNode

        var res = this._neighbors(this.props.sigma.graph, nodeId, {})
        var toKeepNodes = res[0]
        var toKeepEdges = res[1]

        this.props.adjNodesSetter(toKeepNodes)
        this.props.adjEdgesSetter(toKeepEdges)

        this.setState({ selectedGatheringNode: this.props.selectedGatheringNode })

    }

    _computeProbability = function (luckBonus, maxRoll, nodeProb, existingProb, luckSafe, andOrTuple, uniformProbs) {

        var luck = luckBonus
        var andOr = andOrTuple[0]
        var nextProb = andOrTuple[1]

        // If maxRoll < 100000, just treat the table as luckSafe bc not sure.
        if (maxRoll < 100000 || luckSafe) {
            luck = 0
        }
        console.log(["luckBonus", luckBonus, "maxRoll", maxRoll, "nodeProb", nodeProb, "existingProb", existingProb, "nextProb", nextProb])

        if(andOr == "AND"){
            var newProb = 1. - (nodeProb - luck) / maxRoll
            if(newProb < 0)
                newProb = 0.
            var finalProb = newProb * existingProb
            console.log(["newProb", newProb, "finalProb", finalProb])
    
            return finalProb
        }
        else {
            if(nextProb == nodeProb){ // count for uniform
                if(nextProb in uniformProbs)
                    uniformProbs[nextProb] = uniformProbs[nextProb] + 1
                else
                    uniformProbs[nextProb] = 1
            }
            var p = (nextProb - nodeProb) / maxRoll
            if (p < 0)
                p = 0.
            console.log(["nextProb", nextProb, "nodeProb", nodeProb, "p", p, "existingProb", existingProb])
            return p * existingProb
        }
    }

    _edge_stop_recurse = function(edge, nodeId){
        return edge.target !== nodeId
    }
    _stop_recurse = function(adjNodes, adjEdges) {
        return Object.keys(adjNodes).length === 0 || Object.keys(adjEdges).length === 0
    }

    _computeAdjNodes = function(graph, ogAdjEdges, nodeId){
        var adjNodes = {}
        ogAdjEdges.forEach(element => {
            if (this._edge_stop_recurse(element, nodeId))
                adjNodes[element.target] = graph.nodes(nodeId)
        })
        console.log(["AdjNodes", adjNodes])
        return adjNodes

    }


    _computeAdjEdges = function(graph, ogAdjEdges, nodeId){
        var adjEdges = {}
        ogAdjEdges.forEach(element => {
            if (this._edge_stop_recurse(element, nodeId))
                adjEdges[element.id] = graph.edges(element.id)
        })
        console.log(["AdjEdges", adjEdges])
        return adjEdges

    }

    _neighbors = function (graph, nodeId, existingNodes) {
        existingNodes[nodeId] = graph.nodes(nodeId)
        var ogAdjEdges = graph.adjacentEdges(nodeId)
        var adjNodes = this._computeAdjNodes(graph, ogAdjEdges, nodeId)
        var adjEdges = this._computeAdjEdges(graph, ogAdjEdges, nodeId)
        var nextKeys = []
        var nextProbs = {}
        for (let key in adjEdges) {
            nextKeys.push(key)
        }
        nextKeys.push(-1)
        var i = 0
        for (let key in adjEdges) {
            var nk = nextKeys[i+1]
            var nextProb = adjEdges[nk]
            if(nk === -1)
                nextProbs[key] = 100000 + this.props.luckBonus // TODO hack
            else
                nextProbs[key] = nextProb.attributes.probability
            i = i+1
        }

        // var adjNodes = graph.adjacentNodes(nodeId)
        if (this._stop_recurse(adjNodes, adjEdges)) {
            // short circuit
            console.log("No adjacent edges or nodes! Cutting out!")
        }
        else {
            var tmpNeighbors = Object.assign({}, adjNodes);
            var uniformProbs = {}
            console.log(["props"], this.props)
            console.log(["Adjacency stuff", existingNodes, adjNodes, adjEdges, nodeId, graph, tmpNeighbors, existingNodes])
            for (let key in adjEdges) {
                let element = adjEdges[key];
                 var sourceNode = graph.nodes(element.source)
                var targetNode = graph.nodes(element.target)
                
                if (element.attributes.computedProbability) {
                    console.log(["Already has computed prob", element.attributes.computedProbability])
                }
                else {
                    var existingProbability = 1.
                    var luckSafe = sourceNode.attributes.lucksafe
                    var andOr = sourceNode.attributes.andor
                    var andOrTuple = [andOr, nextProbs[key]]

                    if (!(sourceNode.attributes.computedProbability == undefined))
                        existingProbability = sourceNode.attributes.computedProbability
                    targetNode.attributes.computedProbability = this._computeProbability(this.props.luckBonus, sourceNode.attributes.maxroll, element.attributes.probability, existingProbability, luckSafe, andOrTuple, uniformProbs)
                    element.attributes.computedProbability = targetNode.attributes.computedProbability
                    element.attributes.targetName = targetNode.label
                    if(element.itemType === 'LootTable'){
                        element.attributes.targetName= "[LTID]" + element.attributes.targetName
                    }
                    console.log(["Edge processing / probabilities", element, sourceNode, targetNode])
                }

            };

            for (let key in adjEdges) {
                let edgeElement = adjEdges[key];
                console.log(["51", edgeElement, key])
                let element = graph.nodes(edgeElement.target)
                console.log(["5", element, key, tmpNeighbors, existingNodes, nodeId])
                console.log(["6", edgeElement.source == nodeId , element.attributes.itemtype === 'LootTable' , !(element.id in existingNodes)])
                if (edgeElement.source == nodeId && element.attributes.itemtype === 'LootTable' && !(element.id in existingNodes)) {
                    console.log(["Element", element, existingNodes])
                    var subNeighbors = this._neighbors(graph, element.id, existingNodes)
                    var subNodes = subNeighbors[0]
                    var subEdges = subNeighbors[1]
                    

                    console.log(["Node", subNodes, adjNodes])
                    console.log(["Edges", subEdges, adjEdges])

                    adjNodes = Object.assign({}, subNodes, adjNodes);
                    adjEdges = Object.assign({}, subEdges, adjEdges);
                }
            }
        }
        console.log(["6", adjNodes, adjEdges])
        // var neighbors = []
        // var edges = []
        // for (let key in adjEdges) {
        //     let element = adjEdges[key];
        //     let targetNode = graph.nodes(element.target)
        //     if(!(targetNode.attributes.itemtype == 'LootTable')){
        //         neighbors[targetNode.id] = targetNode
        //         edges[element.id] = element
        //     }
        // }
        // return [neighbors, edges];
        return [adjNodes, adjEdges]
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