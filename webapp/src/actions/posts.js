import * as Types from '../actions/types';

export const created_post = () => {
  return {
    type: Types.CREATE_POST,
  };
};

export const edited_post = () => {
  return {
    type: Types.EDIT_POST,
  };
};

export const receive_posts = ( posts ) => {
  return {
    type: Types.RECEIVE_POSTS,
    posts
  };
};

export const receive_single_post = ( post ) => {
  return {
    type: Types.RECEIVE_SINGLE_POST,
    post
  };
};

export const change_order = (order) => {
  return {
    type: Types.CHANGE_ORDER,
    order
  };
}

export const change_post = (post) => {
  return {
    type: Types.CHANGE_POST,
    post
  };
};

