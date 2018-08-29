import React, { Component } from 'react';
import { Button } from 'antd';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class ScoreTable extends Component {
  render() {
    const { data, deleteRow } = this.props;

    return (
      <div>
        <ReactTable
          data={data}
          style={{ fontSize: 20 }}
          columns={[
            {
              Header: 'Name',
              accessor: 'name'
            },
            {
              Header: 'Score',
              accessor: 'score'
            },
            {
              accessor: 'id',
              Cell: v => (
                <Button type="danger" onClick={() => deleteRow(v.value)}>
                  Delete
                </Button>
              )
            }
          ]}
          defaultSorted={[
            {
              id: 'score',
              asc: true
            },
            {
              id: 'name',
              asc: true
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
