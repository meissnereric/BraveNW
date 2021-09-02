import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function assignId(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.light,
  },
});

class TabManager extends React.Component<{ tabsData: any, classes: any }, { value: number }> {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }

  createTabs = (tabInfo: any) => {
    let createdTabs = { tabs: [], panels: [] }
    let c = 0 // for assinging tab id
    tabInfo.forEach(e => {
      createdTabs.tabs.push(<Tab label={e.label} {...assignId(c)} />)
      createdTabs.panels.push(<TabPanel value={this.state.value} index={c}>{e.tabContent}</TabPanel>)

      c++
    })
    return createdTabs
  }
  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ value: newValue })
  };

  render() {
    const { classes } = this.props;
    let createdTabs = this.createTabs(this.props.tabsData)
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.state.value}
           onChange={this.handleChange}
            indicatorColor="secondary"
           //  textColor="secondary"
           aria-label="filter tabs">
           {createdTabs.tabs}
          </Tabs>
        </AppBar>
        {createdTabs.panels}

      </div>
    )
  }
}

export default withStyles(styles)(TabManager)
