import React, { Component } from 'react';
import { Button } from 'antd';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class ScoreTable extends Component {
  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.newState(data);
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  renderEditableScore = cellInfo => {
    if (
      cellInfo.value >= 0 &&
      cellInfo.value <= 100 &&
      typeof Number(cellInfo.value) === 'number'
    ) {
      return (
        <div
          style={{ backgroundColor: '#fafafa' }}
          contentEditable
          suppressContentEditableWarning
          onBlur={e => {
            const data = [...this.props.data];
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.props.newState(data);
          }}
          dangerouslySetInnerHTML={{
            __html: this.props.data[cellInfo.index][cellInfo.column.id]
          }}
        />
      );
    } else {
      return (
        <div
          style={{ backgroundColor: '#fafafa' }}
          contentEditable
          contentEditableWarning
          onBlur={e => {
            const data = [...this.props.data];
            data[cellInfo.index][cellInfo.column.id] = 0;
            this.props.newState(data);
          }}
          dangerouslySetInnerHTML={{
            __html: this.props.data[cellInfo.index][cellInfo.column.id]
          }}
        />
      );
    }
  };

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
