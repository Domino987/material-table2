import { Column } from "react-table";

type TableColumn<D extends object> = Column<D> & CUstomColumn<D>;

interface CUstomColumn<D extends object> {
    type: 'date' | 'datetime' | 'time' | 'boolean' | 'numeric' | 'currency';
    Cell?: ({ value }: { value: unknown }) => JSX.Element;
    emptyValue: string | number | ((value: Column<D>) => React.ReactChild);
}


interface ToolbarProps {
    title?: string | JSX.Element;
    disableSearch?: boolean;
    hideToolbar?: boolean;
}

export type {
    TableColumn,
    ToolbarProps
}