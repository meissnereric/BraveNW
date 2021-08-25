import React from 'react';

// import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TemporaryDrawer from './SigmaDrawer';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


  export default function NavBar() {
    const classes = useStyles();

    return(
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to='/'>BraveNW</Link>
                    </Typography>
                    <Button color="inherit"><Link to='/item_list'>Recipe Network</Link></Button>
                    <Button color="inherit"><Link to='/infographics'>Infographic</Link></Button>
                    <Button color="inherit"><Link to='/about'>About</Link></Button>
                </Toolbar>
            </AppBar>
    )

}