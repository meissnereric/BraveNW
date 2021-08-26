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

const useStyles = makeStyles({
  table: {
    minWidth: 50,
  },
});

function createData(filterType:string, filterValue: string, colorHex: string) {
  return { filterType, filterValue, colorHex};
}

const rows = [
    createData('Rarity', 'Common', "#C8C8C8"),
    createData('Rarity', 'Uncommon', "#07C02F"),
    createData('Rarity', 'Rare', "#00CBE9"),
    createData('Rarity', 'Epic', "#FF16F7"),
    createData('Rarity', 'Legendary', "#EA5B1C"),
    createData('Rarity', 'Unknown', "#000000"),
    createData('Tradeskill', 'Furnishing', "#F59FF5"),
    createData('Tradeskill', 'Engineering', "#316A24"),
    createData('Tradeskill', 'Outfitting', "#FE7123"),
    createData('Tradeskill', 'Weaponsmithing', "#11D904"),
    createData('Tradeskill', 'Cooking', "#06E3FE"),
    createData('Tradeskill', 'Alchemy', "#89CFCF"),
    createData('Tradeskill', 'Jewelcrafting', "#703735"),
    createData('Tradeskill', 'Stonecutting', "#00D38C"),
    createData('Tradeskill', 'Smelting', "#93A8FF"),
    createData('Tradeskill', 'Leatherworking', "#FFA202"),
    createData('Tradeskill', 'Woodworking (Not in graph)', "#999999"),
];

const initialChecklist = []

export default function Legend(props) {
  const classes = useStyles();
  const updateItemFilters = props.updateItemFilters

  const [checkedList, setCheckedList] = React.useState([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var checked = event.target.checked

    var tid = event.target.id
    var tname = event.target.name
    var target = {'filterType': tid, 'filterValue': tname}
    if(checked){
      checkedList.push(target)
      setCheckedList(checkedList);
    }
    else{
      const idx = checkedList.indexOf(target)
      checkedList.splice(idx, 1);
    }
    updateItemFilters(checkedList)
  };

  return (
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
              <TableCell align="right" style={{backgroundColor: row.colorHex, color: 'white'}}>
                <Checkbox
                // defaultChecked
                id={row.filterType}
                name={row.filterValue}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
               />{row.filterValue}</TableCell>
              <TableCell align="right" style={{backgroundColor: row.colorHex, color: 'white'}}>{row.colorHex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
