import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { initShownFilter, splitRows } from './FilteringData';
import Divider from '@material-ui/core/Divider';
import  Typography  from '@material-ui/core/Typography';

import SimpleDropdown from './SimpleDropdown';
import TabManager from './SimpleTabPanel';
import PersistentDrawerLeft from './PersistantDrawer';


const useStyles = makeStyles((theme) => ({

  table: {
    minWidth: 50,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
   
  },
  drawer: {
    width: 240,
    // flexShrink: 0,
    flexGrow: 1
  },
  maxWidth: {
    width: "100%"
  }
}));



export default function Legend(props) {
  const classes = useStyles();
  const updateItemFilters = props.updateItemFilters
  const updateSearchText = props.updateSearchText
  const [shownFilter, setShownFilter] = React.useState(initShownFilter);
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    updateItemFilters(shownFilter)
    updateSearchText(searchText)
  }, [updateItemFilters, updateSearchText, shownFilter, searchText]);

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    var checked = event.target.checked
    for (const [fType, fTypeValue] of Object.entries(shownFilter)) {
      for (const fValue of Object.keys(fTypeValue)) {
        shownFilter[fType][fValue]['isShown'] = checked
      }
    }

    setShownFilter(shownFilter);
    updateItemFilters(shownFilter)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var checked = event.target.checked

    var fType = event.target.id
    var fValue = event.target.name

    shownFilter[fType][fValue]['isShown'] = checked
    setShownFilter(shownFilter);
    updateItemFilters(shownFilter)
  };

  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    var value = event.target.value.toLowerCase()
    setSearchText(value);
    updateSearchText(value)
  };

  const makeFilterList = (filterType) => {
    var makeRow = (row) => {
      return <FormControlLabel
        className={classes.maxWidth}
        style={{ backgroundColor: row.colorHex, color: 'white' }}
        control={
          <Checkbox
            checked={shownFilter[row.filterType][row.filterValue]['isShown']}
            id={row.filterType}
            name={row.filterValue}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label={row.filterValue}
      />
    }

    var rows = []
    if (filterType === 'Rarity') {
      rows = splitRows.rarity.map((row) => makeRow(row))
    }
    else if (filterType === 'Tradeskill') {
      rows = splitRows.tradeskill.map((row) => makeRow(row))
    }
    else if (filterType === 'ItemType') {
      rows = splitRows.itemType.map((row) => makeRow(row))
    }

    var checkAllBox = <FormControlLabel
      className={classes.maxWidth}
      style={{ backgroundColor: 'grey', color: 'white' }}
      control={<Checkbox
        defaultChecked
        onChange={handleCheckAll}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      }
      label='Enable All'
    />
      console.log("rows: ", rows)
    return [checkAllBox, rows]
  }

  return (
    // <PersistentDrawerLeft 
    // lLabel="Filters" 
    // lDisplay={[
    //   {
    //     label: "Rarity",
    //     tabContent: makeFilterList('Rarity'),
    //   },
    //   {
    //     label: "Tradeskills",
    //     tabContent: makeFilterList('Tradeskill'),
    //   },
    //   {
    //     label: "ItemType",
    //     tabContent: makeFilterList('ItemType'),
    //   }
    // ]} 
    // rLabel="Selected"
    // rDisplay="whatsup bitch"
    
    // />
    <div className={classes.drawer}>
      <Typography>Rarity</Typography>
        {makeFilterList('Rarity')}
        <Divider />
        <Typography>Tradeskills</Typography>
        {makeFilterList('Tradeskills')}
        <Divider />
        <Typography>Item Type</Typography>
        {makeFilterList('ItemType')}
    </div>
    // <Grid container>
    //   <Grid item xs={12}>
    //     <SimpleDropdown
    //       ddName="Filter"
    //       extraContent={
    //         <TextField id="filled-basic" label="Search"
    //         variant="filled" color="primary"
    //         onChange={handleSearchBar}
    //         InputProps={{
    //           startAdornment: (
    //             <InputAdornment position="start">
    //               <SearchIcon />
    //             </InputAdornment>
    //           ),
    //         }} 
    //       />}
    //       ddContent={
    //         <TabManager tabsData={[
    //           {
    //             label: "Rarity",
    //             tabContent: makeFilterList('Rarity'),
    //           },
    //           {
    //             label: "Tradeskills",
    //             tabContent: makeFilterList('Tradeskill'),
    //           },
    //           {
    //             label: "ItemType",
    //             tabContent: makeFilterList('ItemType'),
    //           }
    //         ]}
    //         />
    //       } />
    //       <PersistentDrawerLeft label="Filters" display={[
    //           {
    //             label: "Rarity",
    //             tabContent: makeFilterList('Rarity'),
    //           },
    //           {
    //             label: "Tradeskills",
    //             tabContent: makeFilterList('Tradeskill'),
    //           },
    //           {
    //             label: "ItemType",
    //             tabContent: makeFilterList('ItemType'),
    //           }
    //         ]} />
    //   </Grid>
    // </Grid>
  )
}
