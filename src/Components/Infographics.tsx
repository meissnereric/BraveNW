import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import infographic from '../data/infographic.jpg'; // Tell webpack this JS file uses this image


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

export default function Infographic() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Crafting Loops Infographic</Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
                    <img className={classes.img} src={infographic} alt="Crafting Loops Infographic" /></Paper>
        </Grid>
      </Grid>
    </div>
  );
}