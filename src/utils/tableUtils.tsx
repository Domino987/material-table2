import * as React from 'react';
import { Column, UseTableCellProps } from 'react-table';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { TableColumn } from '../../types';

function transformColumTypes<D extends object>(
  colums: TableColumn<D>[]
): Column<D>[] {
  return colums.map(column => {
    switch (column.type) {
      case 'date':
        return {
          ...column,
          Cell: column.Cell || dateRenderer,
        };
      case 'datetime':
        return {
          ...column,
          Cell: column.Cell || datetimeRenderer,
        };
      case 'time':
        return {
          ...column,
          Cell: column.Cell || timeRenderer,
        };
      case 'boolean':
        return {
          ...column,
          Cell: column.Cell || boolRenderer,
        };
      case 'currency':
      case 'numeric':
        return {
          ...column,
          Cell: column.Cell || numRenderer,
        };
      default:
        return column;
    }
  });
}

function numRenderer<D extends object>({
  value,
}: UseTableCellProps<D>): React.ReactChild {
  const style = {
    textAlign: 'right',
  } as const;
  return <div style={style}>{value}</div>;
}

function boolRenderer<D extends object>({
  value,
}: UseTableCellProps<D>): React.ReactChild {
  const style = {
    textAlign: 'left',
    verticalAlign: 'middle',
    width: 48,
  } as const;
  if (value) {
    return <CheckBoxIcon style={style} />;
  } else {
    return <CheckBoxOutlineBlankIcon style={style} />;
  }
}

function timeRenderer<D extends object>({
  value,
}: UseTableCellProps<D>): React.ReactChild {
  if (value instanceof Date) {
    return value.toLocaleTimeString();
  } else {
    return String(value);
  }
}

function dateRenderer<D extends object>({
  value,
}: UseTableCellProps<D>): React.ReactChild {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  } else {
    return String(value);
  }
}

function datetimeRenderer<D extends object>({
  value,
}: UseTableCellProps<D>): React.ReactChild {
  if (value instanceof Date) {
    return `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`;
  } else {
    return String(value);
  }
}

export { transformColumTypes };
