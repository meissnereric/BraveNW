import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //height: 180,

    },
    container: {
      display: 'flex',
      visability: 'hidden'
    },
    paper: {
      margin: theme.spacing(1),
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
  }),
);


export default function SimpleDropdown(props: {ddName: string, ddContent: any, extraContent?: any}) {
    const ddName = props.ddName
    const ddContent = props.ddContent
    const extra = props.extraContent
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };

  return (
    <div className={classes.root}>
      
        <Button onClick={handleChange} variant="contained">{ddName}</Button>
        {extra}
        {/* {checkboxFactory(checked, handleChange.bind(this), "Filter")} */}
        <div className={classes.container}>
            <Grow in={checked}>
                <Paper elevation={4} className={classes.paper}>
                    {ddContent}
                </Paper>
            </Grow>
        </div>
    </div>  
  );
}