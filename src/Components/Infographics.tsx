import React from "react";
import infographic from '../data/infographic.jpg'; // Tell webpack this JS file uses this image
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";

class Infographics extends React.Component{
    render(){
        return(
            <Grid item>
                <Container className="infographic">
                    <img src={infographic} alt="Logo" />
                </Container>
            </Grid>
        )
    }
}

export default Infographics