import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid'

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

function createData(filterType: string, filterValue: string, colorHex: string) {
  return { filterType, filterValue, colorHex };
}

const rows = [
  createData('Rarity', 'Common', "#C8C8C8"),
  createData('Rarity', 'Uncommon', "#07C02F"),
  createData('Rarity', 'Rare', "#00CBE9"),
  createData('Rarity', 'Epic', "#FF16F7"),
  createData('Rarity', 'Legendary', "#EA5B1C"),
  createData('Rarity', 'Unknown', "#000000"),
  createData('Tradeskill', 'Armoring', "#F59FF5"),
  createData('Tradeskill', 'Furnishing', "#F59FF5"),
  createData('Tradeskill', 'Engineering', "#316A24"),
  createData('Tradeskill', 'Outfitting', "#FE7123"),
  createData('Tradeskill', 'Weaponsmithing', "#11D904"),
  createData('Tradeskill', 'Cooking', "#06E3FE"),
  createData('Tradeskill', 'Arcana', "#89CFCF"),
  createData('Tradeskill', 'Jewelcrafting', "#703735"),
  createData('Tradeskill', 'Stonecutting', "#00D38C"),
  createData('Tradeskill', 'Smelting', "#93A8FF"),
  createData('Tradeskill', 'Leatherworking', "#FFA202"),
  createData('Tradeskill', 'Weaving', "#FFA202"),
  createData('Tradeskill', 'Woodworking', "#999999"),
  createData('Tradeskill', 'Item Category', "#000000"),
];

const DEFAULT_SHOWN = true

/*
Format for this is as follows: 
isShownFilter = {
  'Rarity': {
    'Common': {
      'isShown': true,
      'colorHex': "#C8C8C8"
    }
    'Uncommon': false
  },
  'Tradeskill': {
    'Armoring': true,
    'Smelting': false
  }
}
*/

function addRowToShownFilter(fType, fValue, colorHex, filter) {

  if (!(fType in filter)) {
    filter[fType] = {}
  }
  if (!(fValue in filter)) {
    filter[fType][fValue] = {}
  }
  filter[fType][fValue] = Object.assign({}, filter[fType][fValue], { 'isShown': DEFAULT_SHOWN, 'colorHex': colorHex })
}

var initShownFilter = {}
for (let row of Object.values(rows)) {
  addRowToShownFilter(row.filterType, row.filterValue, row.colorHex, initShownFilter)
}

const rowsSplitter = (rows) => {
  let rarity = []
  let tradeskill = []
  rows.forEach(element => {
    if (element.filterType === "Rarity") {
      rarity.push(element)
    }
    if (element.filterType === "Tradeskill")
      tradeskill.push(element)
  });
  return { rarity, tradeskill }
}

export default function Legend(props) {
  const classes = useStyles();
  const updateItemFilters = props.updateItemFilters
  const updateSearchText = props.updateSearchText
  const [shownFilter, setShownFilter] = React.useState(initShownFilter);
  const [searchText, setSearchText] = React.useState("");
  const splitRows = rowsSplitter(rows)

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
