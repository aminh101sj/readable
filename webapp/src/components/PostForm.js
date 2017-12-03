import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col, Button, Select } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;


class PostForm extends React.Component {
  state = {
    title: '',
    author: '',
    category: 'react',
    body: '',
  }

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { handleSubmit, categories } = this.props;

    console.log("the cats: ", categories, handleSubmit);

    return (
      <form onSubmit={(event) => { handleSubmit(this.state.title, this.state.author, this.state.category, this.state.body); event.preventDefault();}}>
        <Row>
          <Col span={6}>
            Title
          </Col>
          <Col span={18}>
            <Input name="title" value={this.state.title} onChange={this.handleInputChange}/>
          </Col>
        </Row>
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
            Category
          </Col>
          <Col span={18}>
            <Select defaultValue={this.state.category} style={{ width: 120 }} onChange={(value) => { this.setState({ category: value}); }}>
              { categories.map((cat) => {
                  return (
                    <Option value={cat.path} key={cat.path}>{cat.name}</Option>
                  );
                })}
            </Select>
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

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default PostForm;
