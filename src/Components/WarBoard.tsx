import { Grid, Typography } from "@material-ui/core";
import { Theme, useTheme } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // backgroundColor:
    }
}));

export default function WarBoard(props) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Grid container className='root' spacing={3} style={{ backgroundColor: theme.palette.secondary.main, minHeight:'100vh' }}
                justifyContent="flex-start"
                alignItems="flex-start"
        >
            War board.


        </Grid>
    )
}
