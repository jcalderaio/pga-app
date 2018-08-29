import React, { Component } from 'react';
import ScoreTable from './ScoreTable';
import _ from 'lodash';
import { Form, Icon, Input, Button, InputNumber } from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function validateScore(score) {
  if (score >= 0 && score <= 100) {
    return {
      validateStatus: 'success',
      errorMsg: null
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: 'Input a number from 0 - 100'
  };
}

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: {
        value: ''
      },
      scoresArray: []
    };
  }

  deleteRow = deleteId => {
    // source: http://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property

    // we have an array of objects, we want to remove one object using only the deleteId property
    var tempArray = this.state.scoresArray;

    // get index of object with deleteId
    var removeIndex = tempArray.map(item => item.id).indexOf(deleteId);
    // remove object
    tempArray.splice(removeIndex, 1);
    // Set state of array with object removed
    this.setState({ scoresArray: tempArray });
  };

  handleNumberChange = value => {
    this.setState({
      number: {
        ...validateScore(value),
        value
      }
    });
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  clearInputs = () => {
    this.props.form.resetFields(['firstName', 'lastName', 'score']);
    this.handleNumberChange(null);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newItem = {
          id: _.times(10, () => _.random(35).toString(36)).join(''),
          name: `${this.props.form.getFieldValue(
            'lastName'
          )}, ${this.props.form.getFieldValue('firstName')}`,
          score: this.props.form.getFieldValue('score')
        };
        this.setState({
          scoresArray: [...this.state.scoresArray, newItem]
        });
        this.props.form.resetFields(['firstName', 'lastName', 'score']);
        this.handleNumberChange(null);
      }
      if (err) {
        alert('Please input ALL fields!');
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const firstNameError =
      isFieldTouched('firstName') && getFieldError('firstName');
    const lastNameError =
      isFieldTouched('lastName') && getFieldError('lastName');
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={firstNameError ? 'error' : ''}
            help={firstNameError || ''}
          >
            {getFieldDecorator('firstName', {
              rules: [
                { required: true, message: 'Please input your Firstname!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Firstname"
              />
            )}
          </FormItem>
          <FormItem
            validateStatus={lastNameError ? 'error' : ''}
            help={lastNameError || ''}
          >
            {getFieldDecorator('lastName', {
              rules: [
                { required: true, message: 'Please input your Lastname!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Lastname"
              />
            )}
          </FormItem>
          <FormItem
            validateStatus={this.state.number.errorMsg ? 'error' : ''}
            help={this.state.number.errorMsg || ''}
          >
            {getFieldDecorator('score', {
              rules: [{ required: true, message: 'Please input your score!' }]
            })(
              <InputNumber
                value={this.state.number.value}
                onChange={this.handleNumberChange}
                placeholder="score"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                hasErrors(getFieldsError()) || this.state.number.errorMsg
              }
              onClick={this.handleSubmit}
            >
              Add Score
            </Button>
          </FormItem>
          <FormItem style={{ paddingLeft: 100 }}>
            <Button type="danger" onClick={this.clearInputs}>
              Clear Inputs
            </Button>
          </FormItem>
        </Form>
        <div style={{ paddingTop: 100 }}>
          <ScoreTable
            data={this.state.scoresArray}
            deleteRow={this.deleteRow}
          />
        </div>
      </div>
    );
  }
}

const WrappedInputForm = Form.create()(InputForm);

export default WrappedInputForm;
