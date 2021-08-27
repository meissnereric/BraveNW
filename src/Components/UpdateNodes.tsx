import React from 'react'

import sigma from 'react-sigma';

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
    adjNodesGetter?: any
    adjEdgesGetter?: any
    shownFilter?: any
};

const rarityMap = {
    0: 'Unknown',
    1: 'Common',
    2: 'Uncommon',
    3: 'Rare',
    4: 'Epic',
    5: 'Legendary'
}

function _filterNodes (node, shownFilter) {
    const rmapvalue = rarityMap[node.attributes.rarity]
    
    const rarityType = shownFilter['Rarity'][rmapvalue]
    var t = false
    if(rarityType['isShown']){
        t=true
    }
    return t
}

function _filterEdges (edge, shownFilter) {
    var t = false
    if(shownFilter['Tradeskill'][edge.attributes.tradeskill]['isShown']){
        t=true
    }
    return t
}

/**
LoadGEXF component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.
 @param {string} path   path to the GEXF file
 @param {Function} onGraphLoaded        Optional callback for graph update
[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)
**/


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
        console.info("UpdateNodes componentDidMount")
        this._load(this.props)
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
        console.info(props.sigma)
        var shownFilter = this.props.shownFilter
        console.info(["UpdateNodes shown filter", shownFilter])
        if(!shownFilter){
            console.warn("Shown filter not initialized yet, will not filter nodes.")
            return
        }

        var f = 0
        var t = 0
        props.sigma.graph.nodes().forEach(function (n) {
            var isFiltered = _filterNodes(n, shownFilter)
            if(isFiltered){
                t++;
            }
            else{
                f++
            }
            n.hidden = !isFiltered
        });
        console.info(t, f)

        var f = 0
        var t = 0
        props.sigma.graph.edges().forEach(function (e) {
            var isFiltered = !_filterEdges(e, shownFilter)
            if(isFiltered){
                t++;
            }
            else{
                f++
            }
            e.hidden = isFiltered
        });
        console.info(t, f)
        this.props.sigma.refresh()
    }

    render() {
        if (!this.state.loaded){
            console.warn("State not loaded in render in UpdateNodes.")
            return null
        }
        return <div>{embedProps(this.props.children, { sigma: this.props.sigma })}</div>
    }


    _clickNode(props, s, e) {
        this._initColors(s)
        var nodeId = e.data.node.id

        var res = this._neighbors(s.graph, nodeId)
        var toKeepNodes = res[0]
        var toKeepEdges = res[1]
        toKeepNodes[nodeId] = e.data.node
        // pass data to GraphWrapper
        props.adjNodesGetter(toKeepNodes)
        props.adjEdgesGetter(toKeepEdges)

        s.graph.nodes().forEach(function (n) {
            if (toKeepNodes[n.id])
                n.color = n.originalColor;
            else
                n.color = '#eee';
        });

        s.graph.edges().forEach(function (e) {
            if (toKeepNodes[e.source] && toKeepNodes[e.target])
                e.color = e.originalColor;
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

        props.adjNodesGetter({})
        props.adjEdgesGetter({})
        s.graph.nodes().forEach(function (n) {
            n.color = n.originalColor;
        });

        s.graph.edges().forEach(function (e) {
            e.color = e.originalColor;
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
            n.originalColor = n.color;
        });
        s.graph.edges().forEach(function (e) {
            e.originalColor = e.color;
        });
    }

    _initColors = function (s) {
        if(!this.state.initColors){
            console.info("Saving original colors in initColors")
            s.graph.nodes().forEach(function (n) {
                n.originalColor = n.color;
            });
            s.graph.edges().forEach(function (e) {
                e.originalColor = e.color;
            });
            this.setState({initColors: true})
            console.info("initColors nodes")
            console.info(s.graph.nodes())
        }

    }
    _load(props) {
        // console.log(props)
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

}

export default UpdateNodes;