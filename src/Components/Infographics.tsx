import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import infographic from '../imgs/infographic.jpg'; // Tell webpack this JS file uses this image
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
      height: 'auto',
      width: 'auto'
    },
  }),
);

export default function Infographic() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems='center' alignContent='center' style={{ backgroundColor: theme.palette.secondary.main }}>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ backgroundColor: theme.palette.secondary.dark, color: theme.palette.secondary.contrastText }}>Crafting Loops Infographic</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ backgroundColor: theme.palette.secondary.dark, color: theme.palette.secondary.contrastText }}>
            <Box margin={2}>
              <img className={classes.img} src={infographic} alt="Crafting Loops Infographic" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}