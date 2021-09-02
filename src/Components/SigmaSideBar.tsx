// @ts-nocheck

import React from "react";
import useScript from '../hooks/useScript';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { rColors } from "./FilteringData";


// Material UI Style Customization by parameters
// const useStyles = makeStyles({
//     // style rule
//     foo: props => ({
//       backgroundColor: props.backgroundColor,
//     }),
//     bar: {
//       // CSS property
//       color: props => props.color,
//     },
//   });

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

// function MyComponent() {
// // Simulated props for the purpose of the example
//     const props = { backgroundColor: 'black', color: 'white' };
//     // Pass the props as the first argument of useStyles()
//     const classes = useStyles(props);

//     return <div className={`${classes.foo} ${classes.bar}`} />
// }

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
            //   flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            margin: 'auto',
            marginTop: 5,
            marginBottom: 5
            //maxWidth: 500,
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
            // padding: theme.spacing(5,5),
            height: "94%",
            //width: "16%",
            // position: "fixed",
            zIndex: 1,
            bottom: 0,
            right: 0,
            overflow: "auto",



            //backgroundColor: "#5e6e9b"
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
    const rColor = rColors[rarity]
    var url = "https://nwdb.info/db/item/" + nodeId
    return (
        //TODO: Fix text wrapping on labels
        //TODO: Add 
        <div className={classes.root}>
            <a href={url} style={{ textDecoration: "none" }}>
                <Paper className={classes.paper} style={{ backgroundColor: rColor }}>
                    <Grid container spacing={1} className={classes.sidebarBackground}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="Img" src="" />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs className={classes.textGrid}>
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
    const nodes = props.nodes
    const edges = props.edges

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
            if (targetNode.id == node.id && !nodeWritten) {
                targetCard = <Card label={node.label} targetNode={targetNode} nodeId={node.id} rarity={node.attributes.rarity} />
                nodeWritten=true 
            }
            else {
                if (props.edges && !nodeWritten) {
                    for (let edge of Object.values(props.edges)) {
                        // Ingredients that make TargetNode
                        if (targetNode.id == edge.target && !nodeWritten) {
                            ingredients.push(<Card label={node.label} targetNode={targetNode} nodeId={node.id} rarity={node.attributes.rarity} />)
                            nodeWritten=true 
                        }
                        else {

                            // Items that TargetNode is an ingredient for
                            if (targetNode.id == edge.source && !nodeWritten) {
                                isIngredientFor.push(<Card label={node.label} targetNode={targetNode} nodeId={node.id} rarity={node.attributes.rarity} />)
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
            <h4>
            <Typography variant='body2'>Target: </Typography>{targetCard} <br/>
            <Typography variant='body2'>Ingredients: </Typography>{ingredients}<br/>
            <Typography variant='body2'>Used In: </Typography>{isIngredientFor}<br/>
            </h4>
        
        </Grid>
    )
}

function SigmaSidebar(props) {
    const classes = useStyles()
    const nodes = props.nodes
    const edges = props.edges
    useScript('https://nwdb.info/embed.js');
    return (

        <Grid container className={classes.sideBar} spacing={1}>
            <RenderCards nodes={nodes} edges={edges} />
        </Grid>

    )
}

export default SigmaSidebar