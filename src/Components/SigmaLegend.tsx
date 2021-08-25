import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 50,
  },
});

function createData(tradeskill: string, colorHex: string) {
  return { tradeskill, colorHex};
}

const rows = [
    createData('Furnishing', "#F59FF5"),
    createData('Engineering', "#316A24"),
    createData('Outfitting', "#FE7123"),
    createData('Weaponsmithing', "#11D904"),
    createData('Cooking', "#06E3FE"),
    createData('Alchemy', "#89CFCF"),
    createData('Jewelcrafting', "#703735"),
    createData('Stonecutting', "#00D38C"),
    createData('Smelting', "#93A8FF"),
    createData('Leatherworking', "#FFA202"),
    createData('Woodworking (Not in graph)', "#999999"),
];

export default function Legend() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tradeskill (Edge Color)</TableCell>
            <TableCell align="right">Color Hex</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.tradeskill}>
              <TableCell component="th" scope="row">
                {row.tradeskill}
              </TableCell>
              <TableCell align="right" style={{backgroundColor: row.colorHex, color: 'white'}}>{row.colorHex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
