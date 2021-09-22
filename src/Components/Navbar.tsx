import React from 'react';

// import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { isDesktopQuery } from './MobileSwitch';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'primary'
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
  paperMenu: {
    backgroundColor: "gray"
  }

}));

function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isDesktop = useMediaQuery(isDesktopQuery);

  if (!isDesktop) {
    return (
      <div>
        <IconButton
          onClick={handleClick}
          aria-controls="simple-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MenuIcon /> <Typography> Navigation </Typography>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          classes={{ paper: classes.paperMenu }}
        >
          <MenuItem onClick={handleClose}>
            <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to='/login'>login</Button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to='/logout'>logout</Button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to='/profile'>profile</Button>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to="/item_list">Recipe Network</Button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to='/infographics'>Infographic</Button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to='/about'>About</Button>
          </MenuItem>

          

        </Menu>

      </div>
    );
  }
  else {
    return (
      <div>
                    <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to='/login'>login</Button>
                    <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to='/logout'>logout</Button>
                    <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to='/profile'>profile</Button>



        <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to="/item_list">Recipe Network</Button>
        <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to="/arbitrage">Reagent Conversions</Button>
        <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to='/infographics'>Infographic</Button>
        <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to='/about'>About</Button>
      </div>
    )
  }
}

export default function NavBar() {
  const classes = useStyles();


  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Button variant="contained" className={classes.menuButton} color="secondary" component={Link} to="/">Home</Button>
        <div className={classes.grow}></div>
        {SimpleMenu()}
      </Toolbar>
    </AppBar>
  )

}
