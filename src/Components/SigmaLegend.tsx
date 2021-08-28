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

import SimpleDropdown from './SimpleDropdown';

const useStyles = makeStyles({
  table: {
    minWidth: 50,
  },
});

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
var isShownFilter = {}


export default function Legend(props) {
  const classes = useStyles();
  const updateItemFilters = props.updateItemFilters
  const [firstRender, setFirstRender] = React.useState(true);
  const [shownFilter, setShownFilter] = React.useState(isShownFilter);    

  if(firstRender){
    rows.map((row) => (rowToShownFilter(row.filterType, row.filterValue, row.colorHex, isShownFilter)))
    updateItemFilters(shownFilter)
    setFirstRender(false)
  }

  console.log(["Legend shown filter: ", shownFilter])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var checked = event.target.checked

    var fType = event.target.id
    var fValue = event.target.name

    shownFilter[fType][fValue]['isShown'] = checked
    setShownFilter(shownFilter);
    updateItemFilters(shownFilter)
  };

  return (

    <SimpleDropdown ddName="Filter" ddContent={
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Filter Type</TableCell>
            <TableCell>
              Filter Value</TableCell>
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
                  defaultChecked
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
    } />


    // <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>
    //           Filter Type</TableCell>
    //         <TableCell>
    //           Filter Value</TableCell>
    //         <TableCell align="right">Color Hex (if applicable)</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <TableRow key={row.filterValue}>
    //           <TableCell component="th" scope="row">
    //             {row.filterType}
    //           </TableCell>
    //           <TableCell align="right" style={{ backgroundColor: row.colorHex, color: 'white' }}>
    //             <Checkbox
    //               defaultChecked
    //               id={row.filterType}
    //               name={row.filterValue}
    //               onChange={handleChange}
    //               inputProps={{ 'aria-label': 'primary checkbox' }}
    //             />{row.filterValue}</TableCell>
    //           <TableCell align="right" style={{ backgroundColor: row.colorHex, color: 'white' }}>{row.colorHex}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
