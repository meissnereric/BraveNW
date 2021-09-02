import React from 'react';

// import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

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
                  <Button variant="contained" className={classes.menuButton} component={Link} to="/">Home</Button>
                  <div className={classes.grow}></div>
                  <Button variant="contained" className={classes.menuButton} component={Link} to="/item_list">Recipe Network</Button>
                  <Button variant="contained" className={classes.menuButton} component={Link} to='/infographics'>Infographic</Button>
                  <Button variant="contained" className={classes.menuButton} component={Link} to='/about'>About</Button>
                </Toolbar>
            </AppBar>
    )

}