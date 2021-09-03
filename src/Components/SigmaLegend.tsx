import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme, useTheme } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { initShownFilter, splitRows } from './FilteringData';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 50,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },

  },
  input: {
    color: theme.palette.secondary.contrastText,
  },
  drawer: {
    // width: 240,
    // flexShrink: 0,
    flexGrow: 1
  },
  maxWidth: {
    width: "100%"
  }
}));



export default function Legend(props) {
  const classes = useStyles();
  const theme = useTheme();
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
        style={{ backgroundColor: row.colorHex, color: 'white', margin: 2, padding: 5, textAlign: 'left' }}
        control={
          <Checkbox
            checked={shownFilter[row.filterType][row.filterValue]['isShown']}
            id={row.filterType}
            name={row.filterValue}
            onChange={handleChange}
            style={{ margin: 1, padding: 2 }}
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

    return [rows]
  }

  return (
    <div className={classes.drawer}>
      <TextField id="filled-basic" label="Search"
        variant="filled" color="secondary"
        onChange={handleSearchBar}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        className={classes.maxWidth}
        style={{ backgroundColor: 'gray', color: 'white', margin: 2, padding: 5 }}
        control={<Checkbox
          style={{ margin: 1, padding: 2 }}
          defaultChecked
          onChange={handleCheckAll}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        }
        label='Enable All'
      />
      <Typography>Rarity (Node Color)
      </Typography>
      {makeFilterList('Rarity')}
      <Divider />
      <Typography>Tradeskill (Edge Color)</Typography>
      {makeFilterList('Tradeskill')}
      <Divider />
      <Typography>Item Type</Typography>
      {makeFilterList('ItemType')}
    </div>
  )
}
