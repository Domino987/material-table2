import Typography from '@material-ui/core/Typography/Typography';
import {
  IconButton,
  InputAdornment,
  TextField,
  Toolbar as MToolbar,
  Tooltip,
} from '@material-ui/core';
import * as React from 'react';
import { Search, Clear as ResetSearch } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useAsyncDebounce } from 'react-table';
import { Theme } from '@material-ui/core';

interface Props {
  title?: string | JSX.Element;
  hideToolbar?: boolean;
  hideSearch?: boolean;
  searchValue?: string;
  setGlobalFilter: (nextValue: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  spacer: {
    flex: '1 1 10%',
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

function TableToolbar({
  title,
  hideToolbar,
  hideSearch,
  searchValue = '',
  setGlobalFilter,
}: Props) {
  const classes = useStyles();
  if (hideToolbar === true) {
    return null;
  }
  return (
    <MToolbar className={classes.root}>
      {title && renderToolbarTitle(title)}
      <div className={classes.spacer} />
      {hideSearch !== false && renderSearch(searchValue, setGlobalFilter)}
    </MToolbar>
  );
}

function renderToolbarTitle(title: string | JSX.Element) {
  const toolBarTitle =
    typeof title === 'string' ? (
      <Typography
        variant="h6"
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </Typography>
    ) : (
      title
    );

  return <div>{toolBarTitle}</div>;
}

function renderSearch(
  searchValue: string,
  setGlobalFilter: (nextValue: string) => void
) {
  const [value, setValue] = React.useState(searchValue);
  const onChange = useAsyncDebounce((value: string) => {
    setGlobalFilter(value);
  }, 200);

  React.useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);
  return (
    <TextField
      value={value}
      onChange={event => {
        console.log(event.target.value);
        setValue(event.target.value);
        onChange(event.target.value);
      }}
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Tooltip title="Search">
              <Search fontSize="small" />
            </Tooltip>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={!searchValue}
              onClick={() => setGlobalFilter('')}
            >
              <ResetSearch fontSize="small" aria-label="clear" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export { TableToolbar };
