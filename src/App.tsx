import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './Components/Navbar'
import About from './Components/About'
import Infographics from './Components/Infographics'
import ItemGraph from './Components/ItemGraph';
import Grid from '@material-ui/core/Grid';
import '@fontsource/roboto';
import Theming from './Components/Theming';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, makeStyles  } from '@material-ui/styles';
// import Footer from './Components/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100vw',
    minHeight: '100vh'
  }}));


function App(props) { 
  const classes = useStyles();
  return (
    <div className="#">
      <BrowserRouter>
        <ThemeProvider theme={Theming.theme}>
          <CssBaseline />
          <Grid
            className={classes.root}
            container
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <NavBar />
            </Grid>
            <Grid item xs={12} style={{minHeight:'100vh'}}>
              <Switch>
                {/* Route the home page to recipe graph for now during testing. */}
                <Route exact path="/" component={ItemGraph}></Route>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/infographics" component={Infographics}></Route>
                <Route exact path="/item_list" component={ItemGraph}></Route>
              </Switch>
            </Grid>
          </Grid>
        </ThemeProvider>

      </BrowserRouter>

    </div>
  )
}

export default App;
