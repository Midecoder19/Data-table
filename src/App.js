// App.js
import React from 'react';
import TableWithFeatures from './DataTable'; // Adjust the path as needed

const columns = [
  {
    Header: 'Name',
    accessor: 'name', // accessor is the "key" in the data
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  // Add more columns as needed
];

const data = [
  { name: 'Alice', age: 28, email: 'alice@example.com' },
  { name: 'Bob', age: 34, email: 'bob@example.com' },
  // Add more data as needed
];

function App() {
  return <TableWithFeatures columns={columns} data={data} />;
}

export default App;
