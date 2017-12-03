import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

const Vote = ({ increment, decrement }) => {
    return (
      <span>
        <Button onClick={increment}>
          <Icon type="caret-up" />
        </Button>
        <Button onClick={decrement}>
          <Icon type="caret-down" />
        </Button>
      </span>
    );
};

Vote.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
}

export default Vote;
