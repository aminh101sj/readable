import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col, Button } from 'antd';
const { TextArea } = Input;

const EditCommentForm = ( props ) => {
  const { handleSubmit, handleInputChange, body, id } = props;

  return (
    <form className='padding' onSubmit={(event) => { handleSubmit(id, body); event.preventDefault();}}>
      <Row>
        <Col span={6}>
          Body
        </Col>
        <Col span={18}>
           <TextArea autosize={{ minRows: 2 }} name="body" value={body} onChange={(event) => {const target = event.target; handleInputChange(target.name, target.value);}}/>
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

EditCommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired
}

export default EditCommentForm;
