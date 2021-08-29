import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createTextSpanFromBounds } from 'typescript';

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

function asignId(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


const createTabs = (tabInfo: any) => {
  let createdTabs = {tabs: [], panels: []}
  let c = 0 // for assinging tab id
  tabInfo.forEach(e => {
      createdTabs.tabs.push(<Tab label={e.label} {...asignId(c)}/>)
      createdTabs.panels.push(<TabPanel value={c} index={c}>{e.tabContent}</TabPanel>)
 
    c++
  })
  return createdTabs
}

export default class TabManager extends React.Component<{tabsData: any},{value: number}> {
  constructor(props) {
    super(props)
    this.state = {
      value: 0, 
      //createdTabs: this.createTabs(props.tabsData),
    }
    //this.handleChange.bind(this)
  }

  createTabs = (tabInfo: any) => {
    let createdTabs = {tabs: [], panels: []}
    let c = 0 // for assinging tab id
    tabInfo.forEach(e => {
        createdTabs.tabs.push(<Tab label={e.label} {...asignId(c)}/>)
        createdTabs.panels.push(<TabPanel value={this.state.value} index={c}>{e.tabContent}</TabPanel>)
   
      c++
    })
    return createdTabs
  }
  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({value: newValue})
  };
  
  render(){
    let createdTabs = this.createTabs(this.props.tabsData)
    return(
      <div className={null}>
      <AppBar position="static">
        <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
            
            {console.log(this.state.value)}
            {createdTabs.tabs}
            
        </Tabs>
      </AppBar>
      {createdTabs.panels}
  
    </div>
    )
  }
}

// export default function SimpleTabs(props) {
//     const tabsData = props.tabsData 
//     const createdTabs = createTabs(tabsData)
//   const classes = useStyles();
//   // the displayed TabPanel is the one with corresponding assigned id
//   const [value, setValue] = React.useState(createdTabs.tabs.length);

//   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//             {console.log(tabsData)}
//             {console.log(value)}
//             {createdTabs.tabs}
            
//             {/* <Tab label="test"></Tab>
//           <Tab label="Item One" {...asignId(0)} />
//           <Tab label="Item Two" {...asignId(1)} />
//           <Tab label="Item Three" {...asignId(2)} /> */}
//         </Tabs>
//       </AppBar>
//       {createdTabs.panels}
//         {/* {tabsData.map((e) => {
//                 <TabPanel value={e.value} index={e.index}>
//                     {e.tabContent}
//                 </TabPanel>
//         })}
//       <TabPanel value={value} index={0}>
//         Item One
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel> */}
//     </div>
//   );
// }