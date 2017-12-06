import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col, Button } from 'antd';
const { TextArea } = Input;

class AddCommentForm extends Component {
  state = {
    author: '',
    body: '',
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(props) {
    const { handleSubmit, id } = this.props;

    return (
      <form className='padding' onSubmit={(event) => { handleSubmit(id, this.state.author, this.state.body); event.preventDefault();}}>
        <Row>
          <Col span={6}>
            Author 
          </Col>
          <Col span={18}>
            <Input name="author" value={this.state.author} onChange={this.handleInputChange}/>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            Body
          </Col>
          <Col span={18}>
             <TextArea autosize={{ minRows: 2 }} name="body" value={this.state.body} onChange={this.handleInputChange}/>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </form> 
    );
  }
};

AddCommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default AddCommentForm;
