import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { generateEmployeePairs } from '../utils.js';
import { useState, useEffect, Fragment } from 'react';
import { COLUMN_NAMES } from '../AppConstants.js';

const styles = {
  tableContainer: {marginBottom: '5rem' }
}
const DataGrid = ( {groupedByProject}) => {
  const [employeePairs, setEmployeePairs] = useState([]);

  useEffect(()=> {
    setEmployeePairs(generateEmployeePairs(groupedByProject));
  },[groupedByProject])

  return (
    <Fragment>
    <TableContainer sx={styles.tableContainer} component={Paper}>
      <Table aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell>{COLUMN_NAMES.EMPLOYEE_ID_1}</TableCell>
            <TableCell align="right">{COLUMN_NAMES.EMPLOYEE_ID_2}</TableCell>
            <TableCell align="right">{COLUMN_NAMES.PROJECT_ID}</TableCell>
            <TableCell align="right">{COLUMN_NAMES.DAYS_WORKED}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeePairs.map(({employeeIds, overlappingDays, projectId}) => (
            <TableRow
              key={`${employeeIds[0]}-${employeeIds[1]}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {employeeIds[0]}
              </TableCell>
              <TableCell align="right">{employeeIds[1]}</TableCell>
              <TableCell align="right">{projectId}</TableCell>
              <TableCell align="right">{overlappingDays}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Fragment>
  );
}

export default DataGrid;