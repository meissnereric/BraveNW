import React from "react";
import infographic from '../data/infographic.jpg'; // Tell webpack this JS file uses this image

class Infographics extends React.Component{
    render(){
        return(
            <div className="pure-g">
              <div className="pure-u-1 pure-u-md-1-8"></div>
              <div className="infographic pure-img-responsive pure-u-1 pure-u-md-6-8"><img src={infographic} alt="Logo" /></div>
              <div className="pure-u-1 pure-u-md-1-8"></div>
            </div>
        )
    }
}

export default Infographics