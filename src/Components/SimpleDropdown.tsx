import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button'
import { Check } from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';
import { boolean } from 'yargs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 180,
    },
    container: {
      display: 'flex',
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



const checkboxFactory = (checked: boolean, onChange: () =>{}, label: string) => {   
    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} />}
            label={label}
        />   
    )
}

export default function SimpleDropdown(props: {ddName: string, ddContent: any}) {
    const ddName = props.ddName
    const ddContent = props.ddContent
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>

        <Button onClick={handleChange} variant="contained">{ddName}</Button>
        {/* {checkboxFactory(checked, handleChange.bind(this), "Filter")} */}
        <div className={classes.container}>
            <Grow in={checked}>
                <Paper elevation={4} className={classes.paper}>
                    {ddContent}
                </Paper>
            </Grow>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
        {/* <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Paper elevation={4} className={classes.paper}>
            <svg className={classes.svg}>
              <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
            </svg>
          </Paper>
        </Grow> */}
        </div>
    </div>

    
  );
}