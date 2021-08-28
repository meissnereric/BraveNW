import React from 'react';

// import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme : Theme) => ({
    root: {
      flexGrow: 1,
      // zIndex: 1000
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      // flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },

  }));


  export default function NavBar() {
    const classes = useStyles(); 


    return(
            <AppBar position="static">
                <Toolbar className={classes.root}>   
                  <Button variant="contained" className={classes.title} component={Link} to="/">Home</Button>
                  <div className={classes.grow}></div>
                  <Button variant="contained" component={Link} to="/item_list">Recipe Network</Button>
                  <Button variant="contained" component={Link} to='/infographics'>Infographic</Button>
                  <Button variant="contained" component={Link} to='/about'>About</Button>
                </Toolbar>
            </AppBar>
    )

}