import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { initShownFilter, splitRows } from './FilteringData';

import SimpleDropdown from './SimpleDropdown';
import TabManager from './SimpleTabPanel';


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
        style={{ backgroundColor: row.colorHex, color: 'white' }}
        control={
          <Checkbox
            checked={shownFilter[row.filterType][row.filterValue]['isShown']}
            defaultChecked
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

    var checkAllBox = <FormControlLabel
      style={{ backgroundColor: 'grey', color: 'white' }}
      control={<Checkbox
        defaultChecked
        onChange={handleCheckAll}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      }
      label='Enable All'
    />

    return [checkAllBox, rows]
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField id="filled-basic" label="Search"
          variant="filled" color="primary"
          onChange={handleSearchBar}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }} />
        <SimpleDropdown
          ddName="Filter"
          ddContent={
            <TabManager tabsData={[
              {
                label: "Rarity",
                tabContent: makeFilterList('Rarity'),
              },
              {
                label: "Tradeskills",
                tabContent: makeFilterList('Tradeskill'),
              }
            ]}
            />
          } />

      </Grid>
    </Grid>
  )
}
