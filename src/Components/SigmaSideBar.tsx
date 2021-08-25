import React from "react";
import useScript from '../hooks/useScript';
import Button from '@material-ui/core/Button';
import { lighten } from "@material-ui/core";

const rareColors = [
    "black",
    "#C8C8C8",
    "#07C02F",
    "#00CBE9",
    "#FF16F7",
    "#EA5B1C",  
]

function Card(props) {
    const label = props.label
    const nodeId = props.nodeId
    const rarity = props.rarity
    const rarityClass = "rarity" + rarity.toString()
    // console.log("***")
    // console.log(label)
    // console.log("rarity: ", rarity)
    // console.log("chosenColor: " + rarityClass)
    // console.log("***")
    // console.log("color: ", rareColors[rarity])
    var url = "https://nwdb.info/db/item/" + nodeId
    return (
        <li style={{margin: 15}}>
            <a href={url} className={rarityClass}>{label}</a>
        </li>
    )
}



function RenderCards(props) {
    const nodes = props.nodes
    const edges = props.edges
    
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
            c.push(element)
        });
    
    c.forEach(element => {
        
        rc.push(<Card label={element.label} nodeId={element.id} rarity={element.attributes.rarity}/>) //but this does
        
    });
    }
    let clicked = rc.pop()
    return (<div>
            <div className="clickedNode">{clicked}</div>
            {rc}
            </div>)
}

function SigmaSidebar(props) {
    const nodes = props.nodes
    const edges = props.nodes
    useScript('https://nwdb.info/embed.js');
    return (
        <div className="sideBar">
            <ul style={{listStyleType: "none", padding: 0, margin: 0}}>
                <RenderCards nodes={nodes} edges={edges} />
            </ul>
        </div>
    )
}

export default SigmaSidebar