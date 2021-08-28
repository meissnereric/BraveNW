import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import Infographics from './Components/Infographics'
import ItemGraph from './Components/ItemGraph';
import Grid from '@material-ui/core/Grid';
import '@fontsource/roboto';


class App extends React.Component {
  render() {
    return (
      <div className="#">
          <BrowserRouter>
          <Grid
            container
            // direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            
            <Grid item xs={12}>
            
              <NavBar/>
              
            </Grid>
             
            <Grid item xs={12}>
              <Switch>
                {/* Route the home page to recipe graph for now during testing. */}
                  <Route exact path="/" component={ItemGraph}></Route> 
                  <Route exact path="/about" component={About}></Route>
                  <Route exact path="/infographics" component={Infographics}></Route>
                  <Route exact path="/item_list" component={ItemGraph}></Route>
                </Switch>
            </Grid>
           
          </Grid>
          </BrowserRouter>
         
      </div>
    )
  }
}

export default App;
