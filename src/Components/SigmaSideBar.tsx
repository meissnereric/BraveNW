// @ts-nocheck

import React from "react";
import useScript from '../hooks/useScript';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { rColors } from "./FilteringData";
// Material UI gradient coloring
// const useStyles = makeStyles({
//     root: {
//         background: (props) =>
//         props.color === 'red'
//             ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
//             : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
//         border: 0,
//         borderRadius: 3,
//         boxShadow: (props) =>
//         props.color === 'red'
//             ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
//             : '0 3px 5px 2px rgba(33, 203, 243, .3)',
//         color: 'white',
//         height: 48,
//         padding: '0 30px',
//         margin: 8,
//     },
// });
const labelFixer = (label: string) => {
    let f = label.replace(/_/g, " ").split("")
    for (let i = 0; i < f.length; i++) {
        f[i] = f[i][0].toUpperCase() + f[i].substr(1);
    }
    return f
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        paper: {
            padding: theme.spacing(1),
            margin: 'auto',
            marginTop: 5,
            marginBottom: 5
        },
        image: {
            width: 60,
            height: 60,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        overflowXAuto: {
            overflowX: "auto"
        },
        sideBar: {
            height: "94%",
            bottom: 0,
            right: 0,
            overflow: "auto",

        },
        textGrid: {
            display: "flex",
            alignItems: "center",
        },
        sidebarBackground: {
            backgroundColor: "#666666",

        }
    }),
);

function Card(props) {
    const classes = useStyles();
    const label = labelFixer(props.label)
    const nodeId = props.nodeId
    const rarity = props.rarity
    const icon = props.icon.toLowerCase()
    const type = props.itemType.toLowerCase()
    
    const rColor = rColors[rarity]
    const quantity = props.quantity ? 'quantity' in props : 1
    var url = "https://nwdb.info/db/item/" + nodeId
    const processIcon = (itemIcon: string) => {
        let baseUrl = "https://cdn.nwdb.info/db/v2/icons/"
        
        let imgUrl = ""
        if (!itemIcon.includes("/")) {
            imgUrl = baseUrl + "items/" + type + "/" + itemIcon + ".png"
        } else {
            if(itemIcon.includes("icons")){console.warn("Issue parsing item image :O")}
            imgUrl = baseUrl + itemIcon +".png"
        }
        return imgUrl
    }

    return (
        <div className={classes.root}>
            <a href={url} style={{ textDecoration: "none" }}>
                <Paper className={classes.paper} style={{ backgroundColor: rColor }}>
                    <Grid container spacing={1} className={classes.sidebarBackground}>
                        <Grid item xs={12} sm container>
                            <Grid item xs className={classes.textGrid}>
                                <Typography variant='body2'>Quantity: {quantity}</Typography>
                                <Typography style={{ color: rColor }}>{label}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </a>
        </div>

    )
}



function RenderCards(props) {
    
    let ingredients = []
    let isIngredientFor = []
    let targetCard = null
    if (props.nodes) {
        let targetNode = Object.values(props.nodes)[props.length - 1]

        // Stupid hack to set targetNode to the final node in the list lol.
        for (let node of Object.values(props.nodes)) {
            targetNode = node
        }

        for (let node of Object.values(props.nodes)) {
            var nodeWritten = false
            // The target card of the recipe
            if (targetNode.id === node.id && !nodeWritten) {
                targetCard = <Card label={node.label} targetNode={targetNode} nodeId={node.id} rarity={node.attributes.rarity} icon={node.attributes.icon} itemType={node.attributes.itemtype}/>
                nodeWritten=true 
            }
            else {
                if (props.edges && !nodeWritten) {
                    for (let edge of Object.values(props.edges)) {
                        // Ingredients that make TargetNode
                        if (targetNode.id === edge.target && !nodeWritten) {
                            ingredients.push(<Card label={node.label} targetNode={targetNode} nodeId={node.id} rarity={node.attributes.rarity} icon={node.attributes.icon} itemType={node.attributes.itemtype}/>)
                            nodeWritten=true 
                        }
                        else {

                            // Items that TargetNode is an ingredient for
                            if (targetNode.id === edge.source && !nodeWritten) {
                                isIngredientFor.push(<Card label={node.label} targetNode={targetNode} nodeId={node.id} rarity={node.attributes.rarity} icon={node.attributes.icon} itemType={node.attributes.itemtype}/>)
                                nodeWritten=true 
                            }
                        }
                    }
                }
            }
        }
    }
    return (
        <Grid xs={12}>
            <Typography variant='h4'> Recipe </Typography>
            <Typography variant='body2'>Target: </Typography>{targetCard} <br/>
            <Typography variant='body2'>Ingredients: </Typography>{ingredients}<br/>
            <Typography variant='body2'>Used In: </Typography>{isIngredientFor}<br/>
        </Grid>
    )
}

function SigmaSidebar(props) {
    const classes = useStyles()
    const nodes = props.nodes
    const edges = props.edges
    useScript('https://nwdb.info/embed.js');
    console.log("Render cards nodes: ", props.nodes, "edges: ", props.edges)
    return (

        <Grid container className={classes.sideBar} spacing={1} 
            justifyContent="flex-start"
            alignItems="flex-start">
            <RenderCards nodes={nodes} edges={edges} />
        </Grid>

    )
}

export default SigmaSidebar