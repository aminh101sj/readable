import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col, Button } from 'antd';
const { TextArea } = Input;


const EditPostForm = ( props ) => {
  const { handleSubmit, post, changePost } = props;
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    post[name] = value;
    
    changePost(post);
  }

  return (
    <form onSubmit={(event) => { handleSubmit(post.title, post.body); event.preventDefault();}}>
      <Row>
        <Col span={6}>
          Title
        </Col>
        <Col span={18}>
          <Input name="title" value={post.title} onChange={handleInputChange}/>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          Body 
        </Col>
        <Col span={18}>
          <TextArea autosize={{ minRows: 2 }} name="body" value={post.body} onChange={handleInputChange}/>
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
};

EditPostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default EditPostForm;
