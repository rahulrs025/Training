import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import ItemService from '../services/ItemService';
import FormatService from '../services/FormatService';
import {  
    Card,
    CardBody,
    FormGroup,
    Input,
} from 'reactstrap';

// Custom Formatter component

class AdvancedGrid extends Component {
    constructor(props, context) {
        super(props, context);
        this.itemService = new ItemService();
        this.formatService = new FormatService();
        this.state = { rows: null, name : '', dept: '' };
        this.initColumnDefs();
    }

    DateFormatter = props => (
        <div className="text-center py-2">
            <span>{this.formatService.formatDate(props.value)}</span>
        </div>
    )

    initColumnDefs = () => {
        this._columns = [
            {
                key: 'name',
                name: 'Name',
                width: 300
            },
            {
                key: 'mobile',
                name: 'Mobile',
            },
            {
                key: 'department',
                name: 'Department'
            },
            {
                key: 'designation',
                name: 'Designation'
            },
            {
                key: 'attendance',
                name: 'Attendance %',
            },
            {
                key: 'dob',
                name: 'Date of birth',
                formatter: this.DateFormatter
            }
        ];
    };
    
    componentDidMount() {
        this.getItems();
    }
    
    getItems() {
        this.itemService.retrieveItems().then(items => {
            this.setState({rows: items});
        });
    }

    rowGetter = (i) => {
        return this.state.rows[i];
    }

    searchData =() => {
        this.itemService.filterItems({ name: this.state.name, dept: this.state.dept}).then(items => {
            this.setState({rows: items});
        });
    }

    handleNameChange =(event) => {
        this.setState({name: event.target.value});
    }

    handleDeptChange =(event) => {
        this.setState({dept: event.target.value});
    }

    render() {
        let comp;
        if(this.state.rows) {
            comp = <ReactDataGrid
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={500} />
        } else {
            comp = <div>Loading data...</div>
        }
        return  (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Advaced Data Grid</div>
                </div>
                <Card className="card-default">
                            <CardBody>
                                <form className="form-horizontal">
                                    <FormGroup row>
                                        <label className="col-xl-2 col-form-label">Name</label>
                                        <div className="col-xl-2">
                                            <Input type="text" placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
                                        </div>
                                        <label className="col-xl-2 col-form-label">Dept</label>
                                        <div className="col-xl-2">
                                            <Input type="text" placeholder="Dept" value={this.state.dept} onChange={this.handleDeptChange}/>
                                        </div>
                                        <div className="col-xl-3">
                                            <button className="btn btn-sm btn-secondary" onClick={this.searchData} type="button">Search</button>
                                        </div>
                                    </FormGroup>
                                </form>
                            </CardBody>
                        </Card>
                <Container fluid>
                    {comp}
                </Container>
            </ContentWrapper>
        )
    }
}

export default AdvancedGrid;