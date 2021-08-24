import React from 'react';

import { Link } from 'react-router-dom';


class Navbar extends React.Component {
    render() {
        return(

            <nav >
      
                 <ul>
        
                    <li><Link to="/" className="#">Home</Link></li>

                    <li><Link to="/about" className="#">About</Link></li>

                    <li><Link to="/item_list" className="#">Item List</Link></li>

                 </ul>

             </nav>

        )
    }

}


export default Navbar;