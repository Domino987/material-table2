import * as React from 'react';
import {
  useTable,
  useGlobalFilter,
  UseTableOptions,
  useFilters,
} from 'react-table';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TableToolbar } from './TableToolbar';
import { Theme } from '@material-ui/core';

interface Data {
  Header: string;
  accessor: string;
  type?: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency';
}

interface Props<D extends Data> extends UseTableOptions<D> {
  toolbarProps?: Partial<{
    title: string | JSX.Element;
    hideToolbar: boolean;
  }>;
}

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

export const MaterialTable = <D extends Data>(props: Props<D>) => {
  const classes = useStyles();
  const { toolbarProps, ...tableProps } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(tableProps, useGlobalFilter, useFilters);

  return (
    <Paper className={classes.paper}>
      <TableToolbar
        {...toolbarProps}
        searchValue={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-label="table"
          {...getTableProps()}
        >
          <TableHead>
            {// Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <TableCell {...column.getHeaderProps()}>
                    {// Render the header
                    column.render('Header')}
                    <div>
                      {column.canFilter && column.Filter ? column.render('Filter') : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <TableRow {...row.getRowProps()}>
                  {// Loop over the rows cells
                  row.cells.map(cell => {
                    // Apply the cell props
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {// Render the cell contents
                        cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export type {
  Data,
  Props
}