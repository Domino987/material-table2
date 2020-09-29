import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MaterialTable} from '../src';
import type { Props } from '../src';

const columns =  [
  {
    Header: 'Column 1',
    accessor: 'col1', // accessor is the "key" in the data
  },
  {
    Header: 'Column 2',
    accessor: 'col2',
    type: "numeric"
  },
  {
    Header: 'Column 3',
    accessor: 'col3',
    type: "datetime"
  },
];

const data =  [
  {
    col1: 'Hello',
    col2: 'World',
    col3: new Date()
  },
  {
    col1: 'react-table',
    col2: 'rocks',
    col3: new Date()
  },
  {
    col1: 'whatever',
    col2: false,
    col3: new Date()
  },
];

const meta: Meta = {
  title: 'Welcome',
  component: MaterialTable,
  args: {
    toolbarProps: { title: 'Material Table' },
    columns,
    data
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type TemplateType<D extends object> = Story<Props<D>>;

const Template: TemplateType<object> = args => <MaterialTable {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  toolbarProps: { title: 'Material Table' },
    columns,
    data  
};
