import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import Infographics from './Components/Infographics'
import GraphWrapper from './Components/ItemGraph';

class App extends React.Component {
  render() {
    return (
      <div className="#">
          <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/infographics" component={Infographics}></Route>
                <Route exact path="/item_list" component={GraphWrapper}></Route>
              </Switch>
          </BrowserRouter>
      </div>
    )
  }
}

export default App;
