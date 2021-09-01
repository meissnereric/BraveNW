import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';


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

function rowToShownFilter(fType, fValue, colorHex, filter) {
  if(!(fType in filter)){
    filter[fType] = {}
  }
  if(!(fValue in filter)){
    filter[fType][fValue] = {}
  }
  filter[fType][fValue] = Object.assign({}, filter[fType][fValue], {'isShown': DEFAULT_SHOWN, 'colorHex' : colorHex})
  return filter;
}



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
  
    if(!(fType in filter)){
      filter[fType] = {}
    }
    if(!(fValue in filter)){
      filter[fType][fValue] = {}
    }
    filter[fType][fValue] = Object.assign({}, filter[fType][fValue], {'isShown': DEFAULT_SHOWN, 'colorHex' : colorHex})
  }

var initShownFilter = {}
for (let row of Object.values(rows)) {
  addRowToShownFilter(row.filterType, row.filterValue, row.colorHex, initShownFilter)
}

export default function Legend(props) {
  const classes = useStyles();
  const updateItemFilters = props.updateItemFilters
  const updateSearchText = props.updateSearchText
  const [shownFilter, setShownFilter] = React.useState(initShownFilter);   
  const [searchText, setSearchText] = React.useState("");
  
  React.useEffect(() => {
    setShownFilter(shownFilter)
    setSearchText(searchText)
  }, [shownFilter, searchText]);

  // console.log(["Legend shown filter: ", shownFilter])

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    var checked = event.target.checked
      for (const [fType, fTypeValue] of Object.entries(shownFilter)) {
        for (const fValue of Object.keys(fTypeValue)) {
          shownFilter[fType][fValue]['isShown'] = checked
        }
      }
    setShownFilter(shownFilter);
    updateItemFilters(shownFilter)
    console.log(["handleCheckAll after change", shownFilter])
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var checked = event.target.checked

    var fType = event.target.id
    var fValue = event.target.name
    // console.log(["HandleChange before change", event.target.checked, shownFilter[fType][fValue]['isShown']])

    shownFilter[fType][fValue]['isShown'] = checked
    setShownFilter(shownFilter);
    updateItemFilters(shownFilter)
    console.log(["HandleChange after change", event.target.checked, shownFilter[fType][fValue]['isShown']])

  };

  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    var value = event.target.value.toLowerCase()
    setSearchText(value);
    updateSearchText(value)
    console.log(["handleSearchBar after change", value, searchText])

  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.root}>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField id="filled-basic" label="Search"
                         variant="filled" color="primary"
                         onChange={handleSearchBar}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}  />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Filter Type</TableCell>
            <TableCell>
            <Checkbox
                  defaultChecked
                  onChange={handleCheckAll}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                /> Filter Value</TableCell>
            <TableCell align="right">Color Hex (if applicable)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.filterValue}>
              <TableCell component="th" scope="row">
                {row.filterType}
              </TableCell>
              <TableCell align="right" style={{ backgroundColor: row.colorHex, color: 'white' }}>
                <Checkbox
                  checked={shownFilter[row.filterType][row.filterValue]['isShown']}
                  id={row.filterType}
                  name={row.filterValue}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />{row.filterValue}</TableCell>
              <TableCell align="right" style={{ backgroundColor: row.colorHex, color: 'white' }}>{row.colorHex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
