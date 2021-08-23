import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'

class App extends React.Component {
  render() {
    return (
      <div className="#">
          <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/about" component={About}></Route>
              </Switch>
          </BrowserRouter>
      </div>
    )
  }
}

export default App;
