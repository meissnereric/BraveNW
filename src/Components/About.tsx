import React from "react";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

class About extends React.Component{
    render(){
        return(
            <div>
                
                <Grid item>
                <Tooltip disableFocusListener disableTouchListener title="Add">
                    <Button>Hover</Button>
                </Tooltip>
                </Grid>
            </div>
        )
    }
}

export default About