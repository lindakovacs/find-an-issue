import React, { Component } from 'react'

import { TableHeaderColumn, BootstrapTable } from 'react-bootstrap-table'

import './Table.css'
import data from '../../data.json'

function urlFormatter(cell, row) {
  return (
    <a href={cell.S} className="badge badge-success">
      Issue
    </a>
  )
}

function dateFormatter(cell, row) {
  const now = new Date().getTime()
  const miliseconds = now - Number(cell.S)
  const seconds = Number(Math.floor(miliseconds / 1000))
  const minutes = Number(Math.floor(seconds / 60))
  const hours = Number(Math.floor(minutes / 60))
  const days = Number(Math.floor(hours / 24))
  return days
}

function repoFormatter(cell, row) {
  return cell.S.split('_').join('/')
}

function labelsFormatter(cell, row) {
  return cell.S.split(',').join(', ')
}

function languageFormatter(cell, row) {
  return cell.S
}

function titleFormatter(cell, row) {
  return cell.S
}

class Table extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      data: data.Items,
      loading: true
    }
  }
  //this.refs.table.handleFilterData

  render() {
    return (
      <React.Fragment>
        {!this.state.loading ? (
          <div className="loading-container">
            <div className="lds-ring">
              <div />
              <div />
            </div>
            <div>Data Loading...</div>
          </div>
        ) : (
          <BootstrapTable
            ref="table"
            data={this.state.data}
            hover
            condensed
            pagination
          >
            <TableHeaderColumn
              isKey={true}
              ref="Title"
              dataField="Title"
              dataFormat={titleFormatter}
            >
              Title
            </TableHeaderColumn>
            <TableHeaderColumn
              ref="Repo"
              dataField="Repo"
              filterFormatted={true}
              filter={{ type: 'TextFilter', placeholder: 'Name of repo is...' }}
              dataFormat={repoFormatter}
            >
              Repo
            </TableHeaderColumn>
            <TableHeaderColumn
              ref="Language"
              dataField="Language"
              filterFormatted={true}
              filter={{
                type: 'TextFilter',
                placeholder: 'Language?',
                condition: 'eq'
              }}
              dataFormat={languageFormatter}
            >
              Language
            </TableHeaderColumn>
            <TableHeaderColumn
              ref="Labels"
              dataField="Labels"
              filterFormatted={true}
              filter={{ type: 'TextFilter', placeholder: 'Label?' }}
              dataFormat={labelsFormatter}
            >
              Labels
            </TableHeaderColumn>
            <TableHeaderColumn
              ref="Time"
              dataField="Time"
              filterFormatted={true}
              dataFormat={dateFormatter}
              filter={{
                type: 'NumberFilter',
                delay: 1000,
                numberComparators: ['=', '>', '<']
              }}
            >
              Days Old
            </TableHeaderColumn>
            <TableHeaderColumn
              ref="Url"
              dataField="Url"
              dataFormat={urlFormatter}
            >
              URL
            </TableHeaderColumn>
          </BootstrapTable>
        )}
      </React.Fragment>
    )
  }
}

export default Table
