import React from 'react';

// import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme : Theme) => ({
    root: {
      flexGrow: 1,
      // zIndex: 1000
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  }));


  export default function NavBar() {
    const classes = useStyles();

    return(
            <AppBar position="static">
                <Toolbar className={classes.root}>
                    <Grid container spacing={1}>
                      <Grid item xs={2}>
                        <Typography variant="h6" className={classes.title}>
                          <Button variant="contained" className={classes.title}><Link to='/'>BraveNW</Link></Button>
                        </Typography>
                      </Grid>
                      <Grid item xs={7} />
                      <Grid item xs={1}>
                        <Button variant="contained"><Link to='/item_list'>Recipe Network</Link></Button>
                      </Grid>
                      <Grid item xs={1}>
                        <Button variant="contained"><Link to='/infographics'>Infographic</Link></Button>
                      </Grid>
                      <Grid item xs={1}>
                        <Button variant="contained"><Link to='/about'>About</Link></Button>
                      </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
    )

}