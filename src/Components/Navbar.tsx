import React from 'react';

// import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';


class NavBar extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
                
                <a className="pure-menu-heading"><Link to="/">Brave New World</Link></a>

                    <ul className="pure-menu-list">
                        <li className="pure-menu-item pure-menu-selected"><Link to='/network' className="pure-menu-link">Recipe Network</Link></li>
                        <li className="pure-menu-item"><Link to="/about" className="pure-menu-link"> About </Link></li>
                        <li className="pure-menu-item"><Link to='/infographics' className='pure-menu-link'>Crafting Infographics</Link></li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default NavBar;