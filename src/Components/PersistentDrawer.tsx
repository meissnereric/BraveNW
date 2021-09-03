import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: "#b2b2b2"
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      // width: drawerWidth,
      flexShrink: 0,
      
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#b2b2b2"
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);
type Anchor = 'left' | 'right';
export default function PersistentDrawer(props: { lLabel: string, lDisplay: any, rDisplay: any, rLabel: string }) {
  const lLabel = props.lLabel
  const lDisplay = props.lDisplay
  const rLabel = props.rLabel
  const rDisplay = props.rDisplay
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open left drawer"
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {lLabel}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Divider orientation="vertical"/>
          <div style={{ flexGrow: 1 }} />
          <Typography variant="h6" noWrap>{rLabel}</Typography>
          
          <IconButton
            color="inherit"
            aria-label="open right drawer"
            onClick={toggleDrawer("right", true)}
            edge="end"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Left drawer */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={state["left"]}

        classes={{
          paper: classes.drawerPaper,
        }}

      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer("left", false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {lDisplay}
        
      </Drawer>

      {/* Right drawer */}
      <Drawer anchor={"right"}
        open={state["right"]}
        variant="persistent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} style={{justifyContent: "flex-start"}}>
          <IconButton onClick={
            toggleDrawer("right", false)
          }>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

        </div>
        <Divider />
        {rDisplay}
      </Drawer>
    </div>
  );
}