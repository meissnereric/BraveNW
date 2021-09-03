import React from 'react'

import sigma from 'react-sigma';

import { initShownFilter } from './FilteringData';

export function embedProps(elements, extraProps) {
    return React.Children.map(elements,
        (element) => React.cloneElement(element, extraProps))
}

type State = {
    loaded: boolean,
    initColors: boolean
};

type Props = {
    path: string,
    onGraphLoaded?: () => void,
    children?: any,
    sigma?: sigma
    adjNodesSetter?: any
    adjEdgesSetter?: any
    shownFilter?: any
    searchText?: string
};

const rarityMap = {
    "-1": 'Unknown',
    0: 'Unknown',
    1: 'Common',
    2: 'Uncommon',
    3: 'Rare',
    4: 'Epic',
    5: 'Legendary'
}

function _showNode (node, shownFilter, searchText) {
    var rarityTrue = false
    var searchTrue = false
    var itemTypeTrue = false
    var nameSearch = false
    var idSearch = false
    var name = ""
    var ID = ""
    var searchLongEnough = (searchText.length > 0)
    const rmapvalue = rarityMap[node.attributes.rarity]
    name = node.label
    ID = node.id
    nameSearch = name.toLowerCase().includes(searchText)
    idSearch = ID.toLowerCase().includes(searchText)

    if( searchLongEnough && (nameSearch || idSearch) ){
        searchTrue = true
    }
    else if(!searchLongEnough){
        searchTrue = true
    }

    const rarityType = shownFilter['Rarity'][rmapvalue]
    if(rarityType['isShown']){
        rarityTrue=true
    }

    const itemType = shownFilter['ItemType'][node.attributes.itemtype]

    if(itemType['isShown']){
        itemTypeTrue=true
    }
    return searchTrue && rarityTrue && itemTypeTrue
}

function _showEdge (edge, shownFilter) {
    var t = false
    if(shownFilter['Tradeskill'][edge.attributes.tradeskill]['isShown']){
        t=true
    }
    if(edge.source.hidden && edge.target.hidden){
        t=false
    }
    return t
}

function _getNodeColor (n, by='ItemType') {
    if(by==="ItemType"){
        return initShownFilter['ItemType'][n.attributes.itemtype]['colorHex']
    }
    else if(by==="ItemType"){
        return initShownFilter['Rarity'][rarityMap[n.attributes.rarity]]['colorHex']
    }
    
}
function _getEdgeColor (e) {
    return initShownFilter['Tradeskill'][e.attributes.tradeskill]['colorHex']
}

class UpdateNodes extends React.PureComponent {
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
        this._load(this.props)
        this.props.sigma.refresh()
    }

    componentWillReceiveProps(props: Props) {
        console.info("UpdateNodes componentWillReceiveProps")
        // reload only if path changes
        if (this.props.path !== props.path) {
            this.setState({ loaded: false })
            console.info("UpdateNodes componentWillReceiveProps inner path thing")
            this._load(props)
        }
        console.info(this.props.sigma)

        this._initColors(this.props.sigma)

        var searchText = this.props.searchText
        console.info(["UpdateNodes search text", searchText])

        var shownFilter = this.props.shownFilter
        console.info(["UpdateNodes shown filter", shownFilter])
        if(!shownFilter){
            console.warn("Shown filter not initialized yet, will not filter nodes.")
            return
        }


        var f = 0
        var t = 0
        props.sigma.graph.nodes().forEach(function (n) {
            var isShown = _showNode(n, shownFilter, searchText)
            if(isShown){
                t++;
            }
            else{
                f++
            }
            n.hidden = !isShown
        });
        // console.log("Nodes true: ", t, "Nodes false: ", f)

        f = 0
        t = 0
        props.sigma.graph.edges().forEach(function (e) {
            var isShown = _showEdge(e, shownFilter)
            if(isShown){
                t++;
            }
            else{
                f++
            }
            e.hidden = !isShown
        });
        console.info("Edges true: ", t, "Edges false: ", f)
        this.props.sigma.refresh()
    }


    _clickNode(props, s, e) {
        this._initColors(s)
        var nodeId = e.data.node.id

        var res = this._neighbors(s.graph, nodeId)
        var toKeepNodes = res[0]
        var toKeepEdges = res[1]
        toKeepNodes[nodeId] = e.data.node
        // pass data to GraphWrapper
        props.adjNodesSetter(toKeepNodes)
        props.adjEdgesSetter(toKeepEdges)

        s.graph.nodes().forEach(function (n) {
            if (toKeepNodes[n.id])
                n.color = _getNodeColor(n)
            else
                n.color = '#eee';
        });

        s.graph.edges().forEach(function (e) {
            if (toKeepNodes[e.source] && toKeepNodes[e.target])
                e.color = _getEdgeColor(e)
            else
                e.color = '#eee';
        });

        // Since the data has been modified, we need to
        // call the refresh method to make the colors
        // update effective.
        s.refresh();
    }

    // When the stage is clicked, we just color each
    // node and edge with its original color.
    _clickStage = function (props, s, e) {
        this._initColors(s)

        props.adjNodesSetter({})
        props.adjEdgesSetter({})
        s.graph.nodes().forEach(function (n) {
            n.color = _getNodeColor(n)
        });

        s.graph.edges().forEach(function (e) {
            e.color = _getEdgeColor(e)
        });

        // Same as in the previous event:
        s.refresh();
    }

    _neighbors = function (graph, nodeId) {
        var adjNodes = graph.adjacentNodes(nodeId)
        var adjEdges = graph.adjacentEdges(nodeId)
        var neighbors = []
        adjNodes.forEach(element => {
            neighbors[element.id] = element
        });
        var edges = []
        adjEdges.forEach(element => {
            edges[element.id] = element
        });
        return [neighbors, edges];
    };

    _saveOriginalColors = function (s) {
        console.info("original colors saving")

        s.graph.nodes().forEach(function (n) {
            n.color = _getNodeColor(n)
        });
        s.graph.edges().forEach(function (e) {
            e.color = _getEdgeColor(e)
        });
    }

    _initColors = function (s) {
        if(!this.state.initColors){
            console.info("Saving original colors in initColors")
            s.graph.nodes().forEach(function (n) {
                n.color = _getNodeColor(n)
            });
            s.graph.edges().forEach(function (e) {
                e.color = _getEdgeColor(e)
            });
            this.setState({initColors: true})
            console.info("initColors nodes")
            console.info(s.graph.nodes())
        }

    }
    _load(props) {
        var s = props.sigma
        this._saveOriginalColors(s)

        s.bind('clickNode', (e) => this._clickNode(props, s, e));

        s.bind('clickStage', (e) => this._clickStage(props, s, e));
    }

    _onLoad() {
        if (this.props.sigma)
            this.props.sigma.refresh()
        this.setState({ loaded: true })
        if (this.props.onGraphLoaded)
            return this.props.onGraphLoaded()
    }

    render() {
        if (!this.state.loaded){
            console.warn("State not loaded in render in UpdateNodes.")
            return null
        }
        return <div>{embedProps(this.props.children, { sigma: this.props.sigma })}</div>
    }

}

export default UpdateNodes;