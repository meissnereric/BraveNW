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
    children?: string,
    sigma?: sigma
    adjNodesGetter?: any
    adjEdgesGetter?: any
};


/**
LoadGEXF component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.
 @param {string} path   path to the GEXF file
 @param {Function} onGraphLoaded        Optional callback for graph update
[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)
**/


class SetNodeColors extends React.PureComponent {
    state: State;
    props: Props;
    onLoad: () => void;

    constructor(props: Props) {
        super(props)
        this.state = { loaded: false, initColors: false }
        this.onLoad = this._onLoad.bind(this)
    }

    componentDidMount() {
        this._load(this.props)
    }

    componentWillReceiveProps(props: Props) {
        // reload only if path changes
        if (this.props.path !== props.path) {
            this.setState({ loaded: false })
            this._load(props.path)
        }
    }

    render() {
        if (!this.state.loaded)
            return null
        return <div>{embedProps(this.props.children, { sigma: this.props.sigma })}</div>
    }

    _initColors(s){
        if(!this.state.initColors){
            s.graph.nodes().forEach(function (n) {
                n.originalColor = n.color;
            });
            s.graph.edges().forEach(function (e) {
                e.originalColor = e.color;
            });
            this.setState({initColors: true})
        }

    }

    _clickNode(props, s, e) {
        this._initColors(s)
        var nodeId = e.data.node.id

        // console.log("%%%%%%%%%%%%%%%%%%%%%%ClickNode%%%%%%%%%%%%%%%%%%%%%%")
        // console.log(this)
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

        // pass data to GraphWrapper
        // console.log("%%%%%%%%%%%%%%%%%%%%%%%%ClickStage%%%%%%%%%%%%%%%%%%%%")
        // console.log(this)
        // console.log(props)
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
        s.graph.nodes().forEach(function (n) {
            n.originalColor = n.color;
            console.log(n.color)
        });
        s.graph.edges().forEach(function (e) {
            e.originalColor = e.color;
            console.log(e.color)
        });
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

}

export default SetNodeColors;