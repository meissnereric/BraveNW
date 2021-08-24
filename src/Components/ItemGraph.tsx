import { settings } from 'cluster';
import React from 'react';
import {Sigma, RelativeSize, LoadGEXF, Filter, ForceAtlas2, RandomizeNodePositions} from 'react-sigma';

let myGraph = {nodes:[{id:"n1", label:"Alice"}, {id:"n2", label:"Rabbit"}], edges:[{id:"e1",source:"n1",target:"n2",label:"SEES"}]};


class GraphWrapper extends React.Component {
    render() {
        return (
            <div>

                <Sigma graph={myGraph} settings={{drawEdges: true, clone: false}}>
                    <RelativeSize initialSize={15}/>
                    <RandomizeNodePositions/>
                </Sigma>
                {/* <Sigma  
                    settings={{
                        defaultNodeColor: '#ec5148',
                        defaultLabelColor: '#ffffff',
                        edgeColor: 'target',
                        nodesPowRatio: 0.2,
                        edgesPowRatio: 0.2
                    }}
                >

                    <RelativeSize initialSize={15}/>
                    <LoadGEXF path="data/filtered_recipe_graph_8_20_2021.gexf">
                        <ForceAtlas2 worker barnesHutOptimize barnesHutTheta={0.6} iterationsPerRender={10} linLogMode timeout={3000}/>
                        <RelativeSize initialSize={15}/>
                    </LoadGEXF>
                </Sigma> */}
            </div>
        )
    }
  
}


export default GraphWrapper