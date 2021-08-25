import React from "react";
import valueLabelGetter from "../../api/DataGetter";
import useScript from '../hooks/useScript';
import Button from '@material-ui/core/Button';

function Card(props) {
    const label = props.label
    const nodeId = props.nodeId

    var url = "https://nwdb.info/db/item/" + nodeId
    return (
        <li>
            <a href={url}>{label}</a>
        </li>
    )
}


function RenderCards(props) {
    const nodes = props.nodes
    const edges = props.edges

    
    var places = ['right'] as any

    
    let c = []
    let rc = []
    if(props.edges){
        console.log("%%%%Edges%%%%%")
        console.log(props.edges)
    }
    if(props.nodes){
        console.log("%%%%%Nodes%%%%")
        console.log(props.nodes)
        Object.values(props.nodes).forEach(element => {
            //c.push(element.label) //it's super dumb that this doesn't work
            c.push(element)
        });
    c.forEach(element => {
        rc.push(<Card label={element.label} nodeId={element.id}/>) //but this does
    });
    }
    return (<div>{rc}</div>)

    console.log(nodes)
    return (
        <div>

        {places.map((anchor) => (
            <React.Fragment key={anchor}>
            <Card label="oakfleshbalmt320" nodeId="oakfleshbalmt3"/>
            </React.Fragment>
        ))}
        </div>
    );
}

function SigmaSidebar(props) {
    const nodes = props.nodes
    const edges = props.nodes
    useScript('https://nwdb.info/embed.js');
    return (
        <div className="sideBar">
            <ul>
                <RenderCards nodes={nodes} edges={edges} />
            </ul>
        </div>
    )
}

export default SigmaSidebar