import React from "react";

class Sigma extends React.Component{
    render(){
        return(
            <div>
                <script src="libraries/sigma.min.js"></script>
                <script src="libraries/sigma.parsers.json.min.js"></script>
                <script src="libraries/sigma.parsers.gexf.min.js"></script>
                <script src="libraries/sigma.layout.forceAtlas2.min.js"></script>
                <script src="libraries/sigma.layout.noverlap.min.js"></script>
                <script src="libraries/sigma.plugins.animate.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"></script>
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/1.2.1/sigma.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/linkurious.js/1.5.1/plugins/sigma.plugins.tooltips.min.js"></script>
            
                var config = {
                node: [{
                    show: 'hovers',
                    hide: 'hovers',
                    cssClass: 'sigma-tooltip',
                    position: 'top',
                    //autoadjust: true,
                    template:
                    '<div class="arrow"></div>' +
                    '<div class="sigma-tooltip-header">{{label}}</div>' +
                    '<div class="sigma-tooltip-body">' +
                    '  <table>' +
                    '    <tr><th>Name</th> <td>{{data.name}}</td></tr>' +
                    '    <tr><th>Gender</th> <td>{{data.gender}}</td></tr>' +
                    '    <tr><th>Age</th> <td>{{data.age}}</td></tr>' +
                    '    <tr><th>City</th> <td>{{data.city}}</td></tr>' +
                    '  </table>' +
                    '</div>' +
                    '<div class="sigma-tooltip-footer">Number of connections: {{degree}} </div>',
                    renderer: function (node, template) {
                    // The function context is s.graph
                    node.degree = node.id
                    // Returns an HTML string:
                    return Mustache.render(template, node);
                    }
                }, {
                    show: 'overNode',
                    cssClass: 'sigma-tooltip',
                    position: 'right',
                    template:
                    '<div class="arrow"></div>' +
                    '<div class="sigma-tooltip-header">{{label}}</div>' +
                    '<div class="sigma-tooltip-body">' +
                    '  <p>Context menu for {{neo4j_labels}}</p>' +
                    '</div>' +
                    '<div class="sigma-tooltip-footer">Number of connections: {{degree}} </div>',
                    renderer: function (node, template) {
                    node.degree = this.degree(node.id);
                    return Mustache.render(template, node);
                    }
                }],
                stage: {
                    template:
                    '<div class="arrow"></div>' +
                    '<div class="sigma-tooltip-header"> Menu </div>'
                }
                };

                var graphData = {
                "nodes": [
                    { "id": "n0", "label": "Node #1", "x": 0, "y": 0, "size": 3 },
                    { "id": "n1", "label": "Node #2", "x": 3, "y": 1, "size": 2 },
                    { "id": "n2", "label": "Node #3", "x": 1, "y": 3, "size": 1 },
                ],
                "edges": [
                    { "id": "e0", "source": "n0", "target": "n1" },
                    { "id": "e1", "source": "n1", "target": "n2" },
                    { "id": "e2", "source": "n2", "target": "n0" },
                ]
                };

                var sigmaSettings = {
                    defaultNodeColor: '#ec5148',
                    defaultLabelColor: '#ffffff',
                    edgeColor: 'target',
                    nodesPowRatio: 0.2,
                    edgesPowRatio: 0.2
                    //labelThreshold: 5
                }
                const sigmaContainerName = 'sigma-container'
                const gephiFile = 'data/filtered_recipe_graph_8_21_2021.gexf'

                const sigmaFunction = function(s) {
                        // Start the ForceAtlas2 algorithm:
                        var slowDown = 0.001
                        var forceAtlasConfig = {
                            worker: true,
                            barnesHutOptimize: true,
                            adjustSizes: true,
                            outboundAttractionDistribution: true,
                            slowDown: slowDown,
                            scalingRatio: 200,
                            gravity: 1,
                            iterationsPerRender: 3,
                        }


                        // We first need to save the original colors of our
                        // nodes and edges, like this:
                        s.graph.nodes().forEach(function(n) {
                            n.originalColor = n.color;
                        });
                        s.graph.edges().forEach(function(e) {
                            e.originalColor = e.color;
                        });

                        // When a node is clicked, we check for each node
                        // if it is a neighbor of the clicked one. If not,
                        // we set its color as grey, and else, it takes its
                        // original color.
                        // We do the same for the edges, and we only keep
                        // edges that have both extremities colored.
                        s.bind('clickNode', function(e) {
                            var nodeId = e.data.node.id,
                                toKeep = s.graph.neighbors(nodeId);
                            toKeep[nodeId] = e.data.node;

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

                sigma.classes.graph.addMethod('neighbors', function(nodeId) {
                var k,
                    neighbors = {},
                    index = this.allNeighborsIndex[nodeId] || {};

                for (k in index)
                    neighbors[k] = this.nodesIndex[k];

                return neighbors;
                });

                // Initialize the Sigma graph
                const sigmaInstance = new sigma({
                container: sigmaContainerName,
                settings: sigmaSettings
                });

                // Set initial zoom
                sigmaInstance.cameras[0].goTo({ x: 1, y: 1, angle: 0, ratio: 2.0 });

                // Instantiate the tooltips plugin with a Mustache renderer for node 
                var tooltips = sigma.plugins.tooltips(sigmaInstance, sigmaInstance.renderers[0], config);

                tooltips.bind('shown', function (event) {
                // console.log('tooltip shown');
                });

                sigma.parsers.gexf(
                gephiFile, 
                sigmaInstance,
                // {
                //   container: sigmaContainerName,
                //   settings: sigmaSettings
                // },
                sigmaFunction
                )

                sigmaInstance.refresh()

            </div>

        )
    }
}

export default Sigma