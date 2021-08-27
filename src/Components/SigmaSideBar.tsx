// @ts-nocheck

import React from "react";
import useScript from '../hooks/useScript';
import Button from '@material-ui/core/Button';
import { lighten } from "@material-ui/core";
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { classicNameResolver, isClassExpression } from "typescript";


const rColors = [
    "rgb(200, 200, 200)",
    "rgb(7, 192, 47)",
    "rgb(0, 203, 233)",
    "rgb(255, 22, 247)",
    "rgb(255, 135, 23)",
    "rgb(200, 200, 200)"
]

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
    if (props.nodes){
        let targetNode = Object.values(props.nodes)[props.length -1]

        // Stupid hack to set targetNode to the final node in the list lol.
        for (let node of Object.values(props.nodes)) {
            targetNode = node
        }

        for (let node of Object.values(props.nodes)) {
            // The target card of the recipe
            if (targetNode.id == node.id) {
                targetCard = <Card label={node.label} targetNode={targetNode} nodeId={node.id} rarity={node.attributes.rarity} />
                continue // verify this does what I think it does here?
            }
            if (props.edges) {
                for (let edge of Object.values(props.edges)) {
                    // Ingredients that make TargetNode
                    if (targetNode.id == edge.target) {
                        ingredients.push(<Card label={node.label} targetNode={targetNode} nodeId={node.id} rarity={node.attributes.rarity} />)
                    }

                    // Items that TargetNode is an ingredient for
                    if (targetNode.id == edge.source) {
                        isIngredientFor.push(<Card label={node.label} targetNode={targetNode} nodeId={node.id} rarity={node.attributes.rarity} />)
                    }
                }
            }
        }
    }
    return (
        <div>
            Target: {targetCard}
            Ingredients: {ingredients}
            Used In: {isIngredientFor}
        </div>
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