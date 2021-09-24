import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';


const UserAuth = (props) => {
    const buttonStyle = props
    console.log("buttonStyle: ", buttonStyle)
    const { isAuthenticated, logout, loginWithRedirect } = useAuth0()
  
    if (isAuthenticated) {
        
        return (
        <Button variant="contained" className={buttonStyle} color="secondary" onClick={() => logout({ returnTo: window.location.origin })} >Logout</Button> 

    );
    } else if (!isAuthenticated) {

        return (
        <Button variant="contained" className={buttonStyle} color="secondary" onClick={() => loginWithRedirect()} >Login</Button> 

        )
    }
}

export default UserAuth