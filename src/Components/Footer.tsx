import React, { Component } from "react";

import { Typography, styled } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            'text-align': 'center',
            position: 'absolute',
            bottom: 0,
            width: '100% !important',
            height: '100px !important',
            background: 'primary',
        },
    }),
);
export default function Footer(props) {

    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Typography variant='h5'> Copyright © 2021 bravenw.info </Typography>
        </Container>
    );
}