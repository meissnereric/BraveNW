import React from 'react'

import sigma from 'react-sigma';

export function embedProps(elements, extraProps) {
    return React.Children.map(elements,
        (element) => React.cloneElement(element, extraProps))
}

type State = {
    loaded: boolean,
    initColors: boolean,
    selectedGatheringNode?: string,
    luckBonus?: any,
    toKeepNodes: any,
    toKeepEdges: any
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
        this.state = { loaded: false, initColors: false, toKeepNodes: {}, toKeepEdges: {} }
        this.onLoad = this._onLoad.bind(this)
    }

    componentDidMount() {
        console.info("GatheringNodeSelector componentDidMount", this.props)
        this.updateNeighbors()
        this.props.sigma.refresh()
        console.log("Finish componentDidMount")
    }

    componentWillReceiveProps(props: Props) {
        console.info("UpdateNodes componentWillReceiveProps", props)
        // reload only if path changes
        if (this.props.path !== props.path) {
            this.setState({ loaded: false })
            console.info("UpdateNodes componentWillReceiveProps inner path thing")
        }
        if (this.state.selectedGatheringNode === props.selectedGatheringNode && this.state.luckBonus === props.luckBonus) {
            console.info("UpdateNodes componentWillReceiveProps inner path thing")
            return
        }
        this.props = props

        this.updateNeighbors()
        this.props.sigma.refresh()
        console.log("Finish componentWillReceiveProps")
    }

    _resetComputedProbs = function(nodes, edges) {
        console.log("Reset", nodes, edges)
        for (let key in nodes) {
            let element = nodes[key];
            element.attributes.computedProbability = undefined
        }
        for (let key in edges) {
            let element = edges[key];
            element.attributes.computedProbability = undefined
        }
    }

    updateNeighbors = function () {
        console.log(["Update neighbors", this.props])
        var nodeId = this.props.selectedGatheringNode
        this._resetComputedProbs(this.state.toKeepNodes, this.state.toKeepEdges)

        var res = this._neighbors(this.props.sigma.graph, nodeId, {})
        var toKeepNodes = res[0]
        var toKeepEdges = res[1]
        this.setState({toKeepNodes: toKeepNodes})
        this.setState({toKeepEdges: toKeepEdges})


        this.props.adjNodesSetter(toKeepNodes)
        this.props.adjEdgesSetter(toKeepEdges)

        this.setState({ selectedGatheringNode: this.props.selectedGatheringNode })
        this.setState({ luckBonus: this.props.luckBonus })

    }

    _computeProbability = function (key, nextKeys, luckBonus, maxRoll, nodeProb, existingProb, luckSafe, andOr, nextProbs, uniformProbs) {
        var luck = luckBonus
        var nextProb = nextProbs[key]

        // If maxRoll < 100000, just treat the table as luckSafe bc not sure.
        if (maxRoll < 100000 || luckSafe) {
            luck = 0
        }
        if(andOr === "AND"){
            var newProb = 1. - (nodeProb - luck) / maxRoll
            if(newProb < 0)
                newProb = 0.
            if(newProb > 1.)
                newProb = 1.
            var finalProb = newProb * existingProb
    
            return finalProb
        }
        else {
            while(nodeProb === nextProb[0] && (nextProb[0] !== maxRoll+luck)){
                var np1 = nextProb[1]
                var nk = nextKeys[np1]
                nextProb = nextProbs[nk]
            }

            var np = nodeProb
            var nextp = nextProb[0]
            if(np < luckBonus)
                np = luckBonus
            var p = (nextp - np) / maxRoll / uniformProbs[nodeProb]
            if (p < 0)
                p = 0
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
        return adjNodes

    }


    _computeAdjEdges = function(graph, ogAdjEdges, nodeId){
        var adjEdges = {}
        ogAdjEdges.forEach(element => {
            if (this._edge_stop_recurse(element, nodeId))
                adjEdges[element.id] = graph.edges(element.id)
        })
        return adjEdges

    }

    _neighbors = function (graph, nodeId, existingNodes) {
        existingNodes[nodeId] = graph.nodes(nodeId)
        var ogAdjEdges = graph.adjacentEdges(nodeId)
        var adjNodes = this._computeAdjNodes(graph, ogAdjEdges, nodeId)
        var adjEdges = this._computeAdjEdges(graph, ogAdjEdges, nodeId)
        var nextKeys = []
        var nextProbs = {}
        console.log("Adj nodes", adjNodes)
        console.log("Adj edges", adjEdges)
        for (let key in adjEdges) {
            nextKeys.push(key)
        }
        nextKeys.push(-1)
        var i = 0
        var uniformProbs = {}
        for (let key in adjEdges) {
            var nk = nextKeys[i+1]
            var nextProb = adjEdges[nk]
            var nodeProb = adjEdges[nextKeys[i]].attributes.probability
            if(nk === -1)
                nextProbs[key] = [100000 + this.props.luckBonus, i+1] // TODO hack, breaks if not 100000???
            else
                nextProbs[key] = [nextProb.attributes.probability, i+1]

            if(nodeProb in uniformProbs)
                uniformProbs[nodeProb] = uniformProbs[nodeProb] + 1
            else
                uniformProbs[nodeProb] = 1
            i = i+1
        }

        if (this._stop_recurse(adjNodes, adjEdges)) {
            // short circuit
            console.log("No adjacent edges or nodes! Cutting out!")
        }
        else {
            for (let key in adjEdges) {
                let element = adjEdges[key];
                // console.log(key, element)
                 var sourceNode = graph.nodes(element.source)
                var targetNode = graph.nodes(element.target)
                
                if (element.attributes.computedProbability) {
                    // console.log(["Already has computed prob", element.attributes.computedProbability])
                }
                else {
                    var existingProbability = 1.
                    var luckSafe = sourceNode.attributes.lucksafe
                    var andOr = sourceNode.attributes.andor
                    if (!(sourceNode.attributes.computedProbability === undefined))
                        existingProbability = sourceNode.attributes.computedProbability
                    targetNode.attributes.computedProbability = this._computeProbability(key, nextKeys, this.props.luckBonus, sourceNode.attributes.maxroll, element.attributes.probability, existingProbability, luckSafe, andOr, nextProbs, uniformProbs)
                    element.attributes.computedProbability = targetNode.attributes.computedProbability
                    element.attributes.targetName = targetNode.label
                    if(element.itemType === 'LootTable'){
                        element.attributes.targetName= "[LTID]" + element.attributes.targetName
                    }
                }

            };

            for (let key in adjEdges) {
                let edgeElement = adjEdges[key];
                let element = graph.nodes(edgeElement.target)
                if (edgeElement.source === nodeId && element.attributes.itemtype === 'LootTable' && !(element.id in existingNodes)) {
                    var subNeighbors = this._neighbors(graph, element.id, existingNodes)
                    var subNodes = subNeighbors[0]
                    var subEdges = subNeighbors[1]
                    adjNodes = Object.assign({}, subNodes, adjNodes);
                    adjEdges = Object.assign({}, subEdges, adjEdges);
                }
            }
        }

        // Remove Loot Tables from the output for cleanliness / display 
        // var neighbors = []
        // var edges = []
        // for (let key in adjEdges) {
        //     let element = adjEdges[key];
        //     let targetNode = graph.nodes(element.target)
        //     if(!(targetNode.attributes.itemtype === 'LootTable')){
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