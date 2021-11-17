import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './Components/Navbar'
import About from './Components/About'
import Infographics from './Components/Infographics'
import ItemGraph from './Components/ItemGraph';
import Arbitrage from './Components/Arbitrage';
import GatheringLuck from './Components/GatheringLuck';
import WarBoard from './Components/WarBoard';
import Grid from '@material-ui/core/Grid';
import '@fontsource/roboto';
import Theming from './Components/Theming';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, makeStyles  } from '@material-ui/styles';
import Profile from './Components/user/Profile';

// const api = require("./api/api")

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '95vw',
    maxWidth: '100vw',
    minHeight: '95vh',
    maxHeight: '100vh'
  }}));


function App(props) { 
  const classes = useStyles();
  const theme = Theming.theme
  // async function test() {
  //   console.log(await api.getAllTestModels())
  // }
  // test()
  return (
    <div className="#">
      <BrowserRouter>
        <ThemeProvider theme={Theming.theme}>
          <CssBaseline />
          <Grid
            className={classes.root}
            container
            justifyContent="flex-start"
            alignItems="stretch"
            style={{minHeight:'100vh', minWidth:'95vw', maxWidth:'100vw', backgroundColor: theme.palette.secondary.main}}
            direction='row'
          >
          {/* <Grid item xs={12} style={{minHeight:'5vh'}}> */}
            <Grid item style={{minHeight:'100%', minWidth: '100%'}}>
              <NavBar />
            </Grid>
            {/* <Grid item xs={12} style={{minHeight:'95vh',  backgroundColor: theme.palette.secondary.main, padding: 30 }}> */}
            <Grid item style={{minHeight:'100%', backgroundColor: theme.palette.secondary.main, paddingLeft: 30, paddingRight: 30, paddingBottom: 30}}>
              <Switch>
                {/* Route the home page to recipe graph for now during testing. */}
                <Route exact path="/" component={GatheringLuck}></Route>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/infographics" component={Infographics}></Route>
                <Route exact path="/arbitrage" component={Arbitrage}></Route>
                <Route exact path="/gathering_luck" component={GatheringLuck}></Route>
                <Route exact path="/item_list" component={ItemGraph}></Route>
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/warboard" component={WarBoard}></Route>
              </Switch>
            </Grid>
          </Grid>
        </ThemeProvider>

      </BrowserRouter>

    </div>
  )
}

export default App;
