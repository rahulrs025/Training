import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';

// Custom Formatter component
const PercentCompleteFormatter = props => (
    <div className="text-center py-2">
        <span>{props.value}%</span>
    </div>
)

class BasicGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this.initColumnDefs();
        this.loadGridData();
    }

    initColumnDefs = () => {
        this._columns = [
            {
                key: 'name',
                name: 'Full Name',
                width: 300
            },
            {
                key: 'mobile',
                name: 'Mobile',
                sortable: true
            },
            {
                key: 'department',
                name: 'Department'
            },
            {
                key: 'designation',
                name: 'Designation',
                resizable: true
            },
            {
                key: 'attendance',
                name: 'Attendance %',
                formatter: PercentCompleteFormatter
            }
        ];
    };

    loadGridData = () => {
        let rows = [
            { name : 'John', mobile: '9876543210', department: 'Tech', designation: 'Developer', attendance: 90},
            { name : 'Marry', mobile: '1234567890', department: 'QA', designation: 'Test Engineer', attendance: 95},
        ]
        this.state = { originalRows: rows, rows: rows };
    }

    rowGetter = (i) => {
        return this.state.rows[i];
    }

    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };
        console.error('test')
        const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
        this.setState({ rows });
    };

    render() {
        return  (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Basic Data Grid</div>
                </div>
                <Container fluid>
                    <ReactDataGrid
                        onGridSort={this.handleGridSort}
                        columns={this._columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.state.rows.length}
                        minHeight={500} />
                </Container>
            </ContentWrapper>
        )
    }
}

export default BasicGrid;