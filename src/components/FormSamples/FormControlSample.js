import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import {
    Row, Col, Card,
    CardHeader,
    CardBody, Input, FormGroup
} from 'reactstrap';
import FormValidator from './FormValidator.js';
import lookup from './options.js';

// DateTimePicker
import Datetime from 'react-datetime';

// React Select
import Select from 'react-select';



class FormControlSample extends React.Component {

    state = {
        formRegister: {
            firstName: '',
            email: '',
            mobile: '',
            dob: null,
            officestarttime: null,
            timeonly: null,
            password: '',
            password2: '',
            terms: false
        },
        selectedOption: null,
        selectedOptionMulti: [],
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
    }

    handleChangeSelectMulti = (selectedOptionMulti) => {
        this.setState({ selectedOptionMulti });
        console.log(`Selected Multi: ${selectedOptionMulti.label}`);
    }

    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                [input.name]: value,
                errors: {
                    ...this.state[form.name].errors,
                    [input.name]: result
                }
            }
        });

    }

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return this.state[formName] &&
            this.state[formName].errors &&
            this.state[formName].errors[inputName] &&
            this.state[formName].errors[inputName][method]
    }

    render() {

        // used for react select
        const value = this.state.selectedOption;
        let { selectedOptionMulti } = this.state.selectedOptionMulti;
        
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Form Controls
                   </div>
                </div>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                               Sample Form
                            </CardHeader>
                            <CardBody>
                                <form name="formRegister">
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <label htmlFor="inlineFormInput">First Name</label>
                                            <Input type="text" className="mb-2" id="inlineFormInput" placeholder="First Name" />
                                        </FormGroup> 
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label htmlFor="inlineFormInput">Last Name</label>
                                            <Input type="text" className="mb-2" id="inlineFormInput" placeholder="Last Name" />
                                        </FormGroup>
                                    </Col>
                                    </Row>
                                    <FormGroup>
                                        <label >Gender</label>
                                        <FormGroup className="ml-5">
                                            <Input type="radio" name="gender"></Input>
                                            <label>Male</label>
                                        </FormGroup>
                                        <FormGroup className="ml-5">
                                            <Input type="radio" name="gender"></Input>
                                            <label>Female</label>
                                        </FormGroup>
                                    </FormGroup>

                                            <FormGroup>
                                                <label>Email</label>
                                                <Input type="email" placeholder="sample@example.com"
                                                    name="email"
                                                    invalid={this.hasError('formRegister', 'email', 'required') || this.hasError('formRegister', 'email', 'email')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required", "email"]' value={this.state.formRegister.email}></Input>
                                                   
                                                   {this.hasError('formRegister', 'email', 'required') && <span className="invalid-feedback">Field is required</span>}
                                                    {this.hasError('formRegister', 'email', 'email') && <span className="invalid-feedback">Field must be valid email</span>}        
                                            </FormGroup>
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label htmlFor="mobile">Mobile</label>
                                                <Input type="text" name="mobile"
                                                    invalid={this.hasError('formRegister', 'mobile', 'mobileno')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["mobileno"]'
                                                    value={this.state.formRegister.mobile}
                                                    className="mb-2" id="mobile"/>
                                                    <span className="invalid-feedback">Invalid Mobile Number</span>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <label>Date Of Birth</label>
                                                <Datetime timeFormat={false} value={this.state.formRegister.dob} 
                                                ></Datetime>
                                            </FormGroup>
                                          
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                    <label>Office Start Time</label>
                                                    <Datetime timeFormat={true} value={this.state.formRegister.officestarttime} ></Datetime>
                                                </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                    <label>Time Only</label>
                                                    <Datetime timeFormat={true} dateFormat={false} value={this.state.formRegister.timeonly} ></Datetime>
                                                </FormGroup>
                                        </Col>
                                        </Row>
                                    <FormGroup>
                                        <label>Country</label>
                                        <Select
                                            name="select-name"
                                            value={value}
                                            onChange={this.handleChangeSelect}
                                            options={lookup.STATES}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Multi Select</label>
                                        <Select
                                            name="multi-select-name"
                                            isMulti
                                            value={selectedOptionMulti}
                                            onChange={this.handleChangeSelectMulti}
                                            options={lookup.HOBBIES}
                                        />
                                        {/* <span>{JSON.stringify(this.state.selectedOptionMulti)}</span> */}
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Password</label>
                                        <Input type="password"
                                            id="id-password"
                                            name="password"
                                            invalid={this.hasError('formRegister', 'password', 'required')}
                                            onChange={this.validateOnChange}
                                            data-validate='["required"]'
                                            value={this.state.formRegister.password}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Confirm Password</label>
                                        <Input type="password" name="password2"
                                            invalid={this.hasError('formRegister', 'password2', 'equalto')}
                                            onChange={this.validateOnChange}
                                            data-validate='["equalto"]'
                                            value={this.state.formRegister.password2}
                                            data-param="id-password"
                                        />
                                        <span className="invalid-feedback">Field must be equal to previous</span>
                                    </FormGroup>
                                    <FormGroup className="mt-5">
                                        <div className="c-checkbox">
                                            <label>
                                                <Input type="checkbox" defaultValue="" />
                                                <span className="fa fa-check"></span>Accept Terms and Condition</label>
                                        </div>
                                    </FormGroup>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }
}

export default FormControlSample;