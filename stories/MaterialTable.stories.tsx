import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MaterialTable} from '../src';
import type { Data, Props } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: MaterialTable,
  args: {
    toolbarProps: { title: 'Material Table' },
    columns: [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    data: [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type TemplateType<D extends Data> = Story<Props<D>>;

const Template: TemplateType<Data> = args => {
  return <MaterialTable {...args} />;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  toolbarProps: { title: 'Material Table' },
    columns: [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    data: [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],  
};
