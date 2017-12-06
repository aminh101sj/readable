import * as Types from '../actions/types';

export const edited_comment = () => {
  return {
    type: Types.EDIT_COMMENT
  };
};

export const receive_comments = ( comments ) => {
  return {
    type: Types.RECEIVE_COMMENTS,
    comments
  };
};

export const receive_single_comment = ( comment ) => {
  return {
    type: Types.RECEIVE_SINGLE_COMMENT,
    comment
  };
};

export const update_comment = ( name, value ) => {
  return {
    type: Types.UPDATE_COMMENT,
    name,
    value,
  };
}
