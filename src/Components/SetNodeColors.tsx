import React from 'react'

import  sigma  from 'react-sigma';

export function embedProps(elements, extraProps) {
    return React.Children.map(elements, 
        (element) => React.cloneElement(element, extraProps))
}

type State = {
    loaded: boolean
};

type Props = {
	path: string,
    onGraphLoaded?: () => void,
    children?: string,
    sigma?: sigma
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
        this.state = {loaded:false}
        this.onLoad = this._onLoad.bind(this)
    }

	componentDidMount() {
		this._load(this.props.path)
	}

	componentWillReceiveProps(props: Props) {
		// reload only if path changes
		if(this.props.path !== props.path) {
            this.setState({loaded:false})
			this._load(props.path)
        }
	}

	render() {
        if(!this.state.loaded)
            return null
        return <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
    }


    _load(url: string) {

        var s = this.props.sigma
        var graph = s.graph
        var neighbors = function(graph, nodeId) {
            var adjNodes = graph.adjacentNodes(nodeId)
            var neighbors = {}
            adjNodes.forEach(element => {
                neighbors[element.id] = element
            });
      
            return neighbors;
        };
        console.log(s)
        graph.nodes().forEach(function(n) {
            n.originalColor = n.color;
            console.log(n.color)
        });
        graph.edges().forEach(function(e) {
            e.originalColor = e.color;
            console.log(e.color)
        });

        s.bind('clickNode', function(e) {
            graph.nodes().forEach(function(n) {
                n.originalColor = n.color;
            });
            graph.edges().forEach(function(e) {
                e.originalColor = e.color;
            });

            console.log(e.data.node.originalColor)
            var nodeId = e.data.node.id
            var toKeep = neighbors(graph, nodeId)
            toKeep[nodeId] = e.data.node

            s.graph.nodes().forEach(function(n) {
              if (toKeep[n.id])
                n.color = n.originalColor;
              else
                n.color = '#eee';
            });

            s.graph.edges().forEach(function(e) {
                  if (toKeep[e.source] && toKeep[e.target])
                    e.color = e.originalColor;
                  else
                    e.color = '#eee';
            });

            // Since the data has been modified, we need to
            // call the refresh method to make the colors
            // update effective.
            s.refresh();
        });

        // When the stage is clicked, we just color each
        // node and edge with its original color.
        s.bind('clickStage', function(e) {
            s.graph.nodes().forEach(function(n) {
              n.color = n.originalColor;
            });

            s.graph.edges().forEach(function(e) {
                e.color = e.originalColor;
            });

            // Same as in the previous event:
            s.refresh();
        });
    }

    _onLoad() {
        if(this.props.sigma)
            this.props.sigma.refresh()
        this.setState({loaded:true})
        if(this.props.onGraphLoaded)
            return this.props.onGraphLoaded()
    }

}

export default SetNodeColors;